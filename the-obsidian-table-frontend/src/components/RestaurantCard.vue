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
                <RouterLink :to="`/restaurant/${slug}`" class="card-link">Read the review</RouterLink>
            </div>
        </template>
    </Card>
</template>

<style>
:root {
    --color-bg-card: #121214;
    --color-score-bg: #121214;
    --color-score: #A020F0;
    --color-title: #ffffff;
    --color-text: #a0a0a0;
    --color-city: #6b6b6b;
    --color-link: #A020F0;
    --color-divider: #2a2a2a;
    --color-stroke: #262626;
}

.restaurant-card {
    background: var(--color-bg-card);
    border-radius: 4px !important;
    overflow: hidden;
    width: 320px;
    border: 1px solid var(--color-divider);

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
            background: var(--color-score-bg);
            color: var(--color-score);
            font-family: 'Geist', sans-serif;
            font-size: 1.2rem;
            font-weight: 700;
            padding: 6px 12px;
            border-radius: 6px;
            border: 1px solid var(--color-stroke);
        }
    }

    .p-card-body {
        display: flex;
        flex-direction: column;
        padding: 18px;
        height: 100%;

        .p-card-title {
            font-family: 'Playfair Display';
            font-size: 1.8rem;
            font-weight: 700;
            color: var(--color-title);
            margin-bottom: 12px;
        }

        .p-card-content {
            display: flex;
            flex-direction: column;
            flex: 1;
            .card-description {
                font-family: 'Inter', sans-serif;
                color: var(--color-text);
                font-size: 0.95rem;
                line-height: 1.3;
                margin: 0 0 16px;
                flex: 1;
            }

            .card-divider {
                border: none;
                border-top: 1px solid var(--color-stroke);
                margin: 16px 0;
            }

            .card-footer {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-top: auto;

                .card-city {
                    font-family: 'Inter', sans-serif;
                    color: var(--color-city);
                    font-size: 0.85rem;
                }

                .card-link {
                    font-family: 'Inter', sans-serif;
                    color: var(--color-link);
                    font-size: 0.85rem;
                    font-weight: 600;
                    text-decoration: none;

                    &:hover {
                        text-decoration: underline;
                    }
                }
            }
        }
    }

    @media (max-width: 768px) {
        width: 100%;

        .restaurant-card {
            .card-image-wrapper {
                .card-image {
                    height: 100%;
                }
            }
        }
    }
}
</style>