<template>
  <div class="register-container">
    <!-- Background Elements -->
    <div class="background-elements">
      <div class="floating-shape shape-1"></div>
      <div class="floating-shape shape-2"></div>
      <div class="floating-shape shape-3"></div>
      <div class="floating-shape shape-4"></div>
    </div>

    <!-- Main Content -->
    <div class="main-content">
      <!-- Left Side - Branding -->
      <div class="branding-section animate-slide-left">
        <div class="logo-container">
          <div class="logo-icon">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" fill="url(#logoGradient)"/>
              <defs>
                <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" style="stop-color:#667eea"/>
                  <stop offset="50%" style="stop-color:#764ba2"/>
                  <stop offset="100%" style="stop-color:#f093fb"/>
                </linearGradient>
              </defs>
            </svg>
          </div>
          <h1 class="logo-text">InstaVibe</h1>
          <p class="logo-subtitle">Join our vibrant community</p>
        </div>

        <div class="features-list">
          <div class="feature-item">
            <div class="feature-icon">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/>
              </svg>
            </div>
            <span>Connect with friends</span>
          </div>
          <div class="feature-item">
            <div class="feature-icon">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
            </div>
            <span>Share your moments</span>
          </div>
          <div class="feature-item">
            <div class="feature-icon">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M9 11H7v9h2v-9zm4 0h-2v9h2v-9zm4 0h-2v9h2v-9zm2-7v2H4V4h5V2h6v2h5zM6 19c0 1.1.9 2 2 2h8c0-1.1-.9-2-2-2H8c-1.1 0-2-.9-2-2z"/>
              </svg>
            </div>
            <span>Express yourself</span>
          </div>
        </div>
      </div>

      <!-- Right Side - Register Form -->
      <div class="form-section animate-slide-right">
        <div class="form-container">
          <div class="form-header">
            <h2 class="form-title">Create Account</h2>
            <p class="form-subtitle">Start your journey with us today</p>
          </div>

          <form @submit.prevent="onSubmit" class="register-form">
            <!-- Name Input -->
            <div class="input-group">
              <div class="input-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                  <circle cx="12" cy="7" r="4"/>
                </svg>
              </div>
              <BaseInput
                v-model="form.name"
                type="text"
                placeholder="Full Name"
                size="lg"
                variant="outlined"
                :error="errors.name"
                required
                class="icon-input"
              />
            </div>

            <!-- Username Input -->
            <div class="input-group">
              <div class="input-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                  <circle cx="8.5" cy="7" r="4"/>
                  <path d="M20 8v6M23 11l-3 3-3-3"/>
                </svg>
              </div>
              <BaseInput
                v-model="form.username"
                type="text"
                placeholder="Username"
                size="lg"
                variant="outlined"
                :error="errors.username"
                required
                class="icon-input"
              />
            </div>

            <!-- Email Input -->
            <div class="input-group">
              <div class="input-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                  <polyline points="22,6 12,13 2,6"/>
                </svg>
              </div>
              <BaseInput
                v-model="form.email"
                type="email"
                placeholder="Email address"
                size="lg"
                variant="outlined"
                :error="errors.email"
                required
                class="icon-input"
              />
            </div>

            <!-- Password Input -->
            <div class="input-group">
              <div class="input-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                  <circle cx="12" cy="16" r="1"/>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                </svg>
              </div>
              <BaseInput
                v-model="form.password"
                type="password"
                placeholder="Password"
                size="lg"
                variant="outlined"
                :error="errors.password"
                required
                class="icon-input"
              />
            </div>

            <!-- Confirm Password Input -->
            <div class="input-group">
              <div class="input-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                  <circle cx="12" cy="16" r="1"/>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                  <path d="M9 16l2 2 4-4"/>
                </svg>
              </div>
              <BaseInput
                v-model="form.password_confirmation"
                type="password"
                placeholder="Confirm Password"
                size="lg"
                variant="outlined"
                :error="errors.password_confirmation"
                required
                class="icon-input"
              />
            </div>

            <!-- Terms Checkbox -->
            <div class="terms-section">
              <label class="terms-checkbox">
                <input type="checkbox" v-model="agreeToTerms" required>
                <span class="checkmark"></span>
                <span class="terms-text">
                  I agree to the
                  <a href="#" class="terms-link">Terms of Service</a> and
                  <a href="#" class="terms-link">Privacy Policy</a>
                </span>
              </label>
            </div>

            <!-- Register Button -->
            <BaseButton
              type="submit"
              variant="primary"
              size="lg"
              :loading="loading"
              loading-text="Creating account..."
              full-width
              class="register-btn"
            >
              <span class="btn-text">Create Account</span>
            </BaseButton>

            <!-- Error Message -->
            <div v-if="error" class="error-message animate-slide-up">
              <div class="error-icon">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
              </div>
              <div class="error-content">
                <p class="error-text">{{ error }}</p>
                <button
                  v-if="loading"
                  type="button"
                  @click="resetLoading"
                  class="error-action"
                >
                  Try again
                </button>
              </div>
            </div>

            <!-- Success Message -->
            <div v-if="registerSuccess" class="success-message animate-slide-up">
              <div class="success-icon">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
              </div>
              <p class="success-text">Account created successfully! Redirecting...</p>
            </div>

            <!-- Social Register Divider -->
            <div class="divider">
              <span class="divider-text">Or register with</span>
            </div>

            <!-- Social Register Buttons -->
            <div class="social-buttons">
              <button type="button" class="social-btn google-btn">
                <svg viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                <span>Google</span>
              </button>

              <button type="button" class="social-btn facebook-btn">
                <svg viewBox="0 0 24 24" fill="#1877F2">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
                <span>Facebook</span>
              </button>
            </div>
          </form>

          <!-- Login Link -->
          <div class="login-link">
            <p>Already have an account?
              <router-link to="/login" class="login-btn">
                Sign in here
              </router-link>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import BaseInput from '../components/BaseInput.vue'
import BaseButton from '../components/BaseButton.vue'
import { useAuthStore } from '../stores/auth'

const router = useRouter()
const authStore = useAuthStore()

const form = reactive({
  name: '',
  username: '',
  email: '',
  password: '',
  password_confirmation: ''
})

const errors = reactive({
  name: '',
  username: '',
  email: '',
  password: '',
  password_confirmation: ''
})

const loading = ref(false)
const error = ref('')
const registerSuccess = ref(false)
const agreeToTerms = ref(false)

const resetLoading = () => {
  loading.value = false
  error.value = ''
}

const validateForm = () => {
  // Reset errors
  Object.keys(errors).forEach(key => {
    errors[key] = ''
  })
  error.value = ''

  let isValid = true

  // Name validation
  if (!form.name.trim()) {
    errors.name = 'Name is required'
    isValid = false
  } else if (form.name.trim().length < 2) {
    errors.name = 'Name must be at least 2 characters'
    isValid = false
  }

  // Username validation
  if (!form.username.trim()) {
    errors.username = 'Username is required'
    isValid = false
  } else if (form.username.length < 3) {
    errors.username = 'Username must be at least 3 characters'
    isValid = false
  } else if (!/^[a-zA-Z0-9_]+$/.test(form.username)) {
    errors.username = 'Username can only contain letters, numbers, and underscores'
    isValid = false
  }

  // Email validation
  if (!form.email.trim()) {
    errors.email = 'Email is required'
    isValid = false
  } else if (!/\S+@\S+\.\S+/.test(form.email)) {
    errors.email = 'Please enter a valid email'
    isValid = false
  }

  // Password validation
  if (!form.password) {
    errors.password = 'Password is required'
    isValid = false
  } else if (form.password.length < 8) {
    errors.password = 'Password must be at least 8 characters'
    isValid = false
  }

  // Confirm password validation
  if (!form.password_confirmation) {
    errors.password_confirmation = 'Please confirm your password'
    isValid = false
  } else if (form.password !== form.password_confirmation) {
    errors.password_confirmation = 'Passwords do not match'
    isValid = false
  }

  // Terms validation
  if (!agreeToTerms.value) {
    error.value = 'You must agree to the Terms of Service and Privacy Policy'
    isValid = false
  }

  return isValid
}

const onSubmit = async () => {
  if (!validateForm()) return

  loading.value = true
  error.value = ''

  try {
    const result = await authStore.register(form)
    if (result.success) {
      registerSuccess.value = true
      setTimeout(() => {
        router.push('/')
      }, 1500)
    } else {
      error.value = result.error
    }
  } catch {
    error.value = 'Registration failed. Please try again.'
  } finally {
    loading.value = false
  }
}

// Watch for successful registration and redirect
import { watch } from 'vue'
watch(() => authStore.isAuthenticated, (isAuth) => {
  if (isAuth) {
    router.push('/')
  }
})
</script>

<style scoped>
/* Register Container */
.register-container {
  min-height: 100vh;
  position: relative;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
  overflow: hidden;
}

/* Background Elements */
.background-elements {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
}

.floating-shape {
  position: absolute;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
}

.shape-1 {
  width: 200px;
  height: 200px;
  top: 10%;
  left: 5%;
  animation: float 6s ease-in-out infinite;
}

.shape-2 {
  width: 150px;
  height: 150px;
  top: 60%;
  right: 10%;
  animation: float 8s ease-in-out infinite reverse;
}

.shape-3 {
  width: 100px;
  height: 100px;
  top: 30%;
  right: 30%;
  animation: float 5s ease-in-out infinite;
}

.shape-4 {
  width: 80px;
  height: 80px;
  bottom: 20%;
  left: 20%;
  animation: float 7s ease-in-out infinite reverse;
}

/* Main Content */
.main-content {
  display: flex;
  min-height: 100vh;
  position: relative;
  z-index: 1;
}

/* Branding Section */
.branding-section {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 3rem;
  text-align: center;
}

.logo-container {
  margin-bottom: 3rem;
}

.logo-icon {
  width: 80px;
  height: 80px;
  margin: 0 auto 1.5rem;
  animation: pulse 2s ease-in-out infinite;
}

.logo-text {
  font-family: 'Dancing Script', cursive;
  font-size: 3.5rem;
  font-weight: 700;
  color: white;
  margin-bottom: 0.5rem;
  text-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
}

.logo-subtitle {
  color: rgba(255, 255, 255, 0.9);
  font-size: 1.2rem;
  font-weight: 300;
  margin-bottom: 2rem;
}

.features-list {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  max-width: 400px;
}

.feature-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  background: rgba(255, 255, 255, 0.1);
  padding: 1rem 1.5rem;
  border-radius: 15px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: white;
  font-weight: 500;
  transition: all 0.3s ease;
}

.feature-item:hover {
  transform: translateY(-5px);
  background: rgba(255, 255, 255, 0.15);
}

.feature-icon {
  width: 24px;
  height: 24px;
  color: #f093fb;
}

/* Form Section */
.form-section {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
}

.form-container {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  border-radius: 24px;
  padding: 3rem;
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.15);
  width: 100%;
  max-width: 450px;
  position: relative;
}

.form-header {
  text-align: center;
  margin-bottom: 2.5rem;
}

.form-title {
  font-size: 2rem;
  font-weight: 700;
  color: #2d3748;
  margin-bottom: 0.5rem;
}

.form-subtitle {
  color: #718096;
  font-size: 1rem;
  font-weight: 400;
}

.register-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

/* Input Groups */
.input-group {
  position: relative;
}

.input-icon {
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  width: 20px;
  height: 20px;
  color: #a0aec0;
  z-index: 2;
  transition: all 0.3s ease;
}

.icon-input :deep(input) {
  padding-left: 3.5rem !important;
  padding-top: 1.25rem !important;
  padding-bottom: 1.25rem !important;
  padding-right: 1.25rem !important;
}

.input-group:focus-within .input-icon {
  color: #667eea;
}

/* Terms Section */
.terms-section {
  margin: 0.5rem 0;
}

.terms-checkbox {
  display: flex;
  align-items: flex-start;
  cursor: pointer;
  user-select: none;
  line-height: 1.5;
}

.terms-checkbox input {
  display: none;
}

.checkmark {
  width: 18px;
  height: 18px;
  border: 2px solid #cbd5e0;
  border-radius: 4px;
  margin-right: 0.75rem;
  margin-top: 0.125rem;
  position: relative;
  transition: all 0.3s ease;
  flex-shrink: 0;
}

.terms-checkbox input:checked + .checkmark {
  background: linear-gradient(45deg, #667eea, #764ba2);
  border-color: #667eea;
}

.terms-checkbox input:checked + .checkmark::after {
  content: '✓';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: white;
  font-size: 12px;
  font-weight: bold;
}

.terms-text {
  font-size: 0.85rem;
  color: #4a5568;
  line-height: 1.4;
}

.terms-link {
  color: #667eea;
  text-decoration: none;
  font-weight: 500;
  transition: all 0.3s ease;
}

.terms-link:hover {
  color: #5a6fd8;
  text-decoration: underline;
}

/* Register Button */
.register-btn {
  background: linear-gradient(45deg, #667eea, #764ba2) !important;
  border: none !important;
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease;
  padding: 1rem 2rem !important;
  margin-top: 0.5rem;
}

.register-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 25px rgba(102, 126, 234, 0.4);
}

.register-btn :deep(.btn-text) {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

/* Messages */
.error-message, .success-message {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  padding: 1rem;
  border-radius: 12px;
  font-size: 0.9rem;
}

.error-message {
  background: rgba(248, 113, 113, 0.1);
  border: 1px solid rgba(248, 113, 113, 0.3);
  color: #dc2626;
}

.success-message {
  background: rgba(34, 197, 94, 0.1);
  border: 1px solid rgba(34, 197, 94, 0.3);
  color: #16a34a;
}

.error-icon, .success-icon {
  width: 20px;
  height: 20px;
  flex-shrink: 0;
}

.error-content {
  flex: 1;
}

.error-action {
  background: none;
  border: none;
  color: #667eea;
  text-decoration: underline;
  cursor: pointer;
  font-size: 0.8rem;
  margin-top: 0.25rem;
}

/* Divider */
.divider {
  position: relative;
  text-align: center;
  margin: 1.5rem 0;
}

.divider::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  height: 1px;
  background: linear-gradient(90deg, transparent, #e2e8f0, transparent);
}

.divider-text {
  background: rgba(255, 255, 255, 0.95);
  padding: 0 1rem;
  color: #a0aec0;
  font-size: 0.9rem;
  font-weight: 500;
}

/* Social Buttons */
.social-buttons {
  display: flex;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.social-btn {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.75rem;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  background: white;
  color: #4a5568;
  font-weight: 500;
  transition: all 0.3s ease;
  cursor: pointer;
}

.social-btn:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.social-btn svg {
  width: 20px;
  height: 20px;
}

.google-btn:hover {
  border-color: #4285F4;
}

.facebook-btn:hover {
  border-color: #1877F2;
}

/* Login Link */
.login-link {
  text-align: center;
  padding-top: 1.5rem;
  border-top: 1px solid #e2e8f0;
  color: #718096;
  font-size: 0.9rem;
}

.login-btn {
  color: #667eea;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.3s ease;
}

.login-btn:hover {
  color: #5a6fd8;
  text-decoration: underline;
}

/* Animations */
@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-20px); }
}

@keyframes pulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.05); }
}

@keyframes slideLeft {
  from { transform: translateX(-50px); opacity: 0; }
  to { transform: translateX(0); opacity: 1; }
}

@keyframes slideRight {
  from { transform: translateX(50px); opacity: 0; }
  to { transform: translateX(0); opacity: 1; }
}

@keyframes slideUp {
  from { transform: translateY(20px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}

.animate-slide-left {
  animation: slideLeft 0.8s ease-out;
}

.animate-slide-right {
  animation: slideRight 0.8s ease-out;
}

.animate-slide-up {
  animation: slideUp 0.5s ease-out;
}

/* Responsive Design */
@media (max-width: 1024px) {
  .branding-section {
    display: none;
  }

  .form-section {
    flex: none;
    width: 100%;
  }
}

@media (max-width: 640px) {
  .form-container {
    margin: 1rem;
    padding: 2rem 1.5rem;
  }

  .logo-text {
    font-size: 2.5rem;
  }

  .social-buttons {
    flex-direction: column;
  }

  .terms-section {
    margin: 1rem 0;
  }
}

/* Animation delays for staggered effect */
.animate-slide-left {
  animation-delay: 0.2s;
}

.animate-slide-right {
  animation-delay: 0.4s;
}

.animate-slide-up {
  animation-delay: 0.1s;
}
</style>
