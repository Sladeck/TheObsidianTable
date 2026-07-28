import { ref } from "vue";
import { AuthService } from "@/service/AuthService";

const isAuthenticated = ref(false);
const checked = ref(false);

export function useAuth() {
	async function checkAuth() {
		try {
			await AuthService.me();
			isAuthenticated.value = true;
		} catch {
			isAuthenticated.value = false;
		} finally {
			checked.value = true;
		}
		return isAuthenticated.value;
	}

	function setAuthenticated(value: boolean) {
		isAuthenticated.value = value;
		checked.value = true;
	}

	return { isAuthenticated, checked, checkAuth, setAuthenticated };
}
