<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { Carousel, Galleria, Skeleton } from "primevue";

// Components
import ScoreScale from "@/components/Scale.vue";

// Services
import { RestaurantService } from "@/service/RestaurantService";

const route = useRoute();

const restaurant = ref(null);
const loading = ref(true);

onMounted(async () => {
  try {
    restaurant.value = await RestaurantService.getRestaurantBySlug(route.params.slug);
  } catch (error) {
    console.error(error);
  } finally {
    loading.value = false;
  }
});

const priceSign = (level) => "$".repeat(level);
</script>

<template>
  <main id="restaurant" class="main">
    <div class="section">
      <div class="wrapper">

        <template v-if="restaurant">
          <div class="hero-grid">
            <div class="hero-info">
              <span class="restaurant-type">{{ restaurant.type }}</span>
              <h1 class="playfair-display">{{ restaurant.name }}</h1>
              <div class="score-display">
                <span class="score-number">{{ restaurant.totalScore }}</span>
                <span class="score-max">/ 10</span>
              </div>
              <p class="tagline">{{ restaurant.description }}</p>
              <div class="tags" v-if="restaurant.tags.length">
                <span class="tag" v-for="tag in restaurant.tags" :key="tag">{{ tag }}</span>
              </div>
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
                <ScoreScale title="Quality" :score="restaurant.scores.food" />
                <ScoreScale title="Atmosphere" :score="restaurant.scores.atmo" />
                <ScoreScale title="Price" :score="restaurant.scores.price" />
                <ScoreScale title="Service" :score="restaurant.scores.service" />
              </div>
            </div>

            <div class="logistics-block">
              <h4>Logistics</h4>
              <div class="logistics-item">
                <span class="logistics-icon">📍</span>
                <div>
                  <p>{{ restaurant.location.address }}</p>
                  <p>{{ restaurant.location.city }}, {{ restaurant.location.country }}</p>
                </div>
              </div>
              <div class="logistics-item">
                <span class="logistics-icon">💳</span>
                <p>{{ priceSign(restaurant.priceLevel) }} ({{ restaurant.priceNote }})</p>
              </div>
              <a
                class="maps-button"
                :href="restaurant.location.googleMapsUrl"
                target="_blank"
                rel="noopener noreferrer"
              >
                View on Google Maps
              </a>
            </div>
          </div>

          <div class="review-section">
            <h2 class="playfair-display">The Review</h2>

            <div class="review-block">
              <h3 class="playfair-display">Quality</h3>
              <p>{{ restaurant.review.food }}</p>
            </div>

            <div class="review-block">
              <h3 class="playfair-display">Atmosphere</h3>
              <p>{{ restaurant.review.atmo }}</p>
            </div>

            <div class="review-block">
              <h3 class="playfair-display">Service &amp; Value</h3>
              <p>{{ restaurant.review.service }}</p>
            </div>
          </div>
        </template>

        <template v-else-if="loading">
          <div class="hero-grid">
            <div class="hero-info">
              <Skeleton width="8rem" height="1.6rem" class="mb-3" />
              <Skeleton width="70%" height="2.5rem" class="mb-3" />
              <Skeleton width="6rem" height="3.5rem" class="mb-3" />
              <Skeleton width="100%" height="1rem" class="mb-2" />
              <Skeleton width="90%" height="1rem" class="mb-2" />
              <Skeleton width="60%" height="1rem" class="mb-3" />
              <Skeleton width="5rem" height="1.5rem" borderRadius="4px" style="display: inline-block; margin-right: 8px;" />
              <Skeleton width="6rem" height="1.5rem" borderRadius="4px" style="display: inline-block;" />
            </div>

            <div class="hero-carousel">
              <Skeleton width="100%" height="320px" />
            </div>
          </div>

          <div class="verdict-block">
            <Skeleton width="8rem" height="0.9rem" class="mb-3" />
            <Skeleton width="100%" height="1.3rem" class="mb-2" />
            <Skeleton width="80%" height="1.3rem" />
          </div>

          <div class="breakdown-logistics-grid">
            <div class="breakdown-block">
              <Skeleton width="12rem" height="1.3rem" class="mb-4" />
              <div class="scales-grid">
                <div v-for="i in 4" :key="i">
                  <Skeleton width="100%" height="1rem" class="mb-2" />
                  <Skeleton width="100%" height="28px" />
                </div>
              </div>
            </div>

            <div class="logistics-block">
              <Skeleton width="6rem" height="0.85rem" class="mb-4" />
              <div v-for="i in 2" :key="i" class="logistics-item">
                <Skeleton shape="circle" width="1.2rem" height="1.2rem" />
                <div style="flex: 1;">
                  <Skeleton width="100%" height="0.9rem" class="mb-2" />
                  <Skeleton width="70%" height="0.9rem" />
                </div>
              </div>
              <Skeleton width="100%" height="2.5rem" borderRadius="4px" />
            </div>
          </div>

          <div class="review-section">
            <Skeleton width="10rem" height="2rem" class="mb-4" />

            <div v-for="i in 3" :key="i" class="review-block">
              <Skeleton width="16rem" height="1.4rem" class="mb-3" />
              <Skeleton width="100%" height="0.95rem" class="mb-2" />
              <Skeleton width="100%" height="0.95rem" class="mb-2" />
              <Skeleton width="50%" height="0.95rem" />
            </div>
          </div>
        </template>

        <div v-else class="not-found">
          <p>We couldn't find this restaurant.</p>
        </div>

      </div>
    </div>
  </main>
</template>

<style>
#restaurant {
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

  .not-found {
    color: var(--TextMuted);
    padding: 48px 0;
    text-align: center;
  }

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
            font-size: 2.75rem;
            line-height: 1.1;
            margin-bottom: 16px;
          }

          .score-display {
            display: flex;
            align-items: baseline;
            gap: 8px;
            margin-bottom: 16px;

            .score-number {
              font-family: 'Playfair Display';
              font-size: 4rem;
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

          .tags {
            display: flex;
            flex-wrap: wrap;
            gap: 8px;
            margin-top: 16px;

            .tag {
              display: inline-block;
              color: var(--TextMuted);
              font-size: 0.75rem;
              text-transform: uppercase;
              letter-spacing: 0.05em;
              padding: 4px 10px;
              border: 1px solid var(--Stroke);
              border-radius: 999px;
            }
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

          .p-carousel-prev-button,
          .p-carousel-next-button {
            display: none;
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

          .maps-button {
            display: block;
            text-align: center;
            color: var(--WhiteAshes);
            background-color: var(--Obsidian);
            font-size: 0.85rem;
            font-weight: 600;
            text-decoration: none;
            padding: 12px;
            border-radius: 4px;
            margin-top: 8px;
            transition: opacity 0.2s ease;

            &:hover {
              opacity: 0.85;
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

            h1 {
              font-size: 3.75rem;
            }

            .score-display .score-number {
              font-size: 5rem;
            }
          }

          .hero-carousel {
            flex: 1;

            .carousel-image {
              height: 420px;
            }

            .p-carousel-prev-button,
            .p-carousel-next-button {
              display: flex;
            }
          }
        }

        .breakdown-logistics-grid {
          flex-direction: row;

          .breakdown-block {
            flex: 0 0 65%;

            h3 {
              font-size: 1.5rem;
            }

            .scales-grid {
              flex-direction: row;
              flex-wrap: wrap;

              > * {
                flex: 0 0 calc(50% - 12px);
              }

              .score-scale .blocks .block {
                height: 34px;
              }
            }
          }

          .logistics-block {
            flex: 1;
          }
        }

        .review-section {
          h2 {
            font-size: 2.25rem;
          }

          .review-block h3 {
            font-size: 1.5rem;
          }
        }
      }
    }
  }
}
</style>