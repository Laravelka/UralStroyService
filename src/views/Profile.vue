<template>
	<ion-page>
		<Header title="Профиль">
			<ion-list>
				<ion-card class="card-margin">
					<ion-item lines="none">
						<ion-label>
							<h2>{{ userRef.name }}</h2>
							<p>id: {{ userRef.id }}</p>
							<p>
								<ion-icon slot="start" class="icon-position" :icon="location"></ion-icon>
								{{ userRef.address ?? 'Не указан' }}
							</p>
							<p>
								<ion-icon slot="start" class="icon-position" :icon="call"></ion-icon>
								{{ userRef.phone ?? 'Не указан' }}
							</p>
						</ion-label>
						<div 
							class="profile-avatar" 
							v-bind:style="{
								backgroundImage: `url(${userRef.avatar ?? '/assets/img/avatar.svg'})`
							}"
						>
							<div @click="onClickEdit" class="avatar-edit">
								<span class="icon"></span>
							</div>
						</div>
					</ion-item>
				</ion-card>
				<ion-card class="card-margin">
					<ion-item lines="none">
						<ion-label>Мои заявки</ion-label>
						<ion-badge color="warning" slot="end">1</ion-badge>
					</ion-item>
				</ion-card>
				<ion-card class="card-margin">
					<ion-item lines="none" router-link="/tabs/news">
						Новости
					</ion-item>
				</ion-card>
				<ion-card class="card-margin">
					<ion-item lines="none" router-link="/notifications">
						Оповещения
					</ion-item>
				</ion-card>
				<ion-card class="card-margin">
					<ion-item lines="none" router-link="/settings">
						Настройки
					</ion-item>
				</ion-card>
			</ion-list>
		</Header>
	</ion-page>
</template>

<script lang="ts">
	import {
		IonCard,
		IonPage,
		IonList,
		IonItem,
		IonBadge,
		IonLabel,
		// IonAvatar,
		IonIcon,

	} from '@ionic/vue';

	import { defineComponent, ref } from 'vue';
	import Header from '@/components/Header.vue';
	import { location, call } from 'ionicons/icons';

	export default defineComponent({
		name: 'Profile',
		components: {
			IonPage,
			IonList,
			IonItem,
			IonCard,
			IonBadge,
			IonLabel,
		// 	IonAvatar,
			IonIcon,
			Header,
			
		},
		setup() {
			const userRef = ref<any>({});

			const json = localStorage.getItem('user');

			if (json !== null) {
				userRef.value = JSON.parse(json);
			}

			const onClickEdit = () => {
				console.log(123)
			}

			return {
				call,
				userRef,
				location,
				onClickEdit,
			}
		}
	});
</script>

<style type="text/css">
	ion-list {
		background: rgba(0, 0, 0, 0)!important;
	}

	ion-item {
		--background: rgba(0, 0, 0, 0.1)!important;
	}

	@media (prefers-color-scheme: light) {
		ion-item {
			--background: #fff!important;
		}
	}

	.icon-position {
		position: relative;
		top: 2px;
	}

	.profile-avatar {
		width: 75px;
		height: 75px;
		margin-right: 8px;
		border-radius: 50%;
		position: relative;
		background-size: cover;
		background-repeat: no-repeat;
		background-position: center;
		box-shadow: rgb(0 0 0 / 0.2) 0px 2px 16px;
		
	}

	.avatar-edit {
		right: -7px;
		padding: 2px;
		max-width: 22px;
		max-height: 22px;
		position: absolute;
		background-color: rgb(255 255 255 / 1);
		border-radius: 50% 0;
	}

	.avatar-edit .icon {
		width: 18px;
		height: 18px;
		display: inline-block;
		background-size: cover;
		background-image: url(/assets/icon/edit.svg);
		filter: invert(17%) sepia(86%) saturate(5568%) hue-rotate(183deg) brightness(95%) contrast(87%);
	}

	.card-margin {
		margin: 12px;
	}
</style>
