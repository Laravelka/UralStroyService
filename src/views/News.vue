<template>
	<ion-page>
		<ion-header>
			<ion-toolbar>
				<ion-title>Новости</ion-title>
			</ion-toolbar>
		</ion-header>
		<ion-content :fullscreen="true">
			<ion-header collapse="condense">
				<ion-toolbar>
					<ion-title size="large">Новости</ion-title>
				</ion-toolbar>
			</ion-header>
			<ion-refresher slot="fixed" pull-factor="0.5" pull-min="100" pull-max="200" @ionRefresh="doRefresh($event)">
				<ion-refresher-content></ion-refresher-content>
			</ion-refresher>
			<div v-if="newsRef == null">
				<ion-card>
					<ion-card-content color="muted" class="ion-text-muted">
						Пока что пусто
					</ion-card-content>
				</ion-card>
			</div>
			<ion-card v-for="(news, i) in newsRef" v-bind:key="i">
				<div
					v-if="news.img"
					class="card-image"
					:style="{backgroundImage: 'url(' + news.img + ')'}"
				></div>
				<ion-card-header>
					<ion-card-title>{{ news.title }}</ion-card-title>
				</ion-card-header>
				<ion-card-content color="muted" class="d-flex ion-justify-content-between">
					<i>{{ news.time }}</i>
					<b @click="getNewsInfo(news)">Подробнее</b>
				</ion-card-content>
			</ion-card>
			<ion-modal
				:is-open="isOpenRef"
			>
				<Modal
					v-on:close-modal="closeModal"
					v-bind:dataModal="dataModal"
				></Modal>
			</ion-modal>
		</ion-content>
	</ion-page>
</template>

<script lang="ts">
	import {
		IonPage,
		IonCard,
		IonCardTitle,
		IonCardHeader,
		IonCardContent,
		IonHeader, 
		IonToolbar, 
		IonTitle, 
		IonContent, 
		IonModal, 
		IonRefresher,
		IonRefresherContent,
	} from '@ionic/vue';
	import { defineComponent, ref } from 'vue';
	import Modal from '@/components/Modal.vue';
	import axios from 'axios';

	export default defineComponent({
		name: 'News',
		components: { 
			IonHeader, 
			IonToolbar, 
			IonTitle, 
			IonContent, 
			IonPage,
			IonCard,
			IonCardTitle,
			IonCardHeader,
			IonCardContent,
			IonModal, 
			Modal,
			IonRefresher,
			IonRefresherContent,
		},
		setup() {
			const newsRef   = ref<any>(null);
			const dataModal = ref<any>({});
			const isOpenRef = ref<boolean>(false);
			
			const getNews = (callback: any = null) => {
				axios.get('news/getAll').then((response: any) => {
					const { data } = response;

					newsRef.value = data.news;

					if (callback) callback();
				}).catch((error: any) => {
					const { response } = error;

					if (response.data.errorType == 'empty_data') {
						newsRef.value = null;
					} else {
						console.error(response);
					}
					if (callback) callback();
				});
			};

			const doRefresh = (event: any) => {
				getNews(() => {
					event.target.complete();
				});
			};

			const closeModal = () => {
				isOpenRef.value = false;
			};
			
			const getNewsInfo = (news: any) => {
				dataModal.value = news;
				isOpenRef.value = true;
			};

			getNews();
			
			return {
				newsRef,
				isOpenRef, 
				dataModal,
				doRefresh,
				closeModal, 
				getNewsInfo 
			};
		}
	});
</script>
