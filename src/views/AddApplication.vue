<template>
	<ion-page>
		<ion-header>
			<ion-toolbar>
				<ion-title>Создать заявку</ion-title>
			</ion-toolbar>
		</ion-header>
		<ion-content :fullscreen="true">
			<ion-header collapse="condense">
				<ion-toolbar>
					<ion-title size="large">Создать заявку</ion-title>
				</ion-toolbar>
			</ion-header>
		</ion-content>
	</ion-page>
</template>

<script lang="ts">
	import {
		IonPage,
		IonHeader,
		IonToolbar,
		IonTitle,
		IonContent, 
	} from '@ionic/vue';
	import { defineComponent } from 'vue';

	export default defineComponent({
		name: 'AddApplication',
		components: {
			IonHeader,
			IonToolbar,
			IonTitle,
			IonContent,
			IonPage
		}
	});
</script>
