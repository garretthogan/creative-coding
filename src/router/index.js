import { createRouter, createWebHistory } from 'vue-router';
import Responsive from '../views/Responsive.vue';

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: '/',
			name: 'home',
			component: Responsive,
		},
	],
});

export default router;
