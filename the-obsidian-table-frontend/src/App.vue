<script setup lang="ts">
	import { RouterView, RouterLink, useRoute } from "vue-router";
	import { onMounted, onUnmounted, computed } from 'vue'
	import Menubar from 'primevue/menubar';
	import type { MenuItem } from 'primevue/menuitem'
	import logoUrl from '@/assets/icons/obsidian_table_logo.svg'
	import './assets/base.css'
	import './assets/nav.css'

	const route = useRoute()
	const isAdminRoute = computed(() => route.path === '/login' || route.path.startsWith('/admin'))

	const items: MenuItem[] = [
		{ label: 'Home', route: '/' },
		{ label: 'Philosophy', route: '/philosophy' },
		{ label: 'Archives', route: '/archives' },
		{ label: 'About', route: '/about' },
		{ label: 'FAQ', route: '/faq' },
	]

	if(window.innerWidth > 768) {
		const handleNavScroll = () => {
			const header = document.querySelector('header') as HTMLElement
			if (header) {
				header.classList.toggle('scrolled', window.scrollY > 50)
			}
		}

		onMounted(() => window.addEventListener('scroll', handleNavScroll))
		onUnmounted(() => window.removeEventListener('scroll', handleNavScroll))
	}
</script>

<template>
	<header v-if="!isAdminRoute">
		<Menubar :model="items" class="navbar">
			<template #start>
				<div class="blog-brand">
					<img :src="logoUrl" alt="" class="blog-logo" />
					<h1 class="blog-title playfair-display">The Obsidian Table</h1>
				</div>
			</template>
			<template #item="{ item }">
				<RouterLink :to="item.route" class="nav-item-link">
				{{ item.label }}
				</RouterLink>
			</template>
		</Menubar>
	</header>

	<RouterView />

	<footer v-if="!isAdminRoute">
		<div class="footer-wrapper">
			<div class="legals">
				<span class="playfair-display">The Obsidian Table</span>
				<p>© 2025 The Obsidian Table — All rights reserved.</p>
			</div>
			<div class="links">
				<a class="underline" href="https://github.com/Sladeck">My Github</a>
				<a class="underline" href="https://github.com/Sladeck/TheObsidianTable.git">See this repository</a>
			</div>
		</div>
	</footer>

</template>