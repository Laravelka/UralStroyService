<template>
	<ion-page>
		<ion-tabs @ionTabsWillChange="beforeTabChange">
			<ion-tab-bar slot="bottom">
				<ion-tab-button tab="profile" href="/tabs/profile">
					<ion-icon :icon="person" />
					<ion-label>Профиль</ion-label>
				</ion-tab-button>
				<ion-tab-button tab="add" @click="onTabClick" :selected="isAddRef" href="/tabs/add">
					<div class="round">
						<ion-icon size="large" :icon="isAddRef ? closeOutline : add" />
					</div>
				</ion-tab-button>
				<ion-tab-button tab="myUK" href="/tabs/myUK">
					<ion-icon :icon="business" />
					<ion-label>Моя УК</ion-label>
				</ion-tab-button>
			</ion-tab-bar>
		</ion-tabs>
	</ion-page>
</template>

<script lang="ts">
	import { IonTabBar, IonTabButton, IonTabs, IonLabel, IonIcon, IonPage } from '@ionic/vue';
	import { person, business, add, closeOutline } from 'ionicons/icons';
	import { defineComponent, ref } from 'vue';
	import { useRouter } from 'vue-router';

	export default defineComponent({
		name: 'Tabs',
		components: { IonLabel, IonTabs, IonTabBar, IonTabButton, IonIcon, IonPage },
		setup() {
			const router = useRouter();
			const isAddRef = ref<boolean>(false);

			const onTabClick = () => {
				if (isAddRef.value) {
					isAddRef.value = false;
					router.replace('/tabs/news');
				}
			};

			const beforeTabChange = (e: any) => {
				if (e.tab == 'add') {
					isAddRef.value = true;
				} else {
					isAddRef.value = false;
				}
			};

			return {
				add,
				// close,
				person,
				business,
				isAddRef,
				onTabClick,
				closeOutline,
				beforeTabChange
			}
		}
	});
</script>
