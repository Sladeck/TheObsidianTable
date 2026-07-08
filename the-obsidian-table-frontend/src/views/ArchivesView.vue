<script setup>
	import { ref, onMounted } from "vue";
	import { AutoComplete, MultiSelect, Skeleton } from "primevue";
	
	// Assets
	import { CountryService } from "@/service/CountryService";

	// Services
	import { RestaurantService } from "@/service/RestaurantService";

	// Components
	import RestaurantCard from "@/components/RestaurantCard.vue";

	const restaurants = ref([]);
	const loading = ref(true);

	onMounted(() => {
		CountryService.getCountries().then((data) => (countries.value = data));

		RestaurantService.getRestaurants()
			.then((data) => (restaurants.value = data))
			.catch((error) => console.error(error))
			.finally(() => (loading.value = false));
	});

	const countries = ref();
	const selectedCountry = ref();
	const filteredCountries = ref();


	const searchCountry = (event) => {
		setTimeout(() => {
			if (!event.query.trim().length) {
				filteredCountries.value = [...countries.value];
			} else {
				filteredCountries.value = countries.value.filter((country) => {
					return country.name.toLowerCase().startsWith(event.query.toLowerCase());
				});
			}
		}, 250);
	}

	const selectedCuisines = ref();
	const cuisines = ref([
		{ name: 'French', code: 'french' },
		{ name: 'Italian', code: 'italian' },
		{ name: 'Japanese', code: 'japanese' },
		{ name: 'Indian', code: 'indian' },
		{ name: 'Fast food', code: 'ff' },
		{ name: 'Korean', code: 'korean' }
	]);


</script>

<template>
	<main id="archives" class="main">
		<div class="section">
			<div class="wrapper">
				<div class="titles-filters">
					<div class="titles">
						<h2 class="playfair-display">The Archive</h2>
						<p>A collection of every meal that moved me. Search, filter, and remember.</p>
					</div>
					<div class="filters">
						<AutoComplete
							placeholder="Search by keyword"
							size="large"
						/>
						<AutoComplete
							v-model="selectedCountry"
							optionLabel="name"
							:suggestions="filteredCountries"
							@complete="searchCountry"
							placeholder="Search by country"
							size="large"
							showClear
						/>
						<MultiSelect
							v-model="selectedCuisines"
							:options="cuisines"
							showClear
							optionLabel="name"
							filter
							placeholder="Cuisine type"
							:max-selected-labels="4"
							class="multiselect"
							size="large"
						/>
					</div>
				</div>
				<hr>
				<div class="card-archive">
					<div class="wrapper" v-if="loading">
						<div class="skeleton-card" v-for="i in 8" :key="i">
							<Skeleton height="250px" borderRadius="0" />
							<div class="skeleton-card-body">
								<Skeleton width="40%" height="0.75rem" class="mb-2" />
								<Skeleton width="70%" height="1.8rem" class="mb-3" />
								<Skeleton width="100%" height="0.9rem" class="mb-2" />
								<Skeleton width="85%" height="0.9rem" class="mb-4" />
								<div class="skeleton-card-footer">
									<Skeleton width="35%" height="0.85rem" />
									<Skeleton width="15%" height="0.85rem" />
								</div>
							</div>
						</div>
					</div>
					<div class="wrapper" v-else-if="restaurants.length">
						<RestaurantCard
							v-for="restau in restaurants"
							:key="restau.slug"
							:slug="restau.slug"
							:name="restau.name"
							:score="restau.totalScore"
							:description="restau.description"
							:image="restau.images[0]"
							:cuisine="restau.type"
							:priceLevel="restau.priceLevel"
							:city="restau.location.city"
						/>
					</div>
					<p v-else class="empty-state">No restaurants to show yet.</p>
				</div>
			</div>

		</div>

	</main>
</template>

<style>
	#archives {
		.section {
			.wrapper {
				.titles-filters {
					display: flex;
					flex-direction: column;
					row-gap: 48px;
					margin-bottom: 24px;
					.titles {
						h2 {
							font-size: 28px;
						}
						p {
							margin: 5px 0;
						}
					}

					.filters {
						display: flex;
						flex-direction: column;
						row-gap: 24px;
						
						input, .p-multiselect {
							width: 100%;
							border-color: black;

							&:focus {
								border-color: var(--Obsidian);
							}
						}

						.p-focus {
							border-color: var(--Obsidian);
						}
					}
				}

				.card-archive {
					padding: 24px 0;
					.wrapper {
						display: flex;
						flex-direction: column;
						row-gap: 24px;
					}

					.empty-state {
						color: var(--TextMuted);
						padding: 24px 0;
					}

					.skeleton-card {
						background-color: var(--BGCard);
						border-radius: 4px;
						overflow: hidden;
						width: 320px;
						border: 1px solid var(--Divider);

						.skeleton-card-body {
							padding: 18px;
						}

						.skeleton-card-footer {
							display: flex;
							justify-content: space-between;
						}
					}
				}
			}
		}
	}

	.mb-2 {
		display: block;
		margin-bottom: 8px;
	}

	.mb-3 {
		display: block;
		margin-bottom: 12px;
	}

	.mb-4 {
		display: block;
		margin-bottom: 16px;
	}

@media (min-width: 768px) {
	#archives {
		padding: 10px 0 48px;
		.section {
			.wrapper {
				.titles-filters {
					flex-direction: row;
					align-items: flex-end;
					column-gap: 24px;

					.titles {
						h2 {
							font-size: 48px;
						}
					}

					.filters {
						display: flex;
						flex-direction: row;
						column-gap: 24px;

						.p-autocomplete, .p-multiselect {
							width: max-content;
						}
					}
				}

				.card-archive {
					padding: 24px 0;
					.wrapper {
						flex: 0 0 calc(25% - 24px);
						flex-direction: row;
						column-gap: 24px;
						flex-wrap: wrap;
						
						.restaurant-card,
						.skeleton-card {
							flex: 0 0 calc((100% - 3 * 24px) / 4);

							.p-card-header {
								/* height: 200px; */
							}
						}
					}
				}
			}
			
		}
	}
}
</style>