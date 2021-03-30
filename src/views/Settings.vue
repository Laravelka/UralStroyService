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
							<div @click="onClickEdit" class="avatar-upload">
								<input type="file" id="avatar" ref="avatar" @change="handleFileUpload" accept="image/*">
								<template v-if="isAvatarLoadRef">
									<ion-spinner name="circles"></ion-spinner>
								</template>
								<ion-icon v-else color="white" class="upload-icon" size="default" :md="cameraSharp" :ios="cameraOutline"></ion-icon>
							</div>
						</div>
					</ion-item>
					<ion-item lines="full">
						<ion-icon slot="start" :icon="moon"></ion-icon>
						<ion-label>Темная тема</ion-label>
						<ion-toggle v-model="isDarkRef" color="light" id="themeToggle" @ionChange="onChangeTheme" slot="end"></ion-toggle>
					</ion-item>
					<ion-item lines="none">
						<ion-label position="stacked">
							<h2>Имя</h2>
							<h3><p v-html="messagesRef.name" class="input-error"></p></h3>
						</ion-label>
						<ion-input class="custom" v-model="userRef.name" placeholder="Введите имя"></ion-input>
					</ion-item>
					<ion-item lines="none">
						<ion-label position="stacked">
							<h2>Телефон</h2>
							<h3><p v-html="messagesRef.phone" class="input-error"></p></h3>
						</ion-label>
						<ion-input class="custom" v-model="userRef.phone" placeholder="Введите телефон"></ion-input>
					</ion-item>
					<ion-item lines="none">
						<ion-label position="stacked">
							<h2>E-mail</h2>
							<h3><p v-html="messagesRef.email" class="input-error"></p></h3>
						</ion-label>
						<ion-input class="custom" v-model="userRef.email" placeholder="Введите e-mail"></ion-input>
					</ion-item>
					<ion-item lines="none">
						<ion-label position="stacked">
							<h2>Адрес</h2>
							<h3><p v-html="messagesRef.address" class="input-error"></p></h3>
						</ion-label>
						<ion-input class="custom" v-model="userRef.address" placeholder="Введите адрес"></ion-input>
					</ion-item>
					<div class="ion-padding">
						<ion-button @click="updateUser" expand="full" shape="round" color="krayola">
							<template v-if="isLoadRef">
								<ion-spinner name="dots"></ion-spinner>
							</template>
							<template v-else>
								Сохранить
							</template>
						</ion-button>
					</div>
				</ion-card>
			</ion-list>
		</Header>
	</ion-page>
</template>

<script lang="ts">
	import {
		alertController,
		IonToolbar,
		IonSpinner,
		IonHeader,
		IonButton,
		IonToggle,
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
	import axios from 'axios';
	import { defineComponent, ref } from 'vue';
	import Header from '@/components/Header.vue';
	import { location, call, moon, cameraOutline, cameraSharp } from 'ionicons/icons';

	export default defineComponent({
		name: 'Settings',
		components: {
			IonSpinner,
			IonToolbar,
			IonHeader,
			IonButton,
			IonToggle,
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
			const isLoadRef = ref(false);
			const isDarkRef = ref<boolean>(false);
			const messagesRef = ref<any>({});
			const isAvatarLoadRef = ref(false);

			const json = localStorage.getItem('user');

			if (json !== null) {
				userRef.value = JSON.parse(json);
			}

			const handleFileUpload = (event: any) => {
				const formData = new FormData();

				formData.append('avatar', event.target.files[0]);
				
				isAvatarLoadRef.value = true;

				axios.post('user/updateAvatar', formData).then(async(response: any) => {
					const { data } = response;

					userRef.value = data.user;
					localStorage.setItem('user', JSON.stringify(data.user));

					isAvatarLoadRef.value = false;
				}).catch(async(error: any) => {
					const { response } = error;

					isAvatarLoadRef.value = false;

					if (response && response.data) {
						const { data } = response;

						if (data && data.message) {
							const alert = await alertController
								.create({
									header: 'Ошибка',
									message: `<p class="text-danger">${data.message}</p>`,
								});
							return alert.present();
						} else if (data && data.messages) {
							const alert = await alertController
								.create({
									header: 'Ошибка',
									message: `<p class="text-danger">${data.messages.avatar[0]}</p>`,
								});
							return alert.present();
						}
					} else {
						const alert = await alertController
							.create({
								header: 'Ошибка',
								message: `<p class="text-danger">Неизвестная ошибка сервера.</p>`,
							});
						return alert.present();
					}
					
				});
			};

			const updateUser = () => {
				isLoadRef.value = true;

				axios.post('user/update', userRef.value).then(async(response: any) => {
					const { data } = response;

					userRef.value = data.user;
					localStorage.setItem('user', JSON.stringify(data.user));

					isLoadRef.value = false;
				}).catch(async(error: any) => {
					const { response } = error;

					if (response && response.data) {
						const { data } = response;

						isLoadRef.value = false;

						if (data.message) {
							const alert = await alertController
								.create({
									header: 'Ошибка',
									message: `<p class="text-danger">${data.message}</p>`,
								});
							return alert.present();
						} else if (data.messages) {
							for(const i in data.messages) {
								const item = data.messages[i];

								messagesRef.value[i] = item[0];
							}

							setTimeout(() => {
								messagesRef.value = {};
							}, 6000);
						}
					} else {
						const alert = await alertController
							.create({
								header: 'Ошибка',
								message: `<p class="text-danger">Неизвестная ошибка сервера.</p>`,
							});
						return alert.present();
					}
				});
			};
			const theme = localStorage.getItem('theme') ?? 'light';

			isDarkRef.value = theme == 'dark';

			const onChangeTheme = (event: any) => {
				isDarkRef.value = event.detail.checked;

				localStorage.setItem('theme', isDarkRef.value ? 'dark' : 'light');

				document.body.classList.toggle('dark', isDarkRef.value);
			};

			return {
				call,
				moon,
				userRef,
				location,
				isDarkRef,
				isLoadRef,
				updateUser,
				cameraSharp,
				messagesRef,
				onChangeTheme,
				cameraOutline,
				isAvatarLoadRef,
				handleFileUpload,
			}
		}
	});
</script>

<style>
	.avatar-upload {
		width: 100%;
		height: 100%;
		position: relative;
		overflow: hidden;
		display: flex;
		background: rgb(0 0 0 / 30%);
		border-radius: 100%;
		justify-content: center;
		align-items: center;
	}

	input#avatar {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		opacity: 0;
		z-index: 1;
	}

	.avatar-upload > ion-icon {
		font-size: 25px!important;
	}
	
	.input-error {
		color: #eb445a;
		padding: 0 4px;
		font-size: small;
	}
</style>