const API_BASE_URL = import.meta.env.VITE_API_URL ?? "http://localhost:3000/api";

async function request(path, options = {}) {
    const response = await fetch(`${API_BASE_URL}${path}`, {
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        ...options,
    });

    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
        throw new Error(data.error || data.errors?.join(", ") || `Request failed (${response.status})`);
    }

    return data;
}

export const AuthService = {
    login(username, password) {
        return request("/auth/login", { method: "POST", body: JSON.stringify({ username, password }) });
    },

    verify2fa(code) {
        return request("/auth/verify-2fa", { method: "POST", body: JSON.stringify({ code }) });
    },

    setup2faGenerate() {
        return request("/auth/setup-2fa/generate", { method: "POST" });
    },

    setup2faConfirm(code) {
        return request("/auth/setup-2fa/confirm", { method: "POST", body: JSON.stringify({ code }) });
    },

    me() {
        return request("/auth/me");
    },

    logout() {
        return request("/auth/logout", { method: "POST" });
    },
};
