<template>
	<ion-page>
		<Header title="Моя УК">
			<ion-card>
				<ion-list>
					<svg class="bd-placeholder-img bd-placeholder-img-lg img-fluid" width="100%" height="200" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: Фото УК" preserveAspectRatio="xMidYMid slice" focusable="false"><title>Placeholder</title><rect width="100%" height="100%" fill="#868e96"></rect><text x="50%" y="50%" fill="#dee2e6" dy=".3em">Фото УК</text></svg>
					<ion-item lines="full">
						<ion-label>
							<p>
								<ion-icon slot="start" class="icon-position" :icon="location"></ion-icon>
								Улица, Дом, Квартира
							</p>
							<p>
								<ion-icon slot="start" class="icon-position" :icon="call"></ion-icon>
								+79384767643
							</p>
							<p>
								<ion-icon slot="start" class="icon-position" :icon="mail"></ion-icon>
								example@gmail.com
							</p>
						</ion-label>
					</ion-item>
					<ion-item style="padding: 0" lines="full" href="/tabs/news">
						Написать УК
					</ion-item>
					<ion-item lines="none" href="/typeUk">
						Новости
					</ion-item>
				</ion-list>
			</ion-card>
		</Header>
	</ion-page>
</template>

<script lang="ts">
	import {
		// IonCard,
		IonPage,
		IonList,
		IonItem,
		IonLabel,
		IonIcon,

	} from '@ionic/vue';

	import { defineComponent } from 'vue';
	import Header from '@/components/Header.vue';
	import { location, call, mail } from 'ionicons/icons';

	export default defineComponent({
		name: 'MyUK',
		components: {
			IonPage,
			IonList,
			IonItem,
			// IonCard,
			IonLabel,
			IonIcon,
			Header,
		},
		setup() {
			return {
				call,
				mail,
				location
			}
		}
	});
</script>

<style type="text/css">
	ion-list {
		background: rgba(0, 0, 0, 0)!important;
	}

	ion-item {
		padding: 1px 0;
		--background: #fff!important;
	}

	.icon-position {
		position: relative;
		top: 2px;
	}

	.bd-placeholder-img-lg {
		font-size: calc(1.475rem + 2.7vw);
	}

	.bd-placeholder-img {
		font-size: 1.125rem;
		text-anchor: middle;
		-webkit-user-select: none;
		-moz-user-select: none;
		user-select: none;
	}

	.img-fluid {
		max-width: 100%;
		height: auto;
	}

	ion-card .list-md {
		padding: 0;
	}
</style>
