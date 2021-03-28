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
								<ion-input v-model="applicationRef.user_name" placeholder="Введите имя и фамилию"></ion-input>
							</ion-item>
							<ion-item lines="none">
								<ion-label position="stacked"><ion-icon slot="start" class="icon-position" :icon="call"></ion-icon> Телефон</ion-label>
								<ion-input v-model="applicationRef.user_phone" placeholder="Введите телефон"></ion-input>
							</ion-item>
							<ion-item lines="none">
								<ion-label position="stacked"><ion-icon slot="start" class="icon-position" :icon="location"></ion-icon> Адрес</ion-label>
								<ion-input v-model="applicationRef.user_address" placeholder="Введите адрес"></ion-input>
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
									v-bind:min="applicationRef.start_date"
									v-model="applicationRef.start_date"
								></ion-datetime>
								<ion-datetime 
									display-format="До YYYY-DD MMM, HH:mm" 
									v-model="applicationRef.end_date"
									v-bind:min="applicationRef.start_date"
								></ion-datetime>
							</div>
						</div>
						<ion-item>
							<ion-label>Скорее</ion-label>
							<ion-toggle color="success" slot="start" v-model="applicationRef.is_rather"></ion-toggle>
						</ion-item>
						<ion-item lines="none">
							<ion-label position="stacked">Комментарий</ion-label>
							<ion-textarea v-model="applicationRef.comment" placeholder="Опишите вашу проблему вкратце..."></ion-textarea>
						</ion-item>
						<div class="ion-padding">
							<ion-button shape="round" expand="full" color="krayola" @click="makeRequest">Сохранить</ion-button>
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

			const isOpenRef = ref(false);
			const isLoadRef = ref(true);
			const isErrorRef = ref(false);
			const messageRef = ref<any>(null);
			const applicationRef = ref<any>(null);
			
			axios.get('applications/getById/' + params.id).then((response: any) => {
				const { data } = response;

				applicationRef.value = data.application;
				applicationRef.value.master = applicationRef.value.master.toString();

				isLoadRef.value = false;
			}).catch((error: any): void => {
				isLoadRef.value = false;

				console.error(error);
			});

			const makeRequest = () => {
				console.log(applicationRef.value);
			};

			return {
				call,
				people,
				location,
				isOpenRef,
				isLoadRef,
				isErrorRef,
				messageRef,
				makeRequest,
				applicationRef
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

	.tab-margin {
		margin-bottom: 85px!important;
	}
</style>