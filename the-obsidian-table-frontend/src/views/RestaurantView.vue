<script setup>
import { Carousel, Galleria } from "primevue";

// Components
import ScoreScale from "@/components/Scale.vue";

const restaurant = {
  name: "Lumière Brasserie",
  type: "Parisian Brasserie",
  score: 8.3,
  tagline: "A masterful reimagining of classic French technique, obscured in shadows and illuminated by brilliant execution.",
  images: [
    "https://picsum.photos/800/600?random=1",
    "https://picsum.photos/800/600?random=2",
    "https://picsum.photos/800/600?random=3",
  ],
  verdict: "Lumière Brasserie demands your attention, your wallet, and your surrender to its moody embrace. It is not merely a meal; it is a meticulously crafted sensory deprivation tank where only the flavors are allowed to scream.",
  scores: {
    quality: 9.5,
    atmosphere: 8.0,
    price: 7.0,
    service: 9.0,
  },
  logistics: {
    address: "12 Rue de la Roquette",
    city: "75011 Paris, France",
    priceLevel: "$$$$",
    priceNote: "Average $150/person",
    hours: "Dinner only",
    hoursDetail: "Tue - Sat, 6PM - 11PM",
  },
  review: {
    quality: {
      title: "Quality: The Culinary Execution",
      text: "The kitchen at Lumière operates with a precision that borders on the surgical. The Steak au Poivre is a testament to this, arriving with a crust so perfectly carbonized it shatters under the knife, revealing a medium-rare interior that weeps jus onto the plate. The peppercorn sauce is an exercise in restraint, pungent but never overpowering, binding the dish together with an unctuous richness.",
    },
    atmosphere: {
      title: "Atmosphere: Engineered Intimacy",
      text: "They have mastered the dark. The dining room is a study in chiaroscuro; pure blacks swallow the ambient noise, while solitary beams of warm light isolate each table like a stage set. It is intimate, yes, but almost aggressively so. You are forced to focus entirely on the food and your companion, isolated from the bustling city outside.",
    },
    service: {
      title: "Service & Value",
      text: "The waitstaff glide through the gloom like apparitions, appearing only precisely when needed. It is a choreographed silence that commands respect. As for the price, it is exorbitant. Yet, in a landscape littered with mediocrity, one pays for consistency, and Lumière delivers it unfailingly.",
    },
  },
};
</script>

<template>
  <main id="restaurant" class="main">
    <div class="section">
      <div class="wrapper">

        <div class="hero-grid">
          <div class="hero-info">
            <span class="restaurant-type">{{ restaurant.type }}</span>
            <h1 class="playfair-display">{{ restaurant.name }}</h1>
            <div class="score-display">
              <span class="score-number">{{ restaurant.score }}</span>
              <span class="score-max">/ 10</span>
            </div>
            <p class="tagline">{{ restaurant.tagline }}</p>
          </div>

          <div class="hero-carousel">
            <Carousel :value="restaurant.images" :numVisible="1" :numScroll="1">
              <template #item="slotProps">
                <img :src="slotProps.data" :alt="restaurant.name" class="carousel-image" />
              </template>
            </Carousel>
          </div>
        </div>

        <div class="verdict-block">
          <span class="verdict-label">Final Verdict</span>
          <p class="verdict-text">"{{ restaurant.verdict }}"</p>
        </div>

        <div class="breakdown-logistics-grid">
          <div class="breakdown-block">
            <h3 class="playfair-display">G-Scale - The Breakdown</h3>
            <div class="scales-grid">
              <ScoreScale title="Quality" :score="restaurant.scores.quality" />
              <ScoreScale title="Atmosphere" :score="restaurant.scores.atmosphere" />
              <ScoreScale title="Price" :score="restaurant.scores.price" />
              <ScoreScale title="Service" :score="restaurant.scores.service" />
            </div>
          </div>

          <div class="logistics-block">
            <h4>Logistics</h4>
            <div class="logistics-item">
              <span class="logistics-icon">📍</span>
              <div>
                <p>{{ restaurant.logistics.address }}</p>
                <p>{{ restaurant.logistics.city }}</p>
              </div>
            </div>
            <div class="logistics-item">
              <span class="logistics-icon">💳</span>
              <p>{{ restaurant.logistics.priceLevel }} ({{ restaurant.logistics.priceNote }})</p>
            </div>
            <div class="logistics-item">
              <span class="logistics-icon">🕐</span>
              <div>
                <p>{{ restaurant.logistics.hours }}</p>
                <p>{{ restaurant.logistics.hoursDetail }}</p>
              </div>
            </div>
          </div>
        </div>

        <div class="review-section">
          <h2 class="playfair-display">The Review</h2>

          <div class="review-block">
            <h3 class="playfair-display">{{ restaurant.review.quality.title }}</h3>
            <p>{{ restaurant.review.quality.text }}</p>
          </div>

          <div class="review-block">
            <h3 class="playfair-display">{{ restaurant.review.atmosphere.title }}</h3>
            <p>{{ restaurant.review.atmosphere.text }}</p>
          </div>

          <div class="review-block">
            <h3 class="playfair-display">{{ restaurant.review.service.title }}</h3>
            <p>{{ restaurant.review.service.text }}</p>
          </div>
        </div>

      </div>
    </div>
  </main>
</template>

<style>
#restaurant {
  .section {
    .wrapper {

      .hero-grid {
        display: flex;
        flex-direction: column;
        gap: 32px;
        margin-bottom: 32px;

        .hero-info {
          .restaurant-type {
            display: inline-block;
            border: 1px solid var(--Stroke);
            color: var(--TextMuted);
            font-size: 0.75rem;
            text-transform: uppercase;
            letter-spacing: 0.05em;
            padding: 6px 12px;
            border-radius: 4px;
            margin-bottom: 16px;
          }

          h1 {
            color: var(--WhiteAshes);
            font-size: 2.5rem;
            margin-bottom: 16px;
          }

          .score-display {
            display: flex;
            align-items: baseline;
            gap: 8px;
            margin-bottom: 16px;

            .score-number {
              font-family: 'Playfair Display';
              font-size: 3.5rem;
              color: var(--Obsidian);
            }

            .score-max {
              color: var(--TextFaint);
              font-size: 1.2rem;
            }
          }

          .tagline {
            color: var(--TextMuted);
            font-size: 1rem;
            line-height: 1.6;
          }
        }

        .hero-carousel {
          .carousel-image {
            width: 100%;
            height: 320px;
            object-fit: cover;
            border-radius: 8px;
            display: block;
          }
        }
      }

      .verdict-block {
        border-left: 3px solid var(--Obsidian);
        border-top: 1px solid var(--Stroke);
        border-right: 1px solid var(--Stroke);
        border-bottom: 1px solid var(--Stroke);
        border-radius: 4px;
        padding: 32px;
        margin-bottom: 32px;

        .verdict-label {
          display: block;
          color: var(--Obsidian);
          font-size: 0.75rem;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          margin-bottom: 16px;
        }

        .verdict-text {
          font-family: 'Playfair Display';
          font-style: italic;
          color: var(--WhiteAshes);
          font-size: 1.3rem;
          line-height: 1.5;
        }
      }

      .breakdown-logistics-grid {
        display: flex;
        flex-direction: column;
        gap: 24px;
        margin-bottom: 48px;

        .breakdown-block {
          border: 1px solid var(--Stroke);
          border-radius: 4px;
          padding: 24px;

          h3 {
            color: var(--WhiteAshes);
            font-size: 1.3rem;
            margin-bottom: 24px;
          }

          .scales-grid {
            display: flex;
            flex-direction: column;
            gap: 24px;
          }
        }

        .logistics-block {
          border: 1px solid var(--Stroke);
          border-radius: 4px;
          padding: 24px;

          h4 {
            color: var(--TextMuted);
            font-size: 0.85rem;
            text-transform: uppercase;
            letter-spacing: 0.05em;
            margin-bottom: 16px;
            padding-bottom: 16px;
            border-bottom: 1px solid var(--Stroke);
          }

          .logistics-item {
            display: flex;
            align-items: flex-start;
            gap: 12px;
            margin-bottom: 16px;

            p {
              color: var(--TextMuted);
              font-size: 0.9rem;
              margin: 2px 0;
            }
          }
        }
      }

      .review-section {
        h2 {
          color: var(--WhiteAshes);
          font-size: 2rem;
          margin-bottom: 32px;
        }

        .review-block {
          margin-bottom: 32px;

          h3 {
            color: var(--WhiteAshes);
            font-size: 1.4rem;
            margin-bottom: 16px;
            padding-bottom: 16px;
            border-bottom: 1px solid var(--Stroke);
          }

          p {
            color: var(--TextMuted);
            font-size: 0.95rem;
            line-height: 1.7;
          }
        }
      }
    }
  }
}

@media (min-width: 768px) {
  #restaurant {
    .section {
      .wrapper {
        .hero-grid {
          flex-direction: row;
          align-items: center;

          .hero-info {
            flex: 0 0 45%;
          }

          .hero-carousel {
            flex: 1;
          }
        }

        .breakdown-logistics-grid {
          flex-direction: row;

          .breakdown-block {
            flex: 0 0 65%;

            .scales-grid {
              flex-direction: row;
              flex-wrap: wrap;

              > * {
                flex: 0 0 calc(50% - 12px);
              }
            }
          }

          .logistics-block {
            flex: 1;
          }
        }
      }
    }
  }
}
</style>