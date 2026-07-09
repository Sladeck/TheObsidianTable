<template>
	<main id="about" class="main">
		<div class="section">
			<div class="wrapper">
				<div class="about-hero">
					<span class="eyebrow">The Person Behind The Plate</span>
					<h2 class="playfair-display">An Anonymous Observer.</h2>
				</div>

				<div class="about-sections">
					<div class="about-block">
						<h3 class="playfair-display">Sharing the Love</h3>
						<p>I'm here to share my honest experiences, not to pass judgment. I pay my own way so I can talk about food the same way I would with a friend over coffee. The goal is to highlight the passion and dedication of the people behind the line.</p>
					</div>

					<div class="about-block">
						<h3 class="playfair-display">Just a Diner</h3>
						<p>I don't announce my arrival or look for special treatment. I prefer to blend in so I can enjoy the food exactly as it's meant to be served. By remaining anonymous, I ensure that the experience I write about is the exact same experience anyone else would receive.</p>
					</div>

					<div class="about-block">
						<h3 class="playfair-display">The Journey &amp; The Why</h3>
						<p>I started this project because I love the stories that food can tell. In a world of sponsored posts and filtered photos, I wanted a space to talk about the meals that actually moved me. This isn't about technical perfection; it's about the joy of discovery and the craft of the kitchen.</p>
						<p>My goal is simple: to find the places that care deeply about what they put on the plate. Whether it's a high-end tasting menu or a hidden neighborhood gem, I'm here to celebrate the chefs and teams who make dining out a memorable adventure.</p>
					</div>
				</div>
			</div>
		</div>
	</main>
</template>

<style>
	#about {
		.section {
			.wrapper {
				max-width: 720px;
				margin: 0 auto;
				padding-top: 32px;
				padding-bottom: 64px;

				.about-hero {
					text-align: center;
					margin-bottom: 48px;

					.eyebrow {
						display: block;
						color: var(--Obsidian);
						font-family: 'Geist', sans-serif;
						text-transform: uppercase;
						font-size: 0.75rem;
						letter-spacing: 3px;
						margin-bottom: 12px;
					}

					h2 {
						color: var(--WhiteAshes);
						font-size: 2.5rem;
					}
				}

				.about-sections {
					display: flex;
					flex-direction: column;
					gap: 24px;

					.about-block {
						background-color: var(--SectionOff);
						border-left: 3px solid var(--Obsidian);
						border-top: 1px solid var(--Stroke);
						border-right: 1px solid var(--Stroke);
						border-bottom: 1px solid var(--Stroke);
						border-radius: 4px;
						padding: 32px;

						h3 {
							color: var(--Obsidian);
							font-size: 1.4rem;
							margin-bottom: 16px;
						}

						p {
							color: var(--WhitePink);
							font-size: 1rem;
							line-height: 1.7;
							margin-bottom: 16px;

							&:last-child {
								margin-bottom: 0;
							}
						}
					}
				}
			}
		}
	}

	@media (min-width: 768px) {
		#about {
			.section {
				.wrapper {
					.about-hero {
						h2 {
							font-size: 3rem;
						}
					}

					.about-sections {
						.about-block {
							padding: 40px;
						}
					}
				}
			}
		}
	}
</style>
