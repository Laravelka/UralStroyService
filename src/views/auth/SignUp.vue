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
									v-model="form.email"
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
									v-model="form.password"
								></ion-input>
							</ion-item>
							<div class="padding-top-large ion-text-center">
								<ion-button
									color="krayola"
									class="ion-color-krayola"
									type="submit"
									expand="full"
									shape="round"
									@click="signUp"
								>
									<ion-spinner
										v-if="isPressedRef"
										name="dots"
									></ion-spinner>
									<div v-else>Зарегистрироваться</div>
								</ion-button>
							</div>
							<div
								class="ion-text-center ion-margin-top"
							>У вас уже есть аккаунт?</div>
							<div class="form-button padding-top-none padding-bottom-large">
								<ion-button
									color="muted"
									type="button"
									expand="block"
									fill="clear"
									router-link="/signin"
								>Войти</ion-button>
							</div>
						</ion-list>
					</ion-col>
				</ion-row>
			</ion-grid>
			<ion-toast
				:is-open="isOpenRef"
				:message="messageRef"
				:duration="2000"
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

	} from '@ionic/vue'
	import axios from 'axios';
	import { useRouter } from 'vue-router';
	import { defineComponent, ref } from 'vue';

	export default defineComponent({
		name: 'SignUp',
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
			// IonIcon
			IonSpinner,

		},
		data: () => ({
			form: {
				email: "",
				password: ""
			}
		}),
		setup() {
			const router = useRouter();

			const isOpenRef    = ref(false);
			const messageRef   = ref('');
			const isPressedRef = ref(false);

			const setOpen    = (state: boolean) => isOpenRef.value = state;
			const setMessage = (state: string) => messageRef.value = state;
			const setPressed = (state: boolean) => isOpenRef.value = state;

			const signUp = () => {
				setPressed(true);

				axios.post('/sanctum/signup').then(response => {
					if (response.data.message) {
						setOpen(true);
						setMessage(response.data.message);
					}
					setPressed(false);
				}).catch(error => {
					const { response } = error;

					if (response.data.message) {
						setOpen(true);
						setMessage(response.data.message);
					}
					setPressed(false);
					console.error('response:', response);
				});
			};

			return {
				router,
				signUp,
				setOpen,
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
