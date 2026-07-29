<template>
	<main id="faq" class="main">
		<div class="section">
			<div class="wrapper">
				<div class="faq-hero">
					<span class="eyebrow">Questions, Answered</span>
					<h2 class="playfair-display">Common Inquiries</h2>
					<p>Clarifications on process, ethics, and the pursuit of honest reviews.</p>
				</div>

				<div class="faq-featured">
					<div class="faq-icon">
						<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
							<path d="M12 1.5l3.09 6.26 6.91 1-5 4.87 1.18 6.87L12 17.27l-6.18 3.23L7 13.63l-5-4.87 6.91-1L12 1.5z"/>
						</svg>
					</div>
					<div>
						<h3 class="playfair-display">"Why are there only good scores? Where are the bad reviews?"</h3>
						<p>I only write about places worth your time. If a meal isn't worth sharing, I don't write about it.</p>
					</div>
				</div>

				<div class="faq-grid">
					<div class="faq-item">
						<h3 class="playfair-display">"Can I contact you to promote my restaurant?"</h3>
						<p>No. I don't do promos, PR invites, or sponsored content. I show up unannounced and pay my own way. Though you can contact me for a website!</p>
					</div>

					<div class="faq-item">
						<h3 class="playfair-display">"Are you paid to eat and review?"</h3>
						<p>Never. This is a personal project funded by my own curiosity and my day job.</p>
					</div>

					<div class="faq-item">
						<h3 class="playfair-display">"Did you build this website yourself?"</h3>
						<p>Yes, both the design and the code, with some help of AI for professional needs in my career. I'm a freelancer with more than 8 years of experience, contact me if you need my help!</p>
					</div>

					<div class="faq-item">
						<h3 class="playfair-display">"What do you dislike?"</h3>
						<p>Pretension, cold plates, and ego. I'm here for the food, not the theater.</p>
					</div>
				</div>
			</div>
		</div>
	</main>
</template>

<style>
	#faq {
		.section {
			.wrapper {
				max-width: 900px;
				margin: 0 auto;
				padding-top: 32px;
				padding-bottom: 64px;

				.faq-hero {
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
						margin-bottom: 16px;
					}

					p {
						color: var(--TextMuted);
						font-size: 1rem;
					}
				}

				.faq-featured {
					display: flex;
					flex-direction: column;
					gap: 16px;
					background-color: var(--SectionOff);
					border: 1px solid var(--Stroke);
					border-radius: 4px;
					padding: 32px;
					margin-bottom: 24px;

					.faq-icon {
						display: flex;
						align-items: center;
						justify-content: center;
						flex-shrink: 0;
						width: 44px;
						height: 44px;
						color: var(--Obsidian);
						background-color: var(--BGCard);
						border: 1px solid var(--Stroke);
						border-radius: 8px;
					}

					h3 {
						color: var(--WhiteAshes);
						font-size: 1.6rem;
						margin-bottom: 12px;
					}

					p {
						color: var(--TextMuted);
						font-size: 1rem;
						line-height: 1.6;
					}
				}

				.faq-grid {
					display: flex;
					flex-direction: column;
					gap: 24px;

					.faq-item {
						background-color: var(--SectionOff);
						border: 1px solid var(--Stroke);
						border-radius: 4px;
						padding: 32px;

						h3 {
							color: var(--WhiteAshes);
							font-size: 1.2rem;
							margin-bottom: 12px;
						}

						p {
							color: var(--TextMuted);
							font-size: 1rem;
							line-height: 1.6;
						}
					}
				}
			}
		}
	}

	@media (min-width: 768px) {
		#faq {
			.section {
				.wrapper {
					.faq-hero {
						h2 {
							font-size: 3rem;
						}
					}

					.faq-featured {
						flex-direction: row;
						align-items: flex-start;
					}

					.faq-grid {
						flex-direction: row;
						flex-wrap: wrap;

						.faq-item {
							flex: 1 1 calc(50% - 12px);
						}
					}
				}
			}
		}
	}
</style>
