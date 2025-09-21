import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { login as apiLogin, register as apiRegister } from '../services/authService'

export const useAuthStore = defineStore('auth', () => {
  // State
  const user = ref(null)
  const token = ref(localStorage.getItem('token') || null)
  const isAuthenticated = computed(() => !!token.value)
  const loading = ref(false)
  const error = ref('')

  // Actions
  async function login(credentials) {
    loading.value = true
    error.value = ''

    try {
      const response = await apiLogin(credentials.email, credentials.password)
      const { access_token, user: userData } = response.data

      token.value = access_token
      user.value = userData

      // Store token in localStorage
      localStorage.setItem('token', access_token)

      return { success: true }
    } catch (err) {
      error.value = err.response?.data?.message || 'Login failed'
      return { success: false, error: error.value }
    } finally {
      loading.value = false
    }
  }

  async function register(userData) {
    loading.value = true
    error.value = ''

    try {
      const response = await apiRegister(userData)
      const { access_token, user: newUser } = response.data

      token.value = access_token
      user.value = newUser

      // Store token in localStorage
      localStorage.setItem('token', access_token)

      return { success: true }
    } catch (err) {
      error.value = err.response?.data?.message || 'Registration failed'
      return { success: false, error: error.value }
    } finally {
      loading.value = false
    }
  }

  function logout() {
    token.value = null
    user.value = null
    localStorage.removeItem('token')
  }

  function initializeAuth() {
    const storedToken = localStorage.getItem('token')
    if (storedToken) {
      token.value = storedToken
      // TODO: Validate token with backend and fetch user data
    }
  }

  return {
    // State
    user,
    token,
    isAuthenticated,
    loading,
    error,

    // Actions
    login,
    register,
    logout,
    initializeAuth
  }
})
