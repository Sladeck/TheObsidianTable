<script setup lang="ts">
    import Card from 'primevue/card';
    import { useRouter } from 'vue-router';

    const router = useRouter()

    const props = defineProps<{
        name: string
        image: string
        score: number
        description: string
        city: string
        slug: string
        cuisine: string
        priceLevel: number
    }>()

    const truncate = (text: string, words: number) => {
        const wordsArray = text.split(' ')
        if (wordsArray.length <= words) return text
        return wordsArray.slice(0, words).join(' ') + '...'
    }

    const priceSign = (level: number) => '$'.repeat(level)

    const goToRestaurant = () => {
        router.push(`/restaurant/${props.slug}`)
    }

</script>
<template>
    <Card 
        class="restaurant-card"
        role="link"
        :aria-label="`Read review of ${name}`"
        tabindex="0"
        @click="goToRestaurant"
        @keydown.enter="goToRestaurant"
    >
        <template #header>
            <div class="card-image-wrapper">
                <img :src="image" :alt="name" class="card-image" />
                <span class="card-score gradient-text">{{ score }}</span>
            </div>
        </template>
        <template #title>
            <span class="card-cuisine">{{ cuisine }}</span>
            <span class="card-title-text">{{ truncate(name, 6) }}</span>
        </template>
        <template #content>
            <p class="card-description">{{ truncate(description, 20) }}</p>
            <hr class="card-divider" />
            <div class="card-footer">
                <span class="card-city">{{ city }}</span>
                <span class="card-price">{{ priceSign(priceLevel) }}</span>
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
        cursor: pointer;

        transition: box-shadow 0.3s ease, transform 0.3s ease;

        &:hover {
            box-shadow: 0 8px 24px color-mix(in srgb, var(--Obsidian) 25%, transparent);
            transform: translateY(-4px);
        }

        &:focus-visible {
            outline: 2px solid var(--Obsidian);
            outline-offset: 2px;
        }

        .p-card-header {

            .card-image-wrapper {
                position: relative;

                .card-image {
                    width: 100%;
                    height: 250px;
                    aspect-ratio: 1;
                    object-fit: cover;
                    object-position: center;
                    display: block;
                }

                .card-score {
                    position: absolute;
                    top: 12px;
                    right: 12px;
                    color: var(--Obsidian);
                    background-color: var(--BGCard);
                    font-family: 'Geist', sans-serif;
                    font-size: 1.2rem;
                    font-weight: 700;
                    padding: 6px 12px;
                    border-radius: 6px;
                    border: 1px solid var(--Stroke);
                }
            }
        }

        .p-card-body {
            display: flex;
            flex-direction: column;
            padding: 18px;
            height: 100%;
            background-color: var(--BGCard);

            .card-cuisine {
                display: block;
                font-family: 'Geist', 'Inter', sans-serif;
                font-size: 0.75rem;
                text-transform: uppercase;
                letter-spacing: 2px;
                color: var(--Obsidian);
                margin-bottom: 4px;
            }

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
                        font-family: 'Geist', 'Inter', sans-serif;
                        color: var(--TextMuted);
                        font-size: 0.85rem;
                        letter-spacing: 2px;
                    }

                    .card-price {
                        font-family: 'Geist', 'Inter', sans-serif;
                        font-weight: 600;
                        color: var(--TextMuted);
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