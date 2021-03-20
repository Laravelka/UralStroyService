<template>
	<ion-page>
		<ion-content :fullscreen="true">
			<ion-grid>
				<ion-row class="ion-text-center">
					<ion-col>
						<h1><ion-text color="danger">Упс, {{ errorRef.code }}</ion-text></h1>
						<p class="text-muted">{{ errorRef.message }}</p>
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
		IonGrid,
		IonText,
		IonPage,
		IonContent,
	} from '@ionic/vue';
	import { defineComponent, ref } from 'vue';
	import { useRoute } from 'vue-router';

	export default defineComponent({
		name: 'Error',
		components: {
			IonGrid,
			IonRow,
			IonCol,
			IonText,
			IonPage,
			IonContent,
		},
		setup() {
			const { params } = useRoute();
			const errorRef = ref<any>({
				code: 'какая-то ошибка',
				message: 'Возможно, у вас проблемы с интернетом или у нас там что-то не работает, зайдите чуть позже...'
			});

			if (params.code)
				errorRef.value = params;

			console.log(params);

			return {
				errorRef
			};
		}
	});
</script>

<style>
	ion-grid {
		height: calc(100vh - 150px);
	}
	ion-row {
		display: flex;
		align-items: center;
		justify-content: center;
		height: 100%;
	}
</style>