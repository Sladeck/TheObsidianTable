<script setup lang="ts">
	import { RouterLink } from 'vue-router';
	import { ref, onMounted, onUnmounted } from 'vue'

	// Components
	import RestaurantCard from '@/components/RestaurantCard.vue'
	import Scale from '@/components/Scale.vue';
	import { Skeleton } from 'primevue';

	// Services
	import { RestaurantService } from '@/service/RestaurantService';

	const restaurants = ref([]);
	const loading = ref(true);
	const error = ref(false);

	onMounted(() => {
		RestaurantService.getRestaurants({ sort: 'latest', take: 3 })
			.then((data) => (restaurants.value = data))
			.catch((err) => {
				console.error(err);
				error.value = true;
			})
			.finally(() => (loading.value = false));
	});

	if(window.innerWidth > 768) {
		const handleScroll = () => {
			const scrollY = window.scrollY;

			const eyebrow = document.querySelector('.hero-eyebrow') as HTMLElement;
			const title = document.querySelector('.hero-title') as HTMLElement;
			const subtitle = document.querySelector('.hero-subtitle') as HTMLElement;

			if (eyebrow) {
				eyebrow.style.transform = `translateY(${scrollY * 0.1}px)`;
				eyebrow.style.opacity = `${1 - scrollY * 0.01}`;
			}
			if (title) {
				title.style.transform = `translateY(${scrollY * 0.5}px)`;
				title.style.fontSize = `${3 + scrollY * 0.0025}rem`;
			}
			if (subtitle) {
				subtitle.style.transform = `translateY(${scrollY * 0.1}px)`;
				subtitle.style.opacity = `${1 - scrollY * 0.02}`;
			}
		}

		window.addEventListener('scroll', handleScroll)


		onMounted(() => window.addEventListener('scroll', handleScroll))
		onUnmounted(() => window.removeEventListener('scroll', handleScroll))
	}
</script>

<template>
	<main id="home" class="main">

		<div id="hero-section" class="section">
			<div class="hero-gradient"></div>
			<div class="welcome">
				<span class="hero-eyebrow">A Journey Around The World</span>
				<h2 class="hero-title playfair-display">Where I've been <br class="mobile-only"/> eating lately.</h2>
				<p class="hero-subtitle">I'm not a pro, just someone who enjoys really good food and wants to share the journey.</p>
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
				<div class="cards-wrapper" v-if="loading">
					<div class="skeleton-card" v-for="i in 3" :key="i">
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
				<div class="cards-wrapper" v-else-if="restaurants.length">
					<RestaurantCard
						v-for="restau in restaurants"
						:key="restau.slug"
						:name="restau.name"
						:image="restau.images[0]"
						:score="restau.totalScore"
						:priceLevel="restau.priceLevel"
						:description="restau.description"
						:city="restau.location.city"
						:slug="restau.slug"
						:cuisine="restau.type"
					/>
				</div>
				<p v-else class="empty-state">
					{{ error ? "Couldn't load the latest dispatches. Please try again later." : "No dispatches yet." }}
				</p>
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

#home {
	#hero-section {
		position: relative;
		padding: 140px 0 128px 0;
		overflow-x: hidden;

		.hero-gradient {
			position: absolute;
			bottom: 0;
			right: -150px;
			height: 500px;
			width: 500px;
			background: radial-gradient(ellipse at center, color-mix(in srgb, var(--Obsidian) 15%, transparent) 10%, transparent 70%);
			z-index: 0;
		}

		.welcome {
			position: relative;
			width: 320px;
			margin: 0 auto;
			z-index: 1;

			.hero-eyebrow, .hero-title, .hero-subtitle {
				will-change: transform;
			}

			.hero-eyebrow {
				display: block;
				color: var(--Obsidian);
				font-family: 'Geist', sans-serif;
				text-align: center;
				text-transform: uppercase;
				font-size: .7rem;
				letter-spacing: 3px;
				margin-bottom: 5px;
				z-index: 0;
				opacity: .6;
			}

			.hero-title {
				text-align: center;
				font-size: 42px;
				text-shadow: 0 0 1px black;
			}

			.hero-subtitle {
				text-align: center;
				margin: 24px 0;
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

	#how-rating {
		padding: 0;
		background-color: var(--SectionOff);

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

						&:last-of-type {
							background-color: var(--BGBackground);
							padding: 24px;
							border-left: 3px solid var(--Obsidian);
							border-radius: 4px;
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

			.hero-gradient {
				position: absolute;
				top: -20px;
				right: -300px;
				height: 750px;
				width: 750px;

			}

			.welcome {
				width: unset;

				span.subtitle {
					font-size: .8rem;
					letter-spacing: 7px;
				}

				.hero-title {
					text-align: center;
					font-size: 48px;
				}
			}
		}

		#latest-dispatches {
			.wrapper {

				.cards-wrapper {
					flex-direction: row;
					justify-content: space-between;
					margin-top: 32px;

					.restaurant-card,
					.skeleton-card {
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