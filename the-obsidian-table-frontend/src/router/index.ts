import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import PhylosophyView from '@/views/PhylosophyView.vue'
import ArchivesView from '@/views/ArchivesView.vue'
import AboutView from '@/views/AboutView.vue'
import FaqView from '@/views/FaqView.vue'
import { useAuth } from '@/composables/useAuth'

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: '/',
			name: 'home',
			component: HomeView,
		},
		{
			path: '/philosophy',
			name: 'philosophy',
			component: PhylosophyView,
		},
		{
			path: '/archives',
			name: 'archives',
			component: ArchivesView,
		},
		{
			path: '/about',
			name: 'about',
			component: AboutView,
		},
		{
			path: '/faq',
			name: 'faq',
			component: FaqView,
		},
		{
			path: '/restaurant/:slug',
			name: 'restaurant',
			component: () => import('@/views/RestaurantView.vue')
		},
		{
			path: '/login',
			name: 'login',
			component: () => import('@/views/LoginView.vue'),
		},
		{
			path: '/admin/setup-2fa',
			name: 'admin-setup-2fa',
			component: () => import('@/views/admin/Setup2FAView.vue'),
		},
		{
			path: '/admin',
			name: 'admin-dashboard',
			component: () => import('@/views/admin/AdminDashboardView.vue'),
			meta: { requiresAuth: true },
		},
		{
			path: '/admin/restaurants/new',
			name: 'admin-restaurant-new',
			component: () => import('@/views/admin/AdminRestaurantFormView.vue'),
			meta: { requiresAuth: true },
		},
		{
			path: '/admin/restaurants/:slug/edit',
			name: 'admin-restaurant-edit',
			component: () => import('@/views/admin/AdminRestaurantFormView.vue'),
			meta: { requiresAuth: true },
		},
	],
})

router.beforeEach(async (to) => {
	if (!to.meta.requiresAuth) return true

	const { isAuthenticated, checked, checkAuth } = useAuth()
	if (!checked.value) {
		await checkAuth()
	}

	if (!isAuthenticated.value) {
		return { name: 'login' }
	}

	return true
})

export default router
