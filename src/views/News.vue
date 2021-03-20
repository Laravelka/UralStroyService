<template>
	<ion-page>
		<Header is-not-back title="Новости">
			<ion-header collapse="condense">
				<ion-toolbar>
					<ion-title size="large">Новости</ion-title>
				</ion-toolbar>
			</ion-header>
			<ion-refresher slot="fixed" pull-factor="0.5" pull-min="100" pull-max="200" @ionRefresh="doRefresh($event)">
				<ion-refresher-content></ion-refresher-content>
			</ion-refresher>
			<div v-if="isLoadRef">
				<ion-grid>
					<ion-row class="ion-justify-content-center ion-align-items-center centered-form">
						<ion-col size-xs="12" size-sm="8" size-md="5" size-xl="3" class="ion-text-center">
							<ion-spinner
								name="dots"
							></ion-spinner>
						</ion-col>
					</ion-row>
				</ion-grid>
			</div>
			<div v-else-if="newsRef == null">
				<ion-grid>
					<ion-row class="ion-justify-content-center ion-align-items-center centered-form">
						<ion-col size-xs="12" size-sm="8" size-md="5" size-xl="3" class="ion-text-center">
							<span color="muted" class="text-muted">Пока что пусто</span>
						</ion-col>
					</ion-row>
				</ion-grid>
			</div>
			<ion-card v-for="(news, i) in newsRef" v-bind:key="i">
				<div
					v-if="news.image"
					class="card-image"
					:style="{backgroundImage: 'url(' + news.image + ')'}"
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
		</Header>
	</ion-page>
</template>

<script lang="ts">
	import {
		IonPage,
		IonCard,
		IonGrid,
		IonRow,
		IonCol,
		IonSpinner,
		IonCardTitle,
		IonCardHeader,
		IonCardContent,
		IonHeader, 
		IonToolbar, 
		IonTitle,
		IonModal, 
		IonRefresher,
		IonRefresherContent,
	} from '@ionic/vue';
	import Header from '@/components/Header.vue';
	import { defineComponent, ref } from 'vue';
	import Modal from '@/components/Modal.vue';
	import axios from 'axios';

	export default defineComponent({
		name: 'News',
		components: { 
			IonHeader, 
			IonToolbar, 
			IonTitle,
			IonPage,
			IonCard,
			IonGrid,
			IonRow,
			IonCol,
			IonSpinner,
			IonCardTitle,
			IonCardHeader,
			IonCardContent,
			IonModal, 
			Modal,
			Header,
			IonRefresher,
			IonRefresherContent,
		},
		setup() {
			const newsRef   = ref<any>(null);
			const dataModal = ref<any>({});
			const isOpenRef = ref<boolean>(false);
			const isLoadRef = ref<boolean>(false);

			const getNews = (callback: any = null) => {
				if (!callback) isLoadRef.value = true;

				axios.get('news/getAll').then((response: any) => {
					const { data } = response;

					newsRef.value = data.news;

					if (callback) callback();

					isLoadRef.value = false;
				}).catch((error: any) => {
					const { response } = error;

					if (response.data.errorType == 'empty_data') {
						newsRef.value = null;
					} else {
						console.error(response);
					}
					if (callback) callback();

					isLoadRef.value = false;
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
				isLoadRef,
				dataModal,
				doRefresh,
				closeModal, 
				getNewsInfo 
			};
		}
	});
</script>

<style type="text/css">
	.centered-form {
		width: 100%;
		height: 80vh;
	}
</style>