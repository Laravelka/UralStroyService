<template>
	<ion-page>
		<Header is-custom-back title="Настройки">
			<ion-header collapse="condense">
                <ion-toolbar>
                    <ion-title size="large">Настройки</ion-title>
                </ion-toolbar>
            </ion-header>
			<ion-list>
				<ion-card class="card-margin">
					<ion-item lines="full">
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
					<ion-item lines="none">
						<ion-label position="stacked">Имя и фамилия</ion-label>
						<ion-input v-model="userRef.name" placeholder="Введите имя и фамилию"></ion-input>
					</ion-item>
					<ion-item lines="none">
						<ion-label position="stacked">Телефон</ion-label>
						<ion-input v-model="userRef.phone" placeholder="Введите телефон"></ion-input>
					</ion-item>
					<ion-item lines="none">
						<ion-label position="stacked">Адрес</ion-label>
						<ion-input v-model="userRef.address" placeholder="Введите адрес"></ion-input>
					</ion-item>
					<div class="ion-padding">
						<ion-button shape="round" color="krayola">Сохранить</ion-button>
					</div>
				</ion-card>
			</ion-list>
		</Header>
	</ion-page>
</template>

<script lang="ts">
	import {
		IonToolbar,
		IonHeader,
		IonButton,
		IonTitle, 
	//	IonBadge,
		IonInput,
		IonCard,
		IonPage,
		IonList,
		IonItem,
		IonLabel,
	//	IonAvatar,
		IonIcon,

	} from '@ionic/vue';

	import { defineComponent, ref } from 'vue';
	import Header from '@/components/Header.vue';
	import { location, call } from 'ionicons/icons';

	export default defineComponent({
		name: 'Settings',
		components: {
			IonToolbar,
			IonHeader,
			IonButton,
			IonTitle,
			IonInput,
			IonPage,
			IonList,
			IonItem,
			IonCard,
		//	IonBadge,
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