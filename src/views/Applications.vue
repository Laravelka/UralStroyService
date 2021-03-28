<template>
	<ion-page>
		<Header is-custom-back title="Мои заявки">
			<ion-header collapse="condense">
				<ion-toolbar>
					<ion-title size="large">Мои заявки</ion-title>
				</ion-toolbar>
			</ion-header>
			<ion-refresher slot="fixed" pull-factor="0.5" pull-min="100" pull-max="200" @ionRefresh="doRefresh($event)">
				<ion-refresher-content></ion-refresher-content>
			</ion-refresher>
			<div v-if="isLoadRef">
				<ion-grid>
					<ion-row class="ion-justify-content-center ion-align-items-center centered-form">
						<ion-col size-xs="12" size-sm="8" size-md="5" size-xl="3" class="ion-text-center">
							<ion-spinner
								name="dots"
							></ion-spinner>
						</ion-col>
					</ion-row>
				</ion-grid>
			</div>
			<div v-else-if="applicationsRef == null">
				<ion-grid>
					<ion-row class="ion-justify-content-center ion-align-items-center centered-form">
						<ion-col size-xs="12" size-sm="8" size-md="5" size-xl="3" class="ion-text-center">
							<span color="muted" class="text-muted">Пока что пусто</span>
						</ion-col>
					</ion-row>
				</ion-grid>
			</div>
			<ion-card v-for="(app, i) in applicationsRef" v-bind:key="i" class="custom-card">
				<ion-item lines="full">
					<template v-if="app.status == 'completed'">
						<ion-icon style="margin-right: 6px;" color="success" :icon="checkmarkCircleOutline" slot="start"></ion-icon>
					</template>
					<ion-icon style="margin-right: 6px;" v-else-if="app.status == 'pending'" color="warning" :icon="ellipse" slot="start"></ion-icon>
					<ion-icon style="margin-right: 6px;" v-else-if="app.status == 'unfulfilled'" color="danger" :icon="ellipse" slot="start"></ion-icon>
					<ion-icon style="margin-right: 6px;" v-else-if="app.status == 'canceled'" color="danger" :icon="closeCircleOutline" slot="start"></ion-icon>
					<ion-label>
						<h2 v-up-first-letter>{{ (app.master != 5 ? 'Вызов ' : '') + masters[app.master] }}</h2>
					</ion-label>
					<ion-button :router-link="'/tabs/applications/update/' + app.id" slot="end" color="light">
						<span class="icon"></span>
					</ion-button>
				</ion-item>
				<ion-item lines="none">
					<p style="color: #989898; font-size: smaller;">
						{{ app.comment }}
					</p>
				</ion-item>
				<ion-item lines="none">
					<div style="width: 100%" class="justy-space-between">
						<p class="text-muted">
							<ion-icon class="icon-position" :icon="time"></ion-icon> <small>{{ moment(app.created_at).format('DD.MM.YYYY') }}</small>
						</p>
						<p class="text-muted">
							<small v-if="app.is_rather" style="position: relative; top: 2px">Скорее</small>
							<small v-else style="position: relative; top: 2px">Ко времени: {{ moment(app.start_date).format('HH:MM') }} - {{ moment(app.end_date).format('HH:MM') }}</small>
						</p>
					</div>
				</ion-item>
			</ion-card>
		</Header>
	</ion-page>
</template>

<script lang="ts">
	import {
		IonRefresherContent,
		alertController,
		IonRefresher,
		IonSpinner,
		IonToolbar,
		IonHeader,
		IonButton,
		IonTitle,
		// IonAlert,
		IonCard,
		IonPage,
		// IonList,
		IonItem,
		IonLabel,
		IonIcon,
		IonGrid,
		IonRow,
		IonCol,
	} from '@ionic/vue';
	import { 
		call, 
		mail,
		time,
		ellipse,
		location,
		chevronUpOutline,
		closeCircleOutline,
		ellipsisHorizontal,
		checkmarkCircleOutline 
	} from 'ionicons/icons';
	import axios from 'axios';
	import moment from 'moment';
	import { defineComponent, ref } from 'vue';
	import Header from '@/components/Header.vue';
	
	moment.locale('ru');

	export default defineComponent({
		name: 'Applications',
		components: {
			IonRefresherContent,
			IonRefresher,
			IonSpinner,
			IonToolbar,
			IonHeader,
			IonButton,
			IonTitle,
			// IonAlert,
			IonPage,
			// IonList,
			IonItem,
			IonCard,
			IonLabel,
			IonIcon,
			IonGrid,
			IonRow,
			IonCol,
			Header,
		},
		setup() {
			const masters = {
				1: 'мастера',
				2: 'электрика',
				3: 'сантехника',
				4: 'Уборщицы',
				5: 'другой случай'
			};
			const statuses = {
				canceled: 'Отменен',
				pending: 'В ожидании',
				completed: 'Выполнен',
				unfulfilled: 'Невыполнен',
			};
			const isLoadRef = ref(false);
			const isAlertOpenRef = ref(false);
			const isErrorAlertRef = ref(false);
			const applicationsRef = ref<any>(null);

			const getApplications = (callback: any = null) => {
				if (!callback) isLoadRef.value = true;

				axios.get('applications/getAll').then((response: any) => {
					const { data } = response;

					applicationsRef.value = data.applications;

					if (callback) callback();

					isLoadRef.value = false;
				}).catch(async(error: any) => {
					const { response } = error;

					applicationsRef.value = null;

					if (response && response.data) {
						const { data } = response;

						if (data.message && data.message != 'Пока что пусто.') {
							const alert = await alertController
								.create({
									header: 'Ошибка',
									message: `<p class="text-danger">${data.message}</p>`,
								});
							return alert.present();
						} else if (data.messages) {
							const alert = await alertController
								.create({
									header: 'Ошибка',
									message: `<p class="text-danger">${data.messages[0]}</p>`,
								});
							return alert.present();
						}
					} else {
						const alert = await alertController
							.create({
								header: 'Ошибка',
								message: `<p class="text-danger">Неизвестная ошибка сервера.</p>`,
							});
						return alert.present();
					}
					if (callback) callback();

					isLoadRef.value = false;
				});
			};
			
			const doRefresh = (event: any) => {
				getApplications(() => {
					event.target.complete();
				});
			};

			getApplications();

			return {
				call,
				mail,
				time,
				moment,
				ellipse,
				masters: masters,
				statuses: statuses,
				location,
				doRefresh,
				isLoadRef,
				isAlertOpenRef,
				isErrorAlertRef,
				applicationsRef,
				getApplications,
				chevronUpOutline,
				closeCircleOutline,
				ellipsisHorizontal,
				checkmarkCircleOutline,
			}
		}
	});
</script>

<style type="text/css">
	ion-list {
		background: rgba(0, 0, 0, 0)!important;
	}

	ion-item {
		--background: rgba(0, 0, 0, 0.1)!important;
	}

	.icon {
		width: 18px;
		height: 18px;
		display: inline-block;
		background-size: cover;
		background-image: url(/assets/icon/edit.svg);
		filter: invert(47%) sepia(56%) saturate(422%) hue-rotate(149deg) brightness(92%) contrast(91%);
	}

	@media (prefers-color-scheme: light) {
		ion-item {
			--background: #fff!important;
		}
	}

	.icon-position {
		position: relative;
		top: 2px;
	}

	.bd-placeholder-img-lg {
		font-size: calc(1.475rem + 2.7vw);
	}

	.bd-placeholder-img {
		font-size: 1.125rem;
		text-anchor: middle;
		-webkit-user-select: none;
		-moz-user-select: none;
		user-select: none;
	}

	.img-fluid {
		max-width: 100%;
		height: auto;
	}

	ion-card .list-md {
		padding: 0;
	}

	.icon-position {
		position: relative;
		top: 3.5px;
	}

	.centered-form {
		width: 100%;
		height: 80vh;
	}

	
</style>