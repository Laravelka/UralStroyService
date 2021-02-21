import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import Tabs from '../views/Tabs.vue'

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
		path: '/:pathMatch(.*)*',
		component: () => import('@/views/NotFound.vue')
	},
	{
		path: '/tabs/',
		component: Tabs,
		children: [
			{
				path: '',
				redirect: '/tabs/profile'
			},
			{
				path: 'news',
				component: () => import('@/views/News.vue')
			},
			{
				path: 'profile',
				component: () => import('@/views/Profile.vue')
			},
			{
				path: 'add',
				component: () => import('@/views/AddApplication.vue')
			},
			{
				path: 'myUK',
				component: () => import('@/views/MyUK.vue')
			}
		]
	}
]

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes
})

export default router
