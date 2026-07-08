const API_BASE_URL = import.meta.env.VITE_API_URL ?? "http://localhost:3000/api";

export const RestaurantService = {
    async getRestaurantBySlug(slug) {
        const response = await fetch(`${API_BASE_URL}/restaurants/${slug}`);

        if (!response.ok) {
            throw new Error(`Failed to fetch restaurant "${slug}" (${response.status})`);
        }

        return response.json();
    },
};
