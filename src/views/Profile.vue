<template>
	<ion-page>
		<Header title="Профиль">
			<ion-list>
				<ion-card>
					<ion-item lines="none">
						<ion-label>
							<h2>User Name</h2>
							<p>id: 123</p>
							<p>
								<ion-icon slot="start" class="icon-position" :icon="location"></ion-icon>
								Улица, Дом, Квартира
							</p>
							<p>
								<ion-icon slot="start" class="icon-position" :icon="call"></ion-icon>
								+79384767643
							</p>
						</ion-label>
						<ion-avatar slot="end">
							<img src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAAAAACH5BAAAAAAALAAAAAABAAEAAAICTAEAOw==">
						</ion-avatar>
					</ion-item>
				</ion-card>
				<ion-card>
					<ion-item lines="none">
						<ion-label>Мои заявки</ion-label>
						<ion-badge color="warning" slot="end">1</ion-badge>
					</ion-item>
				</ion-card>
				<ion-card>
					<ion-item lines="none" href="/tabs/news">
						Новости
					</ion-item>
				</ion-card>
				<ion-card>
					<ion-item lines="none" href="/typeUk">
						Оповещения
					</ion-item>
				</ion-card>
				<ion-card>
					<ion-item lines="none" href="/typeUk">
						Настройки
					</ion-item>
				</ion-card>
			</ion-list>
		</Header>
	</ion-page>
</template>

<script lang="ts">
	import {
		IonCard,
		IonPage,
		IonList,
		IonItem,
		IonBadge,
		IonLabel,
		IonAvatar,
		IonIcon,

	} from '@ionic/vue';

	import { defineComponent } from 'vue';
	import Header from '@/components/Header.vue';
	import { location, call } from 'ionicons/icons';

	export default defineComponent({
		name: 'Profile',
		components: {
			IonPage,
			IonList,
			IonItem,
			IonCard,
			IonBadge,
			IonLabel,
			IonAvatar,
			IonIcon,
			Header,
		},
		setup() {
			return {
				call,
				location
			}
		}
	});
</script>

<style type="text/css">
	ion-list {
		background: rgba(0, 0, 0, 0)!important;
	}

	ion-item {
		padding: 4px;
		--background: #fff!important;
	}

	.icon-position {
		position: relative;
		top: 2px;
	}
</style>
