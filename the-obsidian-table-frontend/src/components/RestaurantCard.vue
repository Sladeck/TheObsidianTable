<script setup lang="ts">
import Card from 'primevue/card'

defineProps<{
    name: string
    image: string
    score: number
    description: string
    city: string
    slug: string
}>()

const truncate = (text: string, words: number) => {
  return text.split(' ').slice(0, words).join(' ') + '...'
}

</script>

<template>
    <Card class="restaurant-card">
        <template #header>
            <div class="card-image-wrapper">
                <img :src="image" :alt="name" class="card-image" />
                <span class="card-score">{{ score }}</span>
            </div>
        </template>
        <template #title>{{ name }}</template>
        <template #content>
            <p class="card-description">{{ truncate(description, 20) }}</p>
            <hr class="card-divider" />
            <div class="card-footer">
                <span class="card-city">{{ city }}</span>
                <RouterLink :to="`/restaurant/${slug}`" class="card-link underline">Read the review</RouterLink>
            </div>
        </template>
    </Card>
</template>

<style>
    .restaurant-card {
        background-color: var(--BGCard);
        border-radius: 4px !important;
        overflow: hidden;
        width: 320px;
        border: 1px solid var(--Divider);

        .card-image-wrapper {
            position: relative;

            .card-image {
                width: 100%;
                height: 250px;
                aspect-ratio: 1;
                object-fit: cover;
                display: block;
            }

            .card-score {
                position: absolute;
                top: 12px;
                right: 12px;
                color: var(--Obsidian);
                background-color: var(--BGBackground);
                font-family: 'Geist', sans-serif;
                font-size: 1.2rem;
                font-weight: 700;
                padding: 6px 12px;
                border-radius: 6px;
                border: 1px solid var(--Stroke);
            }
        }

        .p-card-body {
            display: flex;
            flex-direction: column;
            padding: 18px;
            height: 100%;
            background-color: var(--BGCard);

            .p-card-title {
                font-family: 'Playfair Display';
                font-size: 1.8rem;
                font-weight: 700;
                color: var(--WhiteAshes);
                margin-bottom: 12px;
            }

            .p-card-content {
                display: flex;
                flex-direction: column;
                flex: 1;

                .card-description {
                    font-family: 'Inter', sans-serif;
                    color: var(--TextMuted);
                    font-size: 0.95rem;
                    line-height: 1.3;
                    margin: 0 0 16px;
                    flex: 1;
                }

                .card-divider {
                    border: none;
                    border-top: 1px solid var(--Stroke);
                    margin: 16px 0;
                }

                .card-footer {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-top: auto;

                    .card-city {
                        font-family: 'Inter', sans-serif;
                        color: var(--TextFaint);
                        font-size: 0.85rem;
                    }

                    .card-link {
                        font-size: 0.85rem;
                        font-weight: 600;
                    }
                }
            }
        }

        @media (max-width: 768px) {
            width: 100%;

            .card-image {
                height: 100%;
            }
        }
    }
</style>