import axios from 'axios'

// Configure axios defaults
axios.defaults.baseURL = 'http://localhost:8000' // Laravel backend URL
axios.defaults.headers.common['Accept'] = 'application/json'

// Add token to requests if available
axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Handle token expiration
axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem('token')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

export async function login(email, password) {
  return axios.post('/api/login', { email, password })
}

export async function register(userData) {
  return axios.post('/api/register', userData)
}

export async function logout() {
  return axios.post('/api/logout')
}

export async function getCurrentUser() {
  return axios.get('/api/user')
}
