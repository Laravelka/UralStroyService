<template>
	<ion-page>
		<Header is-custom-back title="Моя УК">
			<ion-header collapse="condense">
                <ion-toolbar>
                    <ion-title size="large">Моя УК</ion-title>
                </ion-toolbar>
            </ion-header>
			<ion-card>
				<ion-list>
					<svg class="bd-placeholder-img bd-placeholder-img-lg img-fluid" width="100%" height="200" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: Фото УК" preserveAspectRatio="xMidYMid slice" focusable="false"><title>Placeholder</title><rect width="100%" height="100%" fill="#868e96"></rect><text x="50%" y="50%" fill="#dee2e6" dy=".3em">Фото не указано</text></svg>
					<ion-item lines="full">
						<ion-label>
							<p>
								<ion-icon slot="start" class="icon-position" :icon="location"></ion-icon>
								{{ settingsRef.address ?? 'Не указано' }}
							</p>
							<p>
								<ion-icon slot="start" class="icon-position" :icon="call"></ion-icon>
								{{ settingsRef.phone ?? 'Не указано' }}
							</p>
							<p>
								<ion-icon slot="start" class="icon-position" :icon="mail"></ion-icon>
								{{ settingsRef.email ?? 'Не указано' }}
							</p>
						</ion-label>
					</ion-item>
					<ion-item style="padding: 0" lines="full" @click="typeRequest">
						Написать УК
					</ion-item>
					<ion-item lines="none" router-link="/tabs/news">
						Новости
					</ion-item>
				</ion-list>
			</ion-card>
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
		IonLabel,
		IonIcon,

	} from '@ionic/vue';
	import axios from 'axios';
	import { defineComponent, ref } from 'vue';
	import Header from '@/components/Header.vue';
	import { location, call, mail } from 'ionicons/icons';

	export default defineComponent({
		name: 'MyUK',
		components: {
			IonToolbar,
			IonHeader,
			IonTitle, 
			IonPage,
			IonList,
			IonItem,
			IonCard,
			IonLabel,
			IonIcon,
			Header,
		},
		setup() {
			const settingsRef = ref<any>({});

			const typeRequest = () => {
				console.log(12345);
			};

			axios.get('/admin/settings').then((response: any) => {
				const { data } = response;

				settingsRef.value = data;
			}).catch((error: any) => {
				console.error(error);
			});

			return {
				call,
				mail,
				location,
				typeRequest,
				settingsRef,

			}
		}
	});
</script>

<style type="text/css">
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
</style>
