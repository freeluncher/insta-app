import { computed } from 'vue'
import { useAuthStore } from '../stores/auth'

export function useLogin() {
  const authStore = useAuthStore()

  const loading = computed(() => authStore.loading)
  const error = computed(() => authStore.error)
  const loginSuccess = computed(() => authStore.isAuthenticated)

  async function login(email, password) {
    return await authStore.login({ email, password })
  }

  return { loading, error, loginSuccess, login }
}
