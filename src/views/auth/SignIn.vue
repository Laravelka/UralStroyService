<template>
	<ion-page>
		<ion-content>
			<ion-grid>
				<ion-row class="ion-justify-content-center ion-align-items-center centered-form">
					<ion-col size-xs="12" size-sm="8" size-md="5" size-xl="3">
						<ion-list>
							<img src="/assets/img/logo.png">
							<ion-item class="item-style-top" lines="full">
								<ion-label
									position="stacked"
									size="large"
								>E-mail</ion-label>
								<ion-input
									autocomplete="email"
									autocorrect="on"
									placeholder="Введите e-mail"
									v-model="formRef.email"
								></ion-input>
							</ion-item>
							<ion-item class="item-style-bottom" lines="full">
								<ion-label
									position="stacked"
									size="large"
								>Пароль</ion-label>
								<ion-input
									autocomplete="current-password"
									autocorrect="on"
									placeholder="Введите пароль"
									v-model="formRef.password"
								></ion-input>
							</ion-item>
							<div class="padding-top-large ion-text-center">
								<ion-button
									color="krayola"
									class="ion-color-krayola"
									type="submit"
									expand="full"
									shape="round"
									@click="signIn"
								>
									<ion-spinner
										v-if="isPressedRef"
										name="dots"
									></ion-spinner>
									<div v-else>Войти</div>
								</ion-button>
							</div>
							<div
								class="ion-text-center ion-margin-top"
							>Еще нет аккаунта?</div>
							<div class="form-button padding-top-none padding-bottom-large">
								<ion-button
									color="muted"
									type="button"
									expand="block"
									fill="clear"
									router-link="/signup"
								>Регистрация</ion-button>
							</div>
						</ion-list>
					</ion-col>
				</ion-row>
			</ion-grid>
			<ion-toast
				:is-open="isOpenRef"
				:message="messageRef"
				:duration="5000"
				@onDidDismiss="setOpen(false)"
			>
			</ion-toast>
		</ion-content>
	</ion-page>
</template>

<script lang="ts">
	import {
		IonContent,
		IonList,
		IonPage,
		IonGrid,
		IonRow,
		IonCol,
		// IonCard,
		IonItem,
		IonLabel,
		IonButton,
		IonInput,
		// IonIcon
		IonSpinner,
		IonToast,

	} from '@ionic/vue'
	import axios from 'axios';
	import { useRouter } from 'vue-router';
	import { defineComponent, ref } from 'vue';

	export default defineComponent({
		name: 'SignIn',
		components: {
			IonContent,
			IonList,
			IonPage,
			IonGrid,
			IonRow,
			IonCol,
			// IonCard,
			IonItem,
			IonLabel,
			IonButton,
			IonInput,
			//IonIcon
			IonSpinner,
			IonToast,

		},
		setup() {
			const router = useRouter();

			const formRef = ref<any|null>({
				email: "",
				password: ""
			});
			const isOpenRef    = ref(false);
			const messageRef   = ref('');
			const isPressedRef = ref(false);

			const setOpen    = (state: boolean) => isOpenRef.value = state;
			const setMessage = (state: string) => messageRef.value = state;
			const setPressed = (state: boolean) => isPressedRef.value = state;

			const signIn = () => {
				setPressed(true);

				axios.post('/sanctum/signin', formRef.value).then(response => {
					const { data } = response;
					
					localStorage.setItem('user', JSON.stringify(data.user));
					localStorage.setItem('authToken', data.token);

					axios.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;

					if (data.message) {
						setMessage(data.message);
						setOpen(true);
					}
					setPressed(false);
					setTimeout(() => {
						router.push({name: 'News'});
					}, 2000);
				}).catch(error => {
					const { response } = error;

					if (response && response.data.message) {
						setOpen(true);
						setMessage(response.data.message);
					} else if (response && response.data.messages) {
						let i = 0;
						let message = '';
						
						for (const key in response.data.messages) {
							if (i == 0) message = response.data.messages[key][0];
							i++;
						}
						setMessage(message);
						setOpen(true);
					} else if (error) {
						setOpen(true);
						setMessage(error.message);
					}
					setPressed(false);

					console.error('Error:', error);
				});
			};

			return {
				router,
				signIn,
				setOpen,
				formRef,
				isOpenRef,
				messageRef,
				setMessage,
				setPressed,
				isPressedRef,

			};
		},

	});
</script>

<style type="text/css">
	.centered-form {
		width: 100%;
		height: 90vh;
	}

	.form-button {
		padding-top: var(--ion-padding, 12px);
		padding-left: var(--ion-padding, 12px);
		padding-right: var(--ion-padding, 12px);
		padding-bottom: var(--ion-padding, 12px);
	}

	.padding-top-none {
		padding-top: 0!important;
	}

	.padding-bottom-none {
		padding-bottom: 0!important;
	}

	.padding-bottom-large {
		padding-bottom: var(--ion-padding, 24px)!important;
	}

	.padding-top-large {
		padding-top: var(--ion-padding, 24px)!important;
	}

	@media (prefers-color-scheme: dark) {
		ion-list {
			background: rgba(0, 0, 0, 0)!important;
		}

		ion-item {
			--background: rgb(0 0 0 / 30%)!important;
		}
	}
</style>
