<template>
	<ion-header>
		<ion-toolbar>
			<ion-title>Новости</ion-title>
			<ion-buttons slot="end">
				<ion-button @click="dismissModal">
					<ion-icon size="large" :icon="closeOutline"></ion-icon>
				</ion-button>
			</ion-buttons>
		</ion-toolbar>
	</ion-header>
	<ion-content :fullscreen="true" class="ion-padding-horizontal text-content">
		<h1>{{ dataModal.title }}</h1>
		<div
			v-if="dataModal.image"
			class="card-image"
			:style="{backgroundImage: 'url(' + dataModal.image + ')'}"
		></div>
		<p color="muted" style="padding-left: 10px;">
			<small>{{ dataModal.time }}</small>
		</p>
		<p>{{ dataModal.text }}</p>
	</ion-content>
</template>

<script>
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonButton, IonIcon } from '@ionic/vue';
import { closeOutline } from 'ionicons/icons';
import { defineComponent } from 'vue';

export default defineComponent({
	name: 'Modal',
	props: ['dataModal'],
	emits: ['closeModal'],
	components: { IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonButton, IonIcon },
	setup(props, { emit }) {
		const dismissModal = () => emit('closeModal', true);

		return { dismissModal, closeOutline };
	}
});
</script>
