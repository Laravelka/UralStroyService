import { createApp } from 'vue'
import App from './App.vue'
import router from './router';

import axios from 'axios';
import VueAxios from 'vue-axios';

import { IonicVue } from '@ionic/vue';

/* Core CSS required for Ionic components to work properly */
import '@ionic/vue/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/vue/css/normalize.css';
import '@ionic/vue/css/structure.css';
import '@ionic/vue/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/vue/css/padding.css';
import '@ionic/vue/css/float-elements.css';
import '@ionic/vue/css/text-alignment.css';
import '@ionic/vue/css/text-transformation.css';
import '@ionic/vue/css/flex-utils.css';
import '@ionic/vue/css/display.css';

/* Theme variables */
import './theme/variables.css';

const token = localStorage.getItem('authToken');

axios.defaults.withCredentials = true;
axios.defaults.baseURL = "https://app.ural-stroy-service.ru/api/";
axios.defaults.headers.common['Accept'] = 'application/json';
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

const app = createApp(App)
	.use(IonicVue)
	.use(router)
	.use(VueAxios, axios);

app.directive('up-first-letter', {
	beforeMount(el, binding, vnode) {
		const string = vnode.el.innerText;

		el.innerText = string.charAt(0).toUpperCase() + string.slice(1);
	}
});

router.isReady().then(() => {
	axios.interceptors.response.use(function (response) {
		return response;
	}, function (error) {
		const { response } = error;
		
		if (response && response.status == 401) {
			localStorage.removeItem('user');
			localStorage.removeItem('authToken');

			router.replace({name: 'SignIn'});
		} else if (error.message == 'Network Error') {
			router.replace({
				name: 'Error', 
				params: {
					code: 'network error',
					message: 'Check your internet connection'
				}
			});
		} else if (error.message) {
			console.error(error.message, JSON.stringify(error))
		}
		return Promise.reject(error);
	});
	app.mount('#app');
});
