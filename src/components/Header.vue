<template>
	<ion-header>
			<ion-toolbar>
				<ion-title>{{ title }}</ion-title>
			</ion-toolbar>
		</ion-header>
		<ion-content :fullscreen="true">
			<ion-header collapse="condense">
				<ion-toolbar>
					<ion-title size="large">{{ title }}</ion-title>
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
		IonContent
	} from '@ionic/vue';
	import { defineComponent } from 'vue';

	export default defineComponent({
		name: 'Header',
		props: {
			title: String
		},
		components: {
		//	IonPage,
			IonHeader,
			IonToolbar,
			IonTitle,
			IonContent,
		},
	});
</script>
