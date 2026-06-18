<script setup lang="ts">
	import { RouterView } from "vue-router";
	import { onMounted, onUnmounted } from 'vue'
	import Menubar from 'primevue/menubar';
	import type { MenuItem } from 'primevue/menuitem'
	import './assets/base.css'
	import './assets/nav.css'

	const items: MenuItem[] = [
		{ label: 'Home', route: '/' },
		{ label: 'Philosophy', route: '/philosophy' },
		{ label: 'Archives', route: '/archives' },
		{ label: 'About', route: '/about' },
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
	<header>
		<Menubar :model="items" class="navbar">
			<template #start>
				<h1 class="blog-title playfair-display">The Obsidian Table</h1>
			</template>
			<template #item="{ item }">
				<RouterLink :to="item.route" class="nav-item-link">
				{{ item.label }}
				</RouterLink>
			</template>
		</Menubar>
	</header>

	<RouterView />

	<footer>
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