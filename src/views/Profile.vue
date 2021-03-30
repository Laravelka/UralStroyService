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