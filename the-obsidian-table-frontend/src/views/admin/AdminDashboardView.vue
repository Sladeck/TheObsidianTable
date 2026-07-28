<script setup>
import { ref, computed, onMounted } from "vue";
import { RouterLink, useRouter } from "vue-router";
import { DataTable, Column, Button, InputText, ConfirmDialog, Toast } from "primevue";
import { useConfirm } from "primevue/useconfirm";
import { useToast } from "primevue/usetoast";
import AdminHeader from "@/components/AdminHeader.vue";
import { RestaurantService } from "@/service/RestaurantService";

const router = useRouter();
const confirm = useConfirm();
const toast = useToast();

const restaurants = ref([]);
const loading = ref(true);
const error = ref(false);
const keyword = ref("");

const filteredRestaurants = computed(() => {
	const query = keyword.value.trim().toLowerCase();
	if (!query) return restaurants.value;
	return restaurants.value.filter((r) => r.name.toLowerCase().includes(query));
});

async function load() {
	loading.value = true;
	error.value = false;
	try {
		restaurants.value = await RestaurantService.getRestaurants({ sort: "latest" });
	} catch (err) {
		console.error(err);
		error.value = true;
	} finally {
		loading.value = false;
	}
}

onMounted(load);

function goToEdit(slug) {
	router.push(`/admin/restaurants/${slug}/edit`);
}

function confirmDelete(restaurant) {
	confirm.require({
		message: `Delete "${restaurant.name}"? This can't be undone.`,
		header: "Confirm deletion",
		icon: "pi pi-exclamation-triangle",
		acceptLabel: "Delete",
		rejectLabel: "Cancel",
		acceptProps: { severity: "danger" },
		accept: async () => {
			try {
				await RestaurantService.deleteRestaurant(restaurant.slug);
				toast.add({ severity: "success", summary: "Deleted", detail: `${restaurant.name} was removed.`, life: 3000 });
				await load();
			} catch (err) {
				toast.add({ severity: "error", summary: "Failed to delete", detail: err.message, life: 4000 });
			}
		},
	});
}
</script>

<template>
	<div id="admin-dashboard">
		<AdminHeader />
		<Toast />
		<ConfirmDialog />

		<div class="dashboard-wrapper">
			<div class="dashboard-header">
				<h2 class="playfair-display">Restaurants</h2>
				<RouterLink to="/admin/restaurants/new">
					<Button label="+ New Restaurant" />
				</RouterLink>
			</div>

			<InputText v-model="keyword" placeholder="Search by name" class="search-input" />

			<DataTable :value="filteredRestaurants" :loading="loading" dataKey="slug" responsiveLayout="scroll">
				<Column field="name" header="Name" />
				<Column field="type" header="Cuisine" />
				<Column field="totalScore" header="Score" />
				<Column header="City">
					<template #body="{ data }">{{ data.location.city }}</template>
				</Column>
				<Column header="Actions">
					<template #body="{ data }">
						<div class="row-actions">
							<Button label="Edit" size="small" text @click="goToEdit(data.slug)" />
							<Button label="Delete" size="small" text severity="danger" @click="confirmDelete(data)" />
						</div>
					</template>
				</Column>
			</DataTable>

			<p v-if="!loading && !error && !restaurants.length" class="empty-state">No restaurants yet — add your first one.</p>
			<p v-if="!loading && !error && restaurants.length && !filteredRestaurants.length" class="empty-state">No restaurants match "{{ keyword }}".</p>
			<p v-if="error" class="empty-state">Couldn't load restaurants. Please try again later.</p>
		</div>
	</div>
</template>

<style>
	#admin-dashboard {
		min-height: 100vh;
		background-color: var(--BGBackground);

		.dashboard-wrapper {
			max-width: 1100px;
			margin: 0 auto;
			padding: 56px 24px 80px;

			.dashboard-header {
				display: flex;
				align-items: center;
				justify-content: space-between;
				margin-bottom: 32px;

				h2 {
					color: var(--WhiteAshes);
					font-size: 2rem;
				}

				.p-button {
					background-color: var(--Obsidian);
					border-color: var(--Obsidian);
				}
			}

			.search-input {
				width: 100%;
				max-width: 320px;
				margin-bottom: 24px;
			}

			.p-datatable {
				.row-actions {
					display: flex;
					gap: 8px;
				}
			}

			.empty-state {
				color: var(--TextMuted);
				text-align: center;
				padding: 48px 0;
			}
		}
	}
</style>
