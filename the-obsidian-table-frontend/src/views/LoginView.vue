<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { InputText, Password, InputOtp, Button } from "primevue";
import { AuthService } from "@/service/AuthService";
import { useAuth } from "@/composables/useAuth";

const router = useRouter();
const { setAuthenticated } = useAuth();

const step = ref("password");
const username = ref("");
const password = ref("");
const code = ref("");
const error = ref("");
const loading = ref(false);

async function submitPassword() {
	error.value = "";
	loading.value = true;
	try {
		const result = await AuthService.login(username.value, password.value);
		if (result.status === "setup-required") {
			router.push("/admin/setup-2fa");
		} else {
			step.value = "otp";
		}
	} catch (err) {
		error.value = err.message;
	} finally {
		loading.value = false;
	}
}

async function submitCode() {
	error.value = "";
	loading.value = true;
	try {
		await AuthService.verify2fa(code.value);
		setAuthenticated(true);
		router.push("/admin");
	} catch (err) {
		error.value = err.message;
		code.value = "";
	} finally {
		loading.value = false;
	}
}
</script>

<template>
	<main id="login">
		<div class="login-card">
			<h2 class="playfair-display">Sign In</h2>

			<form v-if="step === 'password'" @submit.prevent="submitPassword">
				<label>
					<span>Username</span>
					<InputText v-model="username" autofocus autocomplete="username" required />
				</label>
				<label>
					<span>Password</span>
					<Password v-model="password" :feedback="false" toggleMask autocomplete="current-password" required />
				</label>
				<p v-if="error" class="error">{{ error }}</p>
				<Button type="submit" label="Continue" :loading="loading" />
			</form>

			<form v-else @submit.prevent="submitCode">
				<p class="hint">Enter the 6-digit code from your authenticator app.</p>
				<InputOtp v-model="code" :length="6" integerOnly autofocus />
				<p v-if="error" class="error">{{ error }}</p>
				<Button type="submit" label="Verify" :loading="loading" />
			</form>
		</div>
	</main>
</template>

<style>
	#login {
		margin-top: 0;
		min-height: 100vh;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 24px;

		.login-card {
			width: 100%;
			max-width: 380px;
			background-color: var(--BGCard);
			border: 1px solid var(--Stroke);
			border-radius: 8px;
			padding: 40px 32px;

			h2 {
				text-align: center;
				color: var(--WhiteAshes);
				font-size: 1.75rem;
				margin-bottom: 32px;
			}

			form {
				display: flex;
				flex-direction: column;
				gap: 20px;

				label {
					display: flex;
					flex-direction: column;
					gap: 8px;
					font-size: 0.85rem;
					color: var(--TextMuted);
				}

				.p-inputtext, .p-password, .p-password-input {
					width: 100%;
				}

				.p-inputotp {
					justify-content: center;
				}

				.hint {
					color: var(--TextMuted);
					font-size: 0.9rem;
					text-align: center;
					margin: 0;
				}

				.error {
					color: #f87171;
					font-size: 0.85rem;
					margin: 0;
				}

				.p-button {
					margin-top: 8px;
					background-color: var(--Obsidian);
					border-color: var(--Obsidian);
				}
			}
		}
	}
</style>
