const API_BASE_URL = import.meta.env.VITE_API_URL ?? "http://localhost:3000/api";

async function parseErrorMessage(response, fallback) {
    const result = await response.json().catch(() => ({}));
    return result.error || result.errors?.join(", ") || `${fallback} (${response.status})`;
}

export const RestaurantService = {
    async getRestaurants(params = {}) {
        const query = new URLSearchParams(params).toString();
        const response = await fetch(`${API_BASE_URL}/restaurants${query ? `?${query}` : ""}`);

        if (!response.ok) {
            throw new Error(`Failed to fetch restaurants (${response.status})`);
        }

        return response.json();
    },

    async getRestaurantBySlug(slug) {
        const response = await fetch(`${API_BASE_URL}/restaurants/${slug}`);

        if (!response.ok) {
            throw new Error(`Failed to fetch restaurant "${slug}" (${response.status})`);
        }

        return response.json();
    },

    async createRestaurant(data) {
        const response = await fetch(`${API_BASE_URL}/restaurants`, {
            method: "POST",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            throw new Error(await parseErrorMessage(response, "Failed to create restaurant"));
        }

        return response.json();
    },

    async updateRestaurant(slug, data) {
        const response = await fetch(`${API_BASE_URL}/restaurants/${slug}`, {
            method: "PUT",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            throw new Error(await parseErrorMessage(response, "Failed to update restaurant"));
        }

        return response.json();
    },

    async deleteRestaurant(slug) {
        const response = await fetch(`${API_BASE_URL}/restaurants/${slug}`, {
            method: "DELETE",
            credentials: "include",
        });

        if (!response.ok) {
            throw new Error(await parseErrorMessage(response, "Failed to delete restaurant"));
        }
    },

    async uploadImages(files) {
        const formData = new FormData();
        for (const file of files) {
            formData.append("images", file);
        }

        const response = await fetch(`${API_BASE_URL}/uploads`, {
            method: "POST",
            credentials: "include",
            body: formData,
        });

        if (!response.ok) {
            throw new Error(await parseErrorMessage(response, "Failed to upload images"));
        }

        const result = await response.json();
        return result.urls;
    },
};
