<script setup>
	import { ref, onMounted } from "vue";
	import { AutoComplete, MultiSelect } from "primevue";
	
	// Assets
	import { CountryService } from "@/service/CountryService";

	// Components
	import RestaurantCard from "@/components/RestaurantCard.vue";

	onMounted(() => {
		CountryService.getCountries().then((data) => (countries.value = data));
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

	const cardRestaurants = [
		{"id": 0, "slug": "lumiere-brasserie", "img_url": "https://picsum.photos/800/600?random=1", "name": "Lumière Brasserie", "location": "Paris", "type": "Parisian Brasserie", "score": {"total": 8.3, "food": 9.5, "atmo": 8.0, "service": 9.0, "price": 7.0}, "description": "A masterful reimagining of classic French technique, obscured in shadows and illuminated by brilliant execution.", "cuisine": "French", "priceLevel":4, "city": "Paris"},
		{"id": 1, "img_url": "https://picsum.photos/200/300", "name": "The Great Burger", "location": "Tokyo", "type": "Fast Food", "score": {"total": 8.5, "food": 9.4, "atmo": 8.5, "service": 9, "price": 7}, "description": "Fusce tortor urna, tempor id luctus nec, consequat sed urna. Aenean quis sagittis turpis. Nunc sagittis iaculis fermentum. Aliquam rhoncus dapibus neque, eget laoreet purus interdum eget. Pellentesque cursus lacinia mauris, vel condimentum purus suscipit id. Fusce sollicitudin nec nisi eget gravida.", "cuisine": "Fast Food", "priceLevel":1, "city": "Tokyo"},
		{"id": 2, "slug": "le-procope", "img_url": "https://picsum.photos/200/300", "name": "Le Procope", "location": "Paris", "type": "French", "score": {"total": 7.2, "food": 9.4, "atmo": 8.5, "service": 9, "price": 7}, "description": "Lorem Ipsum", "cuisine": "French", "priceLevel":2, "city": "Paris"},
		{"id": 3, "slug": "taverna-milieu", "img_url": "https://picsum.photos/200/300", "name": "Taverna Milieu", "location": "France", "type": "French", "score": {"total": 7.8, "food": 9.4, "atmo": 8.5, "service": 9, "price": 7}, "description": "Lorem Ipsum", "cuisine": "Italian", "priceLevel":3, "city": "Tokyo"},
		{"id": 4, "img_url": "https://picsum.photos/200/300", "name": "N&S", "location": "Tokyo", "type": "Japanese", "score": {"total": 8.5, "food": 9.4, "atmo": 8.5, "service": 9, "price": 7}, "description": "Lorem Ipsum"},
		{"id": 5, "img_url": "https://picsum.photos/200/300", "name": "Le plus grand restaurant du monde", "location": "Tokyo", "type": "Japanese", "score": {"total": 9.5, "food": 9.4, "atmo": 8.5, "service": 9, "price": 7}, "description": "Lorem Ipsum"},
		{"id": 6, "img_url": "https://picsum.photos/200/300", "name": "N&S", "location": "Tokyo", "type": "Japanese", "score": {"total": 8.5, "food": 9.4, "atmo": 8.5, "service": 9, "price": 7}, "description": "Lorem Ipsum"},
		{"id": 7, "img_url": "https://picsum.photos/200/300", "name": "N&S", "location": "Tokyo", "type": "Japanese", "score": {"total": 8.5, "food": 9.4, "atmo": 8.5, "service": 9, "price": 7}, "description": "Lorem Ipsum"},
		{"id": 8, "img_url": "https://picsum.photos/200/300", "name": "N&S", "location": "Tokyo", "type": "Japanese", "score": {"total": 8.5, "food": 9.4, "atmo": 8.5, "service": 9, "price": 7}, "description": "Lorem Ipsum"},
		{"id": 9, "img_url": "https://picsum.photos/200/300", "name": "N&S", "location": "Tokyo", "type": "Japanese", "score": {"total": 8.5, "food": 9.4, "atmo": 8.5, "service": 9, "price": 7}, "description": "Lorem Ipsum"},
	]

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
					<div class="wrapper">
						<RestaurantCard
							v-for="restau in cardRestaurants"
							:key="restau.id"
							:slug="restau.slug"
							:name="restau.name"
							:score="restau.score.total"
							:description="restau.description"
							:image="restau.img_url"
							:cuisine="restau.cuisine"
							:priceLevel="restau.priceLevel"
							:city="restau.city"
						/>
					</div>
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
				}
			}
		}
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
						
						.restaurant-card {
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