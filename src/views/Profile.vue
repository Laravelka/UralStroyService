<template>
	<ion-page>
		<Header is-custom-back title="Профиль">
			<ion-header collapse="condense">
                <ion-toolbar>
                    <ion-title size="large">Профиль</ion-title>
                </ion-toolbar>
            </ion-header>
			<ion-list>
				<ion-card class="card-margin">
					<ion-item lines="none">
						<ion-label>
							<h2>{{ userRef.name }}</h2>
							<p>id: {{ userRef.id }}</p>
							<p>
								<ion-icon slot="start" class="icon-position" :icon="location"></ion-icon>
								{{ userRef.address ?? 'Не указан' }}
							</p>
							<p>
								<ion-icon slot="start" class="icon-position" :icon="call"></ion-icon>
								{{ userRef.phone ?? 'Не указан' }}
							</p>
						</ion-label>
						<div 
							class="profile-avatar" 
							v-bind:style="{
								backgroundImage: `url(${userRef.avatar ?? '/assets/img/avatar.svg'})`
							}"
						></div>
					</ion-item>
				</ion-card>
				<ion-card class="card-margin">
					<ion-item lines="none" router-link="/tabs/applications">
						<ion-label>Мои заявки</ion-label>
						<ion-badge v-if="(userRef.appsCount ?? 0) !== 0" color="warning" slot="end">{{ userRef.appsCount ?? 0 }}</ion-badge>
					</ion-item>
				</ion-card>
				<ion-card class="card-margin">
					<ion-item lines="none" router-link="/tabs/news">
						Новости
					</ion-item>
				</ion-card>
				<ion-card class="card-margin">
					<ion-item lines="none" router-link="/tabs/notifications">
						Оповещения
					</ion-item>
				</ion-card>
				<ion-card class="card-margin">
					<ion-item lines="none" router-link="/tabs/settings">
						Настройки
					</ion-item>
				</ion-card>
			</ion-list>
		</Header>
	</ion-page>
</template>

<script lang="ts">
	import {
		IonToolbar,
		IonHeader,
		IonTitle, 
		IonCard,
		IonPage,
		IonList,
		IonItem,
		IonBadge,
		IonLabel,
		IonIcon,

	} from '@ionic/vue';
	import axios from 'axios';
	import { useRouter } from 'vue-router';
	import { defineComponent, ref } from 'vue';
	import Header from '@/components/Header.vue';
	import { location, call } from 'ionicons/icons';

	export default defineComponent({
		name: 'Profile',
		components: {
			IonToolbar,
			IonHeader,
			IonTitle,
			IonPage,
			IonList,
			IonItem,
			IonCard,
			IonBadge,
			IonLabel,
			IonIcon,
			Header,
			
		},
		setup() {
			const router = useRouter();
			const userRef = ref<any>({});

			const json = localStorage.getItem('user');

			if (json !== null) {
				userRef.value = JSON.parse(json);
			}
			
			router.afterEach((to, from) => {
				const json = localStorage.getItem('user');

				if (json !== null) {
					userRef.value = JSON.parse(json);
				}

				axios.get('applications/getCount').then((response: any) => {
					userRef.value.appsCount = response.data.count;
				}).catch((error: any) => {
					userRef.value.appsCount = 'error'
				});
			});

			axios.get('applications/getCount').then((response: any) => {
				userRef.value.appsCount = response.data.count;
			}).catch((error: any) => {
				userRef.value.appsCount = 'error'
			});

			return {
				call,
				userRef,
				location,
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

	.avatar-edit {
		right: -2px;
		padding: 2px;
		max-width: 22px;
		max-height: 22px;
		position: absolute;
		background-color: rgb(25 25 26);
		border-radius: 50%;
	}
	
	@media (prefers-color-scheme: light) {
		ion-item {
			--background: #fff!important;
		}

		.avatar-edit {
			right: -2px;
			padding: 2px;
			max-width: 22px;
			max-height: 22px;
			position: absolute;
			background-color: rgb(255 255 255 / 1);
			border-radius: 50%;
		}
	}

	.icon-position {
		position: relative;
		top: 2px;
	}

	.profile-avatar {
		width: 75px;
		height: 75px;
		margin-right: 8px;
		border-radius: 50%;
		position: relative;
		background-size: cover;
		background-repeat: no-repeat;
		background-position: center;
		box-shadow: rgb(0 0 0 / 0.2) 0px 2px 16px;
		
	}

	.avatar-edit .icon {
		width: 18px;
		height: 18px;
		display: inline-block;
		background-size: cover;
		background-image: url(/assets/icon/edit.svg);
		filter: invert(17%) sepia(86%) saturate(5568%) hue-rotate(183deg) brightness(95%) contrast(87%);
	}

	.card-margin {
		margin: 12px;
	}
</style>
