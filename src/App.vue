<template>
	<ion-app>
		<ion-router-outlet />
	</ion-app>
</template>

<script lang="ts">
	import axios from 'axios';
	import { defineComponent } from 'vue';
	import { IonApp, IonRouterOutlet } from '@ionic/vue';
	import { 
		Plugins,
		PushNotification,
		PushNotificationToken,
		PushNotificationActionPerformed
	} from '@capacitor/core';

	export default defineComponent({
		name: 'App',
		components: {
			IonApp,
			IonRouterOutlet
		},
		setup() {
			const { PushNotifications } = Plugins;
			const pushToken = localStorage.getItem('pushToken') ?? false;

			PushNotifications.requestPermission().then((result: any) => {
				if (result.granted) {
					PushNotifications.register();
				} else {
					console.error('Права для push уведомлений не выданы')
				}
			});

			if (!pushToken) {
				PushNotifications.addListener('registration',
					(token: PushNotificationToken) => {
						axios.post('user/subscribe', {token: token.value}).then((response: any) => {
							console.log(JSON.stringify(response));

							localStorage.setItem('pushToken', token.value);
						}).catch((error: any) => {
							console.error(JSON.stringify(error.response));
						});
					}
				);
			}

			PushNotifications.addListener('registrationError',
				(error: any) => {
					console.error('Error on registration: ' + JSON.stringify(error));
				}
			);

			// Show us the notification payload if the app is open on our device
			PushNotifications.addListener('pushNotificationReceived',
				(notification: PushNotification) => {
					console.log('notifyRecevied:', JSON.stringify(notification))
				}
			);

			// Method called when tapping on a notification
			PushNotifications.addListener('pushNotificationActionPerformed',
				(notification: PushNotificationActionPerformed) => {
					console.log('notifyPerformed:', JSON.stringify(notification))
				}
			);
		}
	});
</script>