<template>
	<ion-page>
		<ion-header>
			<ion-toolbar>
				<ion-title>Ошибка</ion-title>
			</ion-toolbar>
		</ion-header>
		<ion-content :fullscreen="true">
			<ion-header collapse="condense">
				<ion-toolbar>
					<ion-title size="large">Ошибка</ion-title>
				</ion-toolbar>
			</ion-header>
			<ion-grid>
				<ion-row class="ion-text-center">
					<ion-col>
						<h1><ion-text color="danger">Упс, 404</ion-text></h1>
						<p class="text-muted">Страница удалена или не найдена</p>
						<ion-button color="krayola" href="/">
							<b>На главную</b>
						</ion-button>
					</ion-col>
				</ion-row>
			</ion-grid>
		</ion-content>
	</ion-page>
</template>

<script lang="ts">
	import {
		IonRow,
		IonCol,
		IonPage,
		IonText,
		IonGrid,
		IonHeader,
		IonToolbar,
		IonTitle,
		IonButton,
		IonContent,
	} from '@ionic/vue';
	import { defineComponent } from 'vue';

	export default defineComponent({
		name: 'NotFound',
		components: {
			IonRow,
			IonCol,
			IonPage,
			IonGrid,
			IonText,
			IonTitle,
			IonHeader,
			IonButton,
			IonToolbar,
			IonContent,
		}
	});
</script>

<style>
	ion-grid {
		height: calc(100vh - 200px);
	}
	ion-row {
		display: flex;
		align-items: center;
		justify-content: center;
		height: 100%;
	}
</style>
