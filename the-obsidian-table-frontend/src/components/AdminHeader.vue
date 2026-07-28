<script setup>
import { RouterLink, useRouter } from "vue-router";
import { Button } from "primevue";
import { AuthService } from "@/service/AuthService";
import { useAuth } from "@/composables/useAuth";

const router = useRouter();
const { setAuthenticated } = useAuth();

async function logout() {
	await AuthService.logout().catch(() => {});
	setAuthenticated(false);
	router.push("/login");
}
</script>

<template>
	<header class="admin-header">
		<RouterLink to="/admin" class="admin-title playfair-display">The Obsidian Table — Admin</RouterLink>
		<div class="admin-actions">
			<RouterLink to="/" class="underline" target="_blank">View site</RouterLink>
			<Button label="Log out" size="small" text @click="logout" />
		</div>
	</header>
</template>

<style>
	.admin-header {
		position: static;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 20px 24px;
		border-bottom: 1px solid var(--Stroke);
		background-color: var(--BGBackground);

		.admin-title {
			color: var(--Obsidian);
			font-size: 1.1rem;
			text-decoration: none;
		}

		.admin-actions {
			display: flex;
			align-items: center;
			gap: 20px;

			a {
				font-size: 0.85rem;
			}

			.p-button {
				color: var(--TextMuted);
				font-size: 0.85rem;
			}
		}
	}
</style>
