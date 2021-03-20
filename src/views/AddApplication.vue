<template>
	<ion-page>
		<ion-header>
			<ion-toolbar>
				<ion-buttons slot="start">
					<ion-back-button></ion-back-button>
				</ion-buttons>
				<ion-title>{{ route.params.id !== undefined ? 'Оформление заявки' : 'Выбор мастера' }}</ion-title>
			</ion-toolbar>
		</ion-header>
		<ion-content class="add-content" :fullscreen="true">
			<div v-if="route.params.id !== undefined">
				<ion-list class="custom-list">
					<ion-card class="custom-card">
						<ion-item lines="none">
							<ion-icon color="success" :icon="checkmarkCircleOutline" slot="start"></ion-icon>
							<ion-select :value="route.params.id" v-bind:interface-options="interfaceOptions" ok-text="Сохранить" cancel-text="Отмена">
								<ion-select-option value="1">Вызов мастера</ion-select-option>
								<ion-select-option value="2">Вызов электрика</ion-select-option>
								<ion-select-option value="3">Вызов сантехника</ion-select-option>
								<ion-select-option value="4">Вызов уборщицы</ion-select-option>
								<ion-select-option value="5">Другой случай</ion-select-option>
							</ion-select>
						</ion-item>
					</ion-card>
					<ion-card class="custom-card">
						<ion-item lines="none">
							<template v-if="userRef.phone && userRef.address">
								<ion-icon color="success" :icon="checkmarkCircleOutline" slot="start"></ion-icon>
							</template>
							<ion-icon v-else color="medium" :icon="ellipseOutline" slot="start"></ion-icon>

							<ion-label>Мои контакты</ion-label>
							<span v-if="collapsesRef[1]">
								<ion-icon size="large" @click="setCollapse(1, !collapsesRef[1])" :icon="chevronUpOutline" slot="end"></ion-icon>
							</span>
							<ion-icon v-else @click="setCollapse(1, !collapsesRef[1])" :icon="ellipsisHorizontal" slot="end"></ion-icon>
						</ion-item>
						<div v-bind:class="{collapse: true, show: collapsesRef[1]}">
							<div v-if="isEdit">
								<ion-item lines="none">
									<ion-label position="stacked">Имя и фамилия</ion-label>
									<ion-input v-model="userRef.name" placeholder="Введите имя и фамилию"></ion-input>
								</ion-item>
								<ion-item lines="none">
									<ion-label position="stacked">Телефон</ion-label>
									<ion-input v-model="userRef.phone" placeholder="Введите телефон"></ion-input>
								</ion-item>
								<ion-item lines="none">
									<ion-label position="stacked">Адрес</ion-label>
									<ion-input v-model="userRef.address" placeholder="Введите адрес"></ion-input>
								</ion-item>
								<div class="ion-padding">
									<ion-button shape="round" expand="full" color="krayola" @click="setCollapse(1, !collapsesRef[1]), setCollapse(2, true), isEdit = false">Далее</ion-button>
								</div>
							</div>
							<ion-item v-else lines="none">
								<ion-label>
									<h2>{{ userRef.name }}</h2>
									<p>ID: {{ userRef.id }}</p>
									<p>
										<ion-icon slot="start" class="icon-position" :icon="location"></ion-icon>
										{{ userRef.address ?? 'Не указан' }}
									</p>
									<p>
										<ion-icon slot="start" class="icon-position" :icon="call"></ion-icon>
										{{ userRef.phone ?? 'Не указан' }}
									</p>
								</ion-label>
								<ion-note slot="end" @click="isEdit = !isEdit">ред.</ion-note>
							</ion-item>
						</div>
					</ion-card>
					<ion-card class="custom-card">
						<ion-item lines="none">
							<template v-if="userRef.phone && userRef.address">
								<ion-icon color="success" :icon="checkmarkCircleOutline" slot="start"></ion-icon>
							</template>
							<ion-icon v-else color="medium" :icon="ellipseOutline" slot="start"></ion-icon>
							<ion-label>Основная информация</ion-label>
							<span v-if="collapsesRef[2]">
								<ion-icon size="large" @click="setCollapse(2, !collapsesRef[2])" :icon="chevronUpOutline" slot="end"></ion-icon>
							</span>
							<ion-icon v-else @click="setCollapse(2, !collapsesRef[2])" :icon="ellipsisHorizontal" slot="end"></ion-icon>
						</ion-item>
						<div v-bind:class="{collapse: true, show: collapsesRef[2]}">
							<div v-show="!pickerRef.isRather">
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
								<ion-toggle color="success" slot="start" @ionChange="onChangeToggle" v-bind:value="pickerRef.isRather"></ion-toggle>
							</ion-item>
							<ion-item lines="none">
								<ion-label position="stacked">Комментарий</ion-label>
								<ion-textarea v-model="commentRef" placeholder="Опишите вашу проблему вкратце..."></ion-textarea>
							</ion-item>
							<div class="ion-padding">
								<ion-button shape="round" expand="full" color="krayola" @click="makeRequest">Оформить заявку</ion-button>
							</div>
						</div>
					</ion-card>
					<ion-card v-if="false" class="custom-card">
						<ion-item lines="none">
							<ion-icon color="medium" :icon="ellipseOutline" slot="start"></ion-icon>
							<ion-label>Заявка оформлена</ion-label>
						</ion-item>
					</ion-card>
				</ion-list>
			</div>
			<ion-grid v-else>
				<ion-row class="ion-justify-content-center ion-align-items-center centered-content">
					<ion-col size-xs="12" size-sm="8" size-md="5" size-xl="3">
						<ion-list class="custom-list">
							<ion-card class="custom-card">
								<ion-item lines="none" router-link="/tabs/add/1">
									Вызов мастера
								</ion-item>
							</ion-card>
							<ion-card class="custom-card">
								<ion-item lines="none" router-link="/tabs/add/2">
									Вызов электрика
								</ion-item>
							</ion-card>
							<ion-card class="custom-card">
								<ion-item lines="none" router-link="/tabs/add/3">
									Вызов сантехника
								</ion-item>
							</ion-card>
							<ion-card class="custom-card">
								<ion-item lines="none" router-link="/tabs/add/4">
									Вызов уборщицы
								</ion-item>
							</ion-card>
							<ion-card class="custom-card">
								<ion-item lines="none" router-link="/tabs/add/5">
									Другой случай
								</ion-item>
							</ion-card>
						</ion-list>
					</ion-col>
				</ion-row>
			</ion-grid>
			<ion-toast
				:color="isErrorRef ? 'danger' : 'success'"
				:is-open="isOpenRef"
				:message="messageRef"
				:duration="500000"
				@onDidDismiss="setOpen(false)"
			>
			</ion-toast>
		</ion-content>
	</ion-page>
</template>

<script lang="ts">
	import {
		IonSelectOption,
		IonBackButton,
		IonDatetime,
		IonTextarea,
		IonButtons,
		IonContent,
		IonToolbar,
		IonButton,
		IonToggle,
		IonHeader,
		IonSelect,
		IonLabel,
		IonTitle,
		IonInput,
		IonToast,
		IonPage,
		IonCard,
		IonList,
		IonIcon,
		IonItem,
		IonGrid,
		IonNote,
		IonRow,
		IonCol,

	} from '@ionic/vue';
	import { 
		call, 
		location, 
		ellipseOutline,
		chevronUpOutline,
		ellipsisHorizontal,
		checkmarkCircleOutline 
	} from 'ionicons/icons';
	import { defineComponent, ref } from 'vue';
	import { useRoute } from 'vue-router';
	import moment from 'moment';
	import axios from 'axios';

	moment.locale('ru');

	export default defineComponent({
		name: 'AddApplication',
		components: {
			IonSelectOption,
			IonBackButton,
			IonDatetime,
			IonTextarea,
			IonButtons,
			IonContent,
			IonToolbar,
			IonButton,
			IonToggle,
			IonHeader,
			IonSelect,
			IonLabel,
			IonTitle,
			IonInput,
			IonToast,
			IonPage,
			IonCard,
			IonList,
			IonIcon,
			IonItem,
			IonGrid,
			IonNote,
			IonRow,
			IonCol,
		},
		setup() {
			const route = useRoute();
			const isEdit = ref(false);
			const userRef = ref<any>({});
			const collapsesRef = ref([
				false,
				true,
				false
			]);
			const pickerRef = ref<any>({
				start: moment().format(),
				current: moment().format(),
				isRather: false,
				currentMax: moment().add(1, 'year').format(),
				options: [
					{
						buttons: [{
							text: 'Отмена',
							handler: () => {
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
							}
						}]	
					},
					{
						buttons: [{
							text: 'Отмена',
							handler: () => {
								return false
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
							}
						}]	
					}
				],
				shortNames: 'Янв, Фев, Мрт, Апр, Май, Июн, Июл, Авг, Сен, Окт, Нбр, Дек',
			});
			const isOpenRef = ref(false);
			const isErrorRef = ref(false);
			const messageRef = ref<string|null>(null);
			const commentRef = ref<string|null>(null);

			const interfaceOptions = {
				header: 'Выберите мастера'
			};

			const setOpen = (state: boolean) => isOpenRef.value = state;
			const setError = (state: boolean) => isErrorRef.value = state;
			const setMessage = (state: string) => messageRef.value = state;
			const setCollapse = (id: number, value: boolean) => collapsesRef.value[id] = value;

			const makeRequest = (): void => {
				const postData = {
					user: userRef.value,
					date: {
						end: moment(pickerRef.value.current).toString(),
						start: moment(pickerRef.value.start).format()
					},
					master: route.params.id,
					comment: commentRef.value,
				};
				axios.post('applications/create', postData).then((response: any) => {
					const { data } = response;

					if (data && data.message) {
						setMessage(data.message);
					}
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
							console.log(i, response.data.messages[i][0]);

							setMessage(response.data.messages[i][0]);
						}
						
					} else if (error.message) {
						setMessage(error.message);
					}
					setError(true);
					setOpen(true);
				});
			};

			const onChangeToggle = () => {
				pickerRef.value.isRather = !pickerRef.value.isRather;
			};

			const json = localStorage.getItem('user');

			if (json !== null) {
				userRef.value = JSON.parse(json);
			}

			return {
				call,
				route,
				isEdit,
				userRef,
				setOpen,
				location,
				isOpenRef,
				pickerRef,
				isErrorRef,
				messageRef,
				commentRef,
				makeRequest,
				setCollapse,
				collapsesRef,
				onChangeToggle,
				ellipseOutline,
				interfaceOptions,
				chevronUpOutline,
				ellipsisHorizontal,
				checkmarkCircleOutline
			};
		}
	});
</script>

<style>
	.custom-list {
		background: transparent;
	}

	.add-content {
		--background: #cfe2e8;
	}

	@media (prefers-color-scheme: dark) {
		.add-content {
			--background: #0c0c0c;
		}
	}

	.centered-content {
		width: 100%;
		height: 85vh;
	}

	.collapse {
		visibility: hidden;
		display: none;
	}
	.collapse.show {
		visibility: visible;
		display: block;
	}
	.collapsing {
		position: relative;
		height: 0;
		overflow: hidden;
		-webkit-transition-property: height, visibility;
		transition-property: height, visibility;
		-webkit-transition-duration: 0.35s;
		transition-duration: 0.35s;
		-webkit-transition-timing-function: ease;
		transition-timing-function: ease;
	}
	.collapsing.width {
		-webkit-transition-property: width, visibility;
		transition-property: width, visibility;
		width: 0;
		height: auto;
	}
</style>