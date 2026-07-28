<script setup>
import { ref, onMounted } from "vue";
import { RouterLink } from "vue-router";
import { InputOtp, Button } from "primevue";
import { AuthService } from "@/service/AuthService";

const phase = ref("loading"); // loading | unavailable | scanning | done
const error = ref("");
const qrCodeDataUrl = ref("");
const secret = ref("");
const code = ref("");
const confirming = ref(false);
const copied = ref(false);

onMounted(async () => {
	try {
		const result = await AuthService.setup2faGenerate();
		qrCodeDataUrl.value = result.qrCodeDataUrl;
		secret.value = result.secret;
		phase.value = "scanning";
	} catch (err) {
		error.value = err.message;
		phase.value = "unavailable";
	}
});

async function confirmCode() {
	error.value = "";
	confirming.value = true;
	try {
		const result = await AuthService.setup2faConfirm(code.value);
		secret.value = result.secret;
		phase.value = "done";
	} catch (err) {
		error.value = err.message;
		code.value = "";
	} finally {
		confirming.value = false;
	}
}

function copySecret() {
	navigator.clipboard.writeText(`ADMIN_TOTP_SECRET=${secret.value}`);
	copied.value = true;
	setTimeout(() => (copied.value = false), 2000);
}
</script>

<template>
	<main id="setup-2fa">
		<div class="setup-card">
			<h2 class="playfair-display">Set Up Two-Factor Authentication</h2>

			<p v-if="phase === 'loading'" class="hint">Generating your code...</p>

			<div v-else-if="phase === 'unavailable'" class="state-block">
				<p class="error">{{ error }}</p>
				<RouterLink to="/login" class="underline">Back to login</RouterLink>
			</div>

			<div v-else-if="phase === 'scanning'" class="state-block">
				<p class="hint">Scan this QR code with your authenticator app (Google Authenticator, Apple Passwords, 1Password, Authy, ...).</p>
				<img :src="qrCodeDataUrl" alt="Two-factor authentication QR code" class="qr-code" />
				<p class="hint">Or enter this code manually:</p>
				<code class="manual-code">{{ secret }}</code>
				<p class="hint">Then enter the 6-digit code it generates to confirm setup:</p>
				<InputOtp v-model="code" :length="6" integerOnly />
				<p v-if="error" class="error">{{ error }}</p>
				<Button label="Confirm" :loading="confirming" @click="confirmCode" />
			</div>

			<div v-else class="state-block">
				<p class="success">Verified. Two-factor authentication is ready.</p>
				<p class="hint">Add this line to the backend <code>.env</code> file, then restart the server:</p>
				<div class="secret-box">
					<code>ADMIN_TOTP_SECRET={{ secret }}</code>
					<Button :label="copied ? 'Copied' : 'Copy'" size="small" @click="copySecret" />
				</div>
				<p class="hint">Once the server restarts with that value set, this setup page stops working for good and you'll log in with your authenticator app from now on.</p>
				<RouterLink to="/login" class="underline">Back to login</RouterLink>
			</div>
		</div>
	</main>
</template>

<style>
	#setup-2fa {
		margin-top: 0;
		min-height: 100vh;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 24px;

		.setup-card {
			width: 100%;
			max-width: 460px;
			background-color: var(--BGCard);
			border: 1px solid var(--Stroke);
			border-radius: 8px;
			padding: 40px 32px;

			h2 {
				text-align: center;
				color: var(--WhiteAshes);
				font-size: 1.6rem;
				margin-bottom: 24px;
			}

			.state-block {
				display: flex;
				flex-direction: column;
				align-items: center;
				gap: 12px;
				text-align: center;
			}

			.hint {
				color: var(--TextMuted);
				font-size: 0.9rem;
				margin: 0;
			}

			.qr-code {
				width: 200px;
				height: 200px;
				border-radius: 4px;
				background-color: white;
				padding: 8px;
			}

			.manual-code {
				display: inline-block;
				color: var(--Obsidian);
				background-color: var(--SectionOff);
				border: 1px solid var(--Stroke);
				border-radius: 4px;
				padding: 8px 12px;
				font-size: 0.9rem;
				letter-spacing: 1px;
				word-break: break-all;
			}

			.p-inputotp {
				justify-content: center;
			}

			.error {
				color: #f87171;
				font-size: 0.85rem;
				margin: 0;
			}

			.success {
				color: var(--Obsidian);
				font-weight: 600;
				margin: 0;
			}

			.secret-box {
				display: flex;
				align-items: center;
				gap: 12px;
				background-color: var(--SectionOff);
				border: 1px solid var(--Stroke);
				border-radius: 4px;
				padding: 12px 16px;
				width: 100%;

				code {
					flex: 1;
					color: var(--WhiteAshes);
					font-size: 0.8rem;
					word-break: break-all;
					text-align: left;
				}
			}

			.p-button {
				margin-top: 8px;
				background-color: var(--Obsidian);
				border-color: var(--Obsidian);
			}
		}
	}
</style>
