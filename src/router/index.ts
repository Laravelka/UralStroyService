import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import Tabs from '@/views/Tabs.vue';

const routes: Array<RouteRecordRaw> = [
	{
		path: '/',
		redirect: '/tabs/news'
	},
	{
		path: '/signin',
		name: 'SignIn',
		meta: {
			auth: false
		},
		component: () => import('@/views/auth/SignIn.vue')
	},
	{
		path: '/signup',
		name: 'SignUp',
		meta: {
			auth: false
		},
		component: () => import('@/views/auth/SignUp.vue')
	},
	{
		path: '/error',
		name: 'Error',
		component: () => import('@/views/Error.vue')
	},
	{
		path: '/:pathMatch(.*)*',
		component: () => import('@/views/NotFound.vue')
	},
	{
		path: '/tabs/',
		meta: {
			auth: true
		},
		component: Tabs,
		children: [
			{
				path: '',
				redirect: '/tabs/news'
			},
			{
				path: 'news',
				name: 'News',
				component: () => import('@/views/News.vue')
			},
			{
				path: 'profile',
				name: 'Profile',
				component: () => import('@/views/Profile.vue')
			},
			{
				path: 'settings',
				name: 'Settings',
				component: () => import('@/views/Settings.vue')
			},
			{
				path: 'add',
				name: 'Add',
				component: () => import('@/views/AddApplication.vue'),
			},
			{
				path: 'add/:id',
				name: 'AddSelectMaster',
				component: () => import('@/views/AddApplication.vue'),
			},
			{
				path: 'myUK',
				name: 'MyUK',
				component: () => import('@/views/MyUK.vue')
			},
			{
				path: 'applications',
				name: 'Applications',
				component: () => import('@/views/Applications.vue')
			},
			{
				path: 'applications/update/:id',
				name: 'EditApp',
				component: () => import('@/views/EditApp.vue')
			}
		]
	}
];

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes
});

router.beforeEach((to, from, next) => {
	const token = localStorage.getItem('authToken');

	if (to.meta.auth === true && token === null) {
		next({name: 'SignIn'});
	} else if (to.meta.auth === false && token !== null) {
		next({name: 'News'});
	} else {
		next();
	}
});

export default router;
