<template>
	<ion-page>
		<Header is-custom-back title="Редактировать заявку">
			<ion-header collapse="condense">
				<ion-toolbar>
					<ion-title size="large">Редактировать заявку</ion-title>
				</ion-toolbar>
			</ion-header>
			<div class="tab-margin">
				<div v-if="isLoadRef">
					<ion-grid>
						<ion-row class="ion-justify-content-center ion-align-items-center centered-content">
							<ion-col size-xs="12" size-sm="8" size-md="5" size-xl="3" class="ion-text-center">
								<ion-spinner
									name="dots"
								></ion-spinner>
							</ion-col>
						</ion-row>
					</ion-grid>
				</div>
				<div v-else-if="applicationRef == null">
					<ion-grid>
						<ion-row class="ion-justify-content-center ion-align-items-center centered-content">
							<ion-col size-xs="12" size-sm="8" size-md="5" size-xl="3" class="ion-text-center">
								<span color="muted" class="text-muted">Пока что пусто</span>
							</ion-col>
						</ion-row>
					</ion-grid>
				</div>
				<ion-list v-else class="custom-list">
					<ion-card class="custom-card">
						<ion-item lines="none">
							<ion-select v-model="applicationRef.master" v-bind:interface-options="{header: 'Выбор мастера'}" ok-text="Сохранить" cancel-text="Отмена">
								<ion-select-option value="1">Вызов мастера</ion-select-option>
								<ion-select-option value="2">Вызов электрика</ion-select-option>
								<ion-select-option value="3">Вызов сантехника</ion-select-option>
								<ion-select-option value="4">Вызов уборщицы</ion-select-option>
								<ion-select-option value="5">Другой случай</ion-select-option>
							</ion-select>
						</ion-item>
						<div>
							<ion-item lines="none">
								<ion-label position="stacked"><ion-icon slot="start" class="icon-position" :icon="people"></ion-icon> Имя и фамилия</ion-label>
								<ion-input class="custom" v-model="applicationRef.user_name" placeholder="Введите имя и фамилию"></ion-input>
							</ion-item>
							<ion-item lines="none">
								<ion-label position="stacked"><ion-icon slot="start" class="icon-position" :icon="call"></ion-icon> Телефон</ion-label>
								<ion-input class="custom" v-model="applicationRef.user_phone" placeholder="Введите телефон"></ion-input>
							</ion-item>
							<ion-item lines="none">
								<ion-label position="stacked"><ion-icon slot="start" class="icon-position" :icon="location"></ion-icon> Адрес</ion-label>
								<ion-input class="custom" v-model="applicationRef.user_address" placeholder="Введите адрес"></ion-input>
							</ion-item>
						</div>
						<ion-item lines="none">
							<ion-label>Основная информация</ion-label>
						</ion-item>
						<div v-show="!applicationRef.is_rather">
							<ion-item lines="none">
								<ion-label>Ко времени</ion-label>
							</ion-item>
							<div class="date-block">
								<ion-datetime 
									display-format="От YYYY-DD MMM, HH:mm"
									v-bind:min="pickerRef.start"
									v-model="pickerRef.start"
									v-bind:picker-options="pickerRef.options[0]"
									v-bind:month-short-names="pickerRef.shortNames"
								></ion-datetime>
								<ion-datetime 
									display-format="До YYYY-DD MMM, HH:mm" 
									v-model="pickerRef.current"
									v-bind:min="pickerRef.start"
									v-bind:max="pickerRef.currentMax"
									v-bind:picker-options="pickerRef.options[1]"
									v-bind:month-short-names="pickerRef.shortNames"
								></ion-datetime>
							</div>
						</div>
						<ion-item>
							<ion-label>Скорее</ion-label>
							<ion-toggle color="success" slot="start" v-model="applicationRef.is_rather"></ion-toggle>
						</ion-item>
						<ion-item lines="none">
							<ion-label position="stacked">Комментарий</ion-label>
							<ion-textarea class="custom" v-model="applicationRef.comment" placeholder="Опишите вашу проблему вкратце..."></ion-textarea>
						</ion-item>
						<div class="ion-padding">
							<ion-button @click="makeRequest" expand="full" shape="round" color="krayola">
								<template v-if="isLoadButtonRef">
									<ion-spinner name="dots"></ion-spinner>
								</template>
								<template v-else>
									Сохранить
								</template>
							</ion-button>
						</div>
					</ion-card>
				</ion-list>
			</div>
		</Header>
		<ion-toast
			:color="isErrorRef ? 'danger' : 'success'"
			:is-open="isOpenRef"
			:message="messageRef"
			:duration="5000"
			@onDidDismiss="setOpen(false)"
		>
		</ion-toast>
	</ion-page>
</template>

<script lang="ts">
	import {
		IonSelectOption,
		IonDatetime,
		IonTextarea,
		// IonButtons,
		// IonContent,
		IonToolbar,
		IonSpinner,
		IonButton,
		IonToggle,
		IonHeader,
		IonSelect,
		IonLabel,
		IonTitle,
		IonInput,
		IonToast,
		IonCard,
		IonList,
		IonIcon,
		IonItem,
		IonPage,
		IonGrid,
		IonRow,
		IonCol,
	} from '@ionic/vue';
	import { 
		call, 
		people,
		location,
	} from 'ionicons/icons';
	import { defineComponent, ref } from 'vue';
	import { useRoute } from 'vue-router';
	import Header from '@/components/Header.vue';
	import moment from 'moment';
	import axios from 'axios';

	moment.locale('ru');

	export default defineComponent({
		name: 'EditApp',
		props: ['data'],
		emits: ['closeModal'],
		components: {
			IonSelectOption,
			IonDatetime,
			IonTextarea,
			IonToolbar,
			IonSpinner,
			IonButton,
			IonToggle,
			IonHeader,
			IonSelect,
			IonLabel,
			IonTitle,
			IonInput,
			IonToast,
			IonCard,
			IonList,
			IonIcon,
			IonItem,
			IonPage,
			IonGrid,
			IonRow,
			IonCol,
			Header,
		},
		setup() {
			const { params } = useRoute();
			
			const isLoadRef = ref(true);
			const isOpenRef = ref(false);
			const isErrorRef = ref(false);
			const messageRef = ref<any>(null);
			const applicationRef = ref<any>(null);
			const isLoadButtonRef = ref(false);

			const setOpen = (value: any) => isOpenRef.value = value;
			const setError = (value: any) => isErrorRef.value = value;
			const setMessage = (value: any) => messageRef.value = value;

			const pickerRef = ref<any>({
				start: moment().format(),
				current: moment().format(),
				isRather: false,
				currentMax: moment().add(1, 'year').format(),
				options: [
					{
						buttons: [{
							text: 'Отмена',
							handler: (e: any) => {
								console.log('cancel', e);

								return false;
							},
						}, {
							text: 'Сохранить',
							handler: (result: any) => {
								const date = moment().toDate();
								
								date.setDate(result.day.value);
								date.setHours(result.hour.value);
								date.setMonth(result.month.value - 1);
								date.setFullYear(result.year.value);
								date.setMinutes(result.minute.value);

								pickerRef.value.start = moment(date).toISOString();
								pickerRef.value.current = moment(date).toISOString();

								/*eslint camelcase: ["error", {properties: "never"}]*/
								applicationRef.value.start_date = moment(date).toISOString();
								applicationRef.value.end_date = moment(date).toISOString();
							}
						}]	
					},
					{
						buttons: [{
							text: 'Отмена',
							handler: (e: any) => {
								console.log('cancel', e);
								
								return false;
							},
						}, {
							text: 'Сохранить',
							handler: (result: any) => {
								const date = moment().toDate();
								
								date.setDate(result.day.value);
								date.setHours(result.hour.value);
								date.setMonth(result.month.value - 1);
								date.setFullYear(result.year.value);
								date.setMinutes(result.minute.value);

								pickerRef.value.current = moment(date).toISOString();

								/*eslint camelcase: ["error", {properties: "never"}]*/
								applicationRef.value.end_date = moment(date).toISOString();
							}
						}]	
					}
				],
				shortNames: 'Янв, Фев, Мрт, Апр, Май, Июн, Июл, Авг, Сен, Окт, Нбр, Дек',
			});

			axios.get('applications/getById/' + params.id).then((response: any) => {
				const { data } = response;

				applicationRef.value = data;
				applicationRef.value.master = applicationRef.value.master.toString();
				
				pickerRef.value.start = moment(data.start_date).toISOString();
				pickerRef.value.current = data.end_date ? moment(data.end_date).toISOString() : moment(data.start_date).toISOString();
				pickerRef.value.currentMax = moment(pickerRef.value.current).add(1, 'year').toISOString();

				isLoadRef.value = false;
			}).catch((error: any): void => {
				const { response } = error;

				isLoadRef.value = false;
				
				setMessage(response.data.message);
				setError(true);
				setOpen(true);
			});

			const makeRequest = () => {
				isLoadButtonRef.value = true;

				axios.put('applications/update/' + params.id, applicationRef.value).then((response: any) => {
					const { data } = response;

					if (data && data.message) {
						setMessage(data.message);
					}
					isLoadButtonRef.value = false;
					setError(false);
					setOpen(true);
				}).catch((error: any) => {
					const { response } = error;

					if (
						response && 
						response.data && 
						response.data.message
					) {
						setMessage(response.data.message);
					} else if (
						response && 
						response.data && 
						response.data.messages
					) {
						for (const i in response.data.messages) {
							setMessage(response.data.messages[i][0]);
						}
						
					} else if (error.message) {
						setMessage(error.message);
					}
					isLoadButtonRef.value = false;
					setError(true);
					setOpen(true);
				});
			};

			return {
				call,
				people,
				setOpen,
				setError,
				location,
				isOpenRef,
				isLoadRef,
				pickerRef,
				isErrorRef,
				messageRef,
				setMessage,
				makeRequest,
				applicationRef,
				isLoadButtonRef,

			};
		}
	});
</script>