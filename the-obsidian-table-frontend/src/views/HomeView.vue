<script setup lang="ts">
	import { RouterLink } from 'vue-router';
	import RestaurantCard from '@/components/RestaurantCard.vue'
	import Img1 from '@/assets/img/restaurant_1.png';
	import Img2 from '@/assets/img/dark-plate.jpg';

</script>

<template>
	<main id="home" class="main">
		<div id="hero-section" class="section">
			<div class="welcome">
				<h2 class="playfair-display">Where I've been <br class="mobile-only"/> eating lately.</h2>
				<p class="subtitle">I'm not a pro, just someone who enjoys really good food and wants to share the journey.</p>
				<a href="#latest-dispatches" class="btn-violet">Explore latest reviews</a>
			</div>
		</div>
		<div id="latest-dispatches" class="section">
			<div class="wrapper">
				<div class="titles">
					<h3 class="uppercase">Latest dispatches</h3>
					<RouterLink to="/archives" class="underline">All archives</RouterLink>
				</div>
				<hr>
				<div class="cards-wrapper">
					<RestaurantCard
						name="Vesper & Vine"
						:image="Img1"
						:score="9.4"
						description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi tristique gravida nisl in ullamcorper. In hac habitasse platea dictumst. Duis in nisi rutrum, auctor dolor et, lobortis mi. Suspendisse potenti. Duis at nisi est. Sed sollicitudin massa dapibus leo hendrerit suscipit. Aliquam interdum felis vel volutpat rhoncus."
						city="London, UK"
						slug="vesper-and-vine"
					/>
					<RestaurantCard
						name="Le plus grand restaurant du monde"
						:image="Img2"
						:score="9.4"
						description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi tristique gravida nisl in ullamcorper. In hac habitasse platea dictumst. Duis in nisi rutrum, auctor dolor et, lobortis mi. Suspendisse potenti. Duis at nisi est. Sed sollicitudin massa dapibus leo hendrerit suscipit. Aliquam interdum felis vel volutpat rhoncus."
						city="London, UK"
						slug="vesper-and-vine"
					/>
					<RestaurantCard
						name="Vesper & Vine"
						:image="Img1"
						:score="9.4"
						description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi tristique gravida nisl in ullamcorper. In hac habitasse platea dictumst. Duis in nisi rutrum, auctor dolor et, lobortis mi. Suspendisse potenti. Duis at nisi est. Sed sollicitudin massa dapibus leo hendrerit suscipit. Aliquam interdum felis vel volutpat rhoncus."
						city="London, UK"
						slug="vesper-and-vine"
					/>
				</div>
			</div>
		</div>
	</main>
</template>


<style>

#home {
	#hero-section {
		padding: 48px 0;
		.welcome {
			width: 320px;
			margin: 0 auto;

			h2 {
				text-align: center;
				font-size: 38px;
			}
			p {
				text-align: center;
				margin: 24px 0;
			}
			.btn-violet {
				display: block;
				margin: 0 auto;
				width: max-content;
				font-size: 1.1rem;
			}
		}	
	}

	#latest-dispatches {
		.wrapper {
			.titles {
				display: flex;
				justify-content: space-between;

				h3 {
					font-size: 14px;
					letter-spacing: 1.5px;
				}
			}

			.cards-wrapper {
				display: flex;
				flex-direction: column;
			}
		}
	}
}

@media (min-width: 768px) {
	#home {

		#hero-section {
			.welcome {
				width: unset;
			}
		}

		#latest-dispatches {
			.wrapper {

				.cards-wrapper {
					flex-direction: row;
					justify-content: space-between;
					gap: 40px;

					.restaurant-card {
						width: calc(100vw / 3);
					}
				}
			}
		}
	}
}

</style>