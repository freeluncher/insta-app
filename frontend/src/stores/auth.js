import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { login as apiLogin, register as apiRegister } from '../services/authService'
import axios from 'axios'

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

    // Set a timeout to prevent infinite loading
    const timeoutId = setTimeout(() => {
      if (loading.value) {
        console.warn('Login request timed out')
        loading.value = false
        error.value = 'Request timed out. Please try again.'
      }
    }, 15000) // 15 second timeout

    try {
      console.log('Attempting login with:', credentials.email)
      const response = await apiLogin(credentials.email, credentials.password)
      clearTimeout(timeoutId)
      console.log('Login response:', response)

      const { access_token, user: userData } = response.data

      token.value = access_token
      user.value = userData

      // Store token in localStorage
      localStorage.setItem('token', access_token)

      console.log('Login successful')
      return { success: true }
    } catch (err) {
      clearTimeout(timeoutId)
      console.error('Login error:', err)

      if (!err.response) {
        // Network error or timeout
        error.value = 'Unable to connect to server. Please check your internet connection and try again.'
      } else if (err.response.status === 422) {
        // Validation error
        error.value = 'Invalid email or password. Please check your credentials.'
      } else if (err.response.status === 429) {
        // Too many requests
        error.value = 'Too many login attempts. Please try again later.'
      } else {
        // Other server errors
        error.value = err.response?.data?.message || 'Login failed. Please try again.'
      }

      return { success: false, error: error.value }
    } finally {
      loading.value = false
      console.log('Login loading set to false')
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
      if (err.response?.status === 422 && err.response?.data?.errors) {
        // Handle validation errors
        const validationErrors = err.response.data.errors
        const firstError = Object.values(validationErrors)[0][0] // Get first error message
        error.value = firstError
      } else {
        error.value = err.response?.data?.message || 'Registration failed'
      }
      return { success: false, error: error.value }
    } finally {
      loading.value = false
    }
  }

  async function logout() {
    // Call logout API if token exists
    if (token.value) {
      try {
        await axios.post('/api/logout')
      } catch {
        // Ignore errors - force logout anyway
      }
    }

    token.value = null
    user.value = null
    localStorage.removeItem('token')
  }

  function initializeAuth() {
    const storedToken = localStorage.getItem('token')
    if (storedToken) {
      token.value = storedToken
      loading.value = true
      // Fetch user data to validate token
      fetchUser().finally(() => {
        loading.value = false
      })
    }
  }

  async function fetchUser() {
    if (!token.value) return

    try {
      const response = await axios.get('/api/user')
      user.value = response.data.user
    } catch {
      // Token is invalid, clear auth state
      logout()
    }
  }

  function resetLoading() {
    loading.value = false
    error.value = ''
  }

  async function checkBackendHealth() {
    try {
      // Simple health check - try to access a public endpoint
      await axios.get('/api/health', { timeout: 5000 })
      return true
    } catch {
      return false
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
    initializeAuth,
    fetchUser,
    resetLoading,
    checkBackendHealth
  }
})
