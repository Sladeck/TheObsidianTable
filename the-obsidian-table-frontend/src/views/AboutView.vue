<script setup>
	import { ref, computed } from 'vue'

	// Split so the address is never a plain "user@domain" string in the
	// shipped HTML/JS - defeats simple scrapers that regex-scan for email
	// patterns. Only assembled after the user clicks through the gate below.
	const emailParts = ['gm.moulin', 'proton.me']

	const checking = ref(false)
	const verified = ref(false)

	const emailAddress = computed(() => (verified.value ? `${emailParts[0]}@${emailParts[1]}` : ''))
	const mailtoHref = computed(() => `mailto:${emailAddress.value}`)

	function verify() {
		if (verified.value || checking.value) return
		checking.value = true
		setTimeout(() => {
			checking.value = false
			verified.value = true
		}, 550)
	}
</script>

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

					<div class="about-block contact-block">
						<span class="contact-label">Contact Me</span>

						<div v-if="!verified" class="captcha-gate">
							Click me to reveal:
							<button type="button" class="captcha-checkbox" :disabled="checking" @click="verify">
								<span class="checkbox-box">
									<span v-if="checking" class="checkbox-spinner"></span>
								</span>
								<span class="checkbox-label">{{ checking ? 'Verifying…' : "I'm not a robot" }}</span>
							</button>
						</div>
						<a v-else :href="mailtoHref" class="email-reveal">{{ emailAddress }}</a>
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
				max-width: 900px;
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

					.contact-block {
						display: flex;
						flex-direction: column;

						.contact-label {
							display: block;
							color: var(--Obsidian);
							font-family: 'Geist', sans-serif;
							text-transform: uppercase;
							font-size: 0.75rem;
							letter-spacing: 2px;
							margin-bottom: 20px;
						}

						.captcha-checkbox {
							display: flex;
							align-items: center;
							gap: 12px;
							background-color: var(--BGBackground);
							border: 1px solid var(--Stroke);
							border-radius: 4px;
							padding: 12px 16px;
							cursor: pointer;
							transition: border-color 0.2s ease;

							&:hover:not(:disabled) {
								border-color: var(--Obsidian);
							}

							&:disabled {
								cursor: default;
							}

							.checkbox-box {
								flex-shrink: 0;
								width: 20px;
								height: 20px;
								border: 1px solid var(--Stroke);
								border-radius: 3px;
								background-color: var(--BGCard);
								display: flex;
								align-items: center;
								justify-content: center;
							}

							.checkbox-spinner {
								width: 12px;
								height: 12px;
								border: 2px solid var(--Stroke);
								border-top-color: var(--Obsidian);
								border-radius: 50%;
								animation: contact-spin 0.6s linear infinite;
							}

							.checkbox-label {
								color: var(--WhitePink);
								font-size: 0.9rem;
							}
						}

						.email-reveal {
							margin-top: 10px;
							color: var(--Obsidian);
							font-size: 1.1rem;
							font-weight: 600;
							text-decoration: none;
							word-break: break-all;
							text-transform: lowercase;

							&:hover {
								text-decoration: underline;
							}
						}
					}
				}
			}
		}
	}

	@keyframes contact-spin {
		to {
			transform: rotate(360deg);
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
						display: grid;
						grid-template-columns: 1fr 1fr;
						align-items: stretch;

						.about-block {
							padding: 40px;
						}
					}
				}
			}
		}
	}
</style>
