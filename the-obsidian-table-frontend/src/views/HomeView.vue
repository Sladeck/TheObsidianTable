<script setup lang="ts">
	import { RouterLink } from 'vue-router';

	// Components
	import RestaurantCard from '@/components/RestaurantCard.vue'
	import Scale from '@/components/Scale.vue';

	// Assets
	import Img1 from '@/assets/img/restaurant_1.png';
	import Img2 from '@/assets/img/dark-plate.jpg';

</script>

<template>
	<main id="home" class="main">

		<div id="hero-section" class="section">
			<div class="bg-gradient"></div>
			<div class="welcome">
				<span class="subtitle">A Journey Around The World</span>
				<h2 class="playfair-display">Where I've been <br class="mobile-only"/> eating lately.</h2>
				<p class="subtitle">I'm not a pro, just someone who enjoys really good food and wants to share the journey.</p>
				<!-- <a href="#latest-dispatches" class="btn btn-violet">Explore latest reviews</a> -->
			</div>
		</div>

		<div id="latest-dispatches" class="section">
			<div class="wrapper">
				<div class="titles">
					<h3 class="uppercase">Latest dispatches</h3>
					<RouterLink to="/archives" class="underline">View All Archives</RouterLink>
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

		<div id="how-rating" class="section">
			<div class="wrapper">
				<div class="sub-section-wrapper">
					<div class="text-section">
						<h3 class="playfair-display capitalize">How I score my meals</h3>
						<h4 class="capitalize">The G-Scale</h4>
						<p>Our 0-10 scale is not arbitrary. It is a rigorously
							weighted average of four distinct pillars of the dining
							experience, designed to separate genuine artistry
							from mere spectacle.
						</p>
						<p class="note">
							A score above 9.0 indicates a paradigm-shifting
							experience. Below 5.0 suggests fundamental flaws in
							execution or concept.
						</p>
					</div>
					<div class="scale-section">
						<div class="scale-wrapper">
							<Scale
								title="The Food"
								:score="9.2"
							/>
							<Scale
								title="The Atmosphere"
								:score="8.3"
							/>
							<Scale
								title="The Service"
								:score="4.7"
							/>
							<Scale
								title="Is it worth it?"
								:score="6.3"
							/>
						</div>
					</div>
				</div>
			</div>
		</div>
	</main>
</template>


<style>

:root {
	--color-section-off: #1C1B1C;
	--BGBackground: #131314;
	--Obsidian-original: #A020F0;
	--max-section-w: 1200px;
}

#home {
	#hero-section {
		position: relative;
		padding: 140px 0 128px 0;
		overflow-x: hidden;

		.bg-gradient {
			position: absolute;
			bottom: 0;
			right: -150px;
			height: 500px;
			width: 500px;
			background: radial-gradient(ellipse at center, rgba(160, 32, 240, 0.15) 10%, transparent 70%);
		}

		.welcome {
			width: 320px;
			margin: 0 auto;

			span.subtitle {
				display: block;
				color: var(--Obsidian-original);
				font-family: 'Geist', sans-serif;
				text-align: center;
				text-transform: uppercase;
				font-size: .7rem;
				letter-spacing: 3px;
				opacity: .4;
				margin-bottom: 5px;
			}

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
				gap: 32px;

			}
		}
	}

	#how-rating {
		padding: 0;
		background-color: var(--color-section-off);

		.wrapper {
			.sub-section-wrapper {
				display: flex;
				flex-direction: column;
				gap: 24px;
				padding: 32px;

				.text-section {
					h3 {
						font-size: 48px;
						font-weight: 700;
					}
					h4 {
						margin-top: 15px;
						font-family: 'Geist', sans-serif;
						font-size: 28px;
						font-weight: 300;
					}

					p {
						line-height: 28px;
						max-width: 430px;
						&.note {
							color: #908FA0;
						}
					}
				}

				.scale-section {
					display: flex;
					justify-content: center;
					align-items: center;
					
					.scale-wrapper {
						display: flex;
						flex-direction: column;
						row-gap: 20px;
						width: 100%;
						background-color: var(--BGBackground);
						padding: 24px;
						border-radius: 4px;
					}
				}

			}
		}
	}
}

@media (min-width: 768px) {
	#home {

		#hero-section {
			margin-top: 95px;
			overflow: visible;

			.bg-gradient {
				position: absolute;
				top: -20px;
				right: -300px;
				height: 750px;
				width: 750px;
				background: radial-gradient(ellipse at center, rgba(160, 32, 240, 0.15) 10%, transparent 70%);
			}

			.welcome {
				width: unset;

				span.subtitle {
					font-size: .8rem;
					letter-spacing: 7px;
				}

				h2 {
					text-align: center;
					font-size: 58px;
				}
			}
		}

		#latest-dispatches {
			.wrapper {

				.cards-wrapper {
					flex-direction: row;
					justify-content: space-between;
					margin-top: 32px;

					.restaurant-card {
						width: calc(100vw / 3);
					}
				}
			}
		}

		#how-rating {
			max-width: none;
			.wrapper {
				max-width: var(--max-section-w);
				margin: 0 auto;
				.sub-section-wrapper {
					flex-direction: row;
					padding: 48px 0;

					> div {
						/* Tell both child div to take equal space */
						flex: 1;
					}

					.text-section {
						h4 {
							margin-top: 0;
						}
					}
					
				}
			}
		}
	}
}

</style>