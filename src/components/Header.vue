<template>
	<ion-header :translucent="true">
		<ion-toolbar>
			<ion-buttons slot="start">
				<template v-if="isCustomBack && !isNotBack">
					<ion-button @click="goBack">
						<ion-icon slot="icon-only" :icon="chevronBackOutline"></ion-icon>
					</ion-button>
				</template>
				<ion-back-button v-else-if="!isCustomBack && !isNotBack"></ion-back-button>
			</ion-buttons>
			<ion-title>{{ title }}</ion-title>
		</ion-toolbar>
	</ion-header>
	<ion-content :fullscreen="true">
		<div class="tab-margin">
			<slot></slot>
		</div>
	</ion-content>
</template>

<script lang="ts">
	import {
		//IonPage,
		IonHeader,
		IonToolbar,
		IonIcon,
		IonTitle,
		IonContent,
		IonButton,
		IonButtons,
		IonBackButton,
	} from '@ionic/vue';
	import { defineComponent, ref } from 'vue';
	import { useRouter } from 'vue-router';
	import { chevronBackOutline } from 'ionicons/icons';

	export default defineComponent({
		name: 'Header',
		props: {
			title: String,
			isNotBack: Boolean,
			isCustomBack: Boolean
		},
		components: {
			IonHeader,
			IonToolbar,
			IonIcon,
			IonTitle,
			IonButton,
			IonContent,
			IonButtons,
			IonBackButton,
		},
		setup() {
			const isBack = ref(false);
			const router = useRouter();
			
			const goBack = () => {
				router.back();
			};

			router.afterEach(() => {
				isBack.value = window.history.state.back ? true : false;
			});

			return {
				goBack,
				isBack,
				chevronBackOutline
			};
		}
	});
</script>