<script setup lang="ts">
	import { RouterView } from "vue-router";
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

</template>