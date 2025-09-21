import { ref } from 'vue'
import { login as apiLogin } from '../services/auth.service'

export function useLogin() {
  const loading = ref(false)
  const error = ref('')
  const loginSuccess = ref(false)

  async function login(email, password) {
    loading.value = true
    error.value = ''
    try {
      const res = await apiLogin(email, password)
      // Simpan token ke localStorage/session dsb
      localStorage.setItem('token', res.data.access_token)
      loginSuccess.value = true
    } catch (e) {
      error.value = e.response?.data?.message || 'Login failed'
    }
    loading.value = false
  }

  return { loading, error, loginSuccess, login }
}
