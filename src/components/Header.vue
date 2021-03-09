<template>
	<ion-header :translucent="true">
		<ion-toolbar>
			<ion-buttons slot="start">
				<ion-back-button></ion-back-button>
			</ion-buttons>
			<ion-title>{{ title }}</ion-title>
		</ion-toolbar>
	</ion-header>
	<ion-content :fullscreen="true">
		<ion-header collapse="condense">
			<ion-toolbar>
				<ion-title size="large">Новости</ion-title>
			</ion-toolbar>
		</ion-header>
		<slot></slot>
	</ion-content>
</template>

<script lang="ts">
	import {
		//IonPage,
		IonHeader,
		IonToolbar,
		IonTitle,
		IonContent,
		IonButtons,
		IonBackButton,
	} from '@ionic/vue';
	import { defineComponent } from 'vue';

	export default defineComponent({
		name: 'Header',
		props: {
			title: String
		},
		components: {
			IonHeader,
			IonToolbar,
			IonTitle,
			IonContent,
			IonButtons,
			IonBackButton,
		},
	});
</script>
