<template>
  <div class="login-container">
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
          <p class="logo-subtitle">Share your world, connect with others</p>
        </div>

        <div class="features-list">
          <div class="feature-item">
            <div class="feature-icon">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
            </div>
            <span>Share amazing moments</span>
          </div>
          <div class="feature-item">
            <div class="feature-icon">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M16 4c0-1.11.89-2 2-2s2 .89 2 2-.89 2-2 2-2-.89-2-2zm4 18v-6h2.5l-2.54-7.63A1.5 1.5 0 0 0 18.5 7h-5c-.8 0-1.52.5-1.8 1.26l-2.92 8.74H12v6h8z"/>
              </svg>
            </div>
            <span>Connect with friends</span>
          </div>
          <div class="feature-item">
            <div class="feature-icon">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
              </svg>
            </div>
            <span>Express yourself freely</span>
          </div>
        </div>
      </div>

      <!-- Right Side - Login Form -->
      <div class="form-section animate-slide-right">
        <div class="form-container">
          <div class="form-header">
            <h2 class="form-title">Welcome Back</h2>
            <p class="form-subtitle">Sign in to continue your journey</p>
          </div>

          <form @submit.prevent="onSubmit" class="login-form">
            <!-- Email Input -->
            <div class="input-group">
              <div class="input-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                  <polyline points="22,6 12,13 2,6"/>
                </svg>
              </div>
              <BaseInput
                v-model="email"
                type="email"
                placeholder="Email or username"
                size="lg"
                variant="outlined"
                :error="emailError"
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
                v-model="password"
                type="password"
                placeholder="Password"
                size="lg"
                variant="outlined"
                :error="passwordError"
                required
                class="icon-input"
              />
            </div>

            <!-- Remember Me & Forgot Password -->
            <div class="form-options">
              <label class="remember-me">
                <input type="checkbox" v-model="rememberMe">
                <span class="checkmark"></span>
                <span class="label-text">Remember me</span>
              </label>
              <button
                type="button"
                class="forgot-password"
                @click="handleForgotPassword"
              >
                Forgot password?
              </button>
            </div>

            <!-- Login Button -->
            <BaseButton
              type="submit"
              variant="primary"
              size="lg"
              :loading="authStore.loading"
              loading-text="Signing in..."
              full-width
              class="login-btn"
            >
              <span class="btn-text">Sign In</span>
            </BaseButton>

            <!-- Error Message -->
            <div v-if="authStore.error" class="error-message animate-slide-up">
              <div class="error-icon">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
              </div>
              <div class="error-content">
                <p class="error-text">{{ authStore.error }}</p>
                <button
                  v-if="authStore.loading"
                  type="button"
                  @click="resetLoading"
                  class="error-action"
                >
                  Try again
                </button>
              </div>
            </div>

            <!-- Success Message -->
            <div v-if="loginSuccess" class="success-message animate-slide-up">
              <div class="success-icon">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
              </div>
              <p class="success-text">Welcome back! Redirecting...</p>
            </div>

            <!-- Social Login Divider -->
            <div class="divider">
              <span class="divider-text">Or continue with</span>
            </div>

            <!-- Social Login Buttons -->
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

          <!-- Sign Up Link -->
          <div class="signup-link">
            <p>Don't have an account?
              <router-link to="/register" class="signup-btn">
                Create one here
              </router-link>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import BaseInput from '../../components/BaseInput.vue'
import BaseButton from '../../components/BaseButton.vue'
import { useAuthStore } from '../../stores/auth'

const router = useRouter()
const authStore = useAuthStore()

const email = ref('')
const password = ref('')
const emailError = ref('')
const passwordError = ref('')
const loginSuccess = ref(false)
const rememberMe = ref(false)

const resetLoading = () => {
  authStore.resetLoading()
}

const handleForgotPassword = () => {
  // TODO: Implement forgot password functionality
  alert('Forgot password functionality coming soon!')
}

const validateForm = () => {
  emailError.value = ''
  passwordError.value = ''

  let isValid = true

  if (!email.value.trim()) {
    emailError.value = 'Email is required'
    isValid = false
  } else if (!/\S+@\S+\.\S+/.test(email.value)) {
    emailError.value = 'Please enter a valid email'
    isValid = false
  }

  if (!password.value) {
    passwordError.value = 'Password is required'
    isValid = false
  } else if (password.value.length < 6) {
    passwordError.value = 'Password must be at least 6 characters'
    isValid = false
  }

  return isValid
}

const onSubmit = async () => {
  if (!validateForm()) return

  try {
    const result = await authStore.login({ email: email.value, password: password.value })
    if (result.success) {
      loginSuccess.value = true
      setTimeout(() => {
        router.push('/user/dashboard')
      }, 1500)
    }
  } catch {
    // Error is handled by the store
  }
}

// Watch for successful login and redirect
import { watch } from 'vue'
watch(() => authStore.isAuthenticated, (isAuth) => {
  if (isAuth) {
    router.push('/user/dashboard')
  }
})
</script>

<style scoped>
/* Login Container */
.login-container {
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

.login-form {
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

/* Form Options */
.form-options {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0.5rem 0;
}

.remember-me {
  display: flex;
  align-items: center;
  cursor: pointer;
  user-select: none;
}

.remember-me input {
  display: none;
}

.checkmark {
  width: 18px;
  height: 18px;
  border: 2px solid #cbd5e0;
  border-radius: 4px;
  margin-right: 0.5rem;
  position: relative;
  transition: all 0.3s ease;
}

.remember-me input:checked + .checkmark {
  background: linear-gradient(45deg, #667eea, #764ba2);
  border-color: #667eea;
}

.remember-me input:checked + .checkmark::after {
  content: '✓';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: white;
  font-size: 12px;
  font-weight: bold;
}

.label-text {
  font-size: 0.9rem;
  color: #4a5568;
}

.forgot-password {
  color: #667eea;
  font-size: 0.9rem;
  font-weight: 500;
  text-decoration: none;
  border: none;
  background: none;
  cursor: pointer;
  transition: all 0.3s ease;
}

.forgot-password:hover {
  color: #5a6fd8;
  text-decoration: underline;
}

/* Login Button */
.login-btn {
  background: linear-gradient(45deg, #667eea, #764ba2) !important;
  border: none !important;
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease;
  padding: 1rem 2rem !important;
}

.login-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 25px rgba(102, 126, 234, 0.4);
}

.login-btn :deep(.btn-text) {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.btn-arrow {
  width: 16px;
  height: 16px;
  transition: transform 0.3s ease;
}

.login-btn:hover .btn-arrow {
  transform: translateX(4px);
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

/* Signup Link */
.signup-link {
  text-align: center;
  padding-top: 1.5rem;
  border-top: 1px solid #e2e8f0;
  color: #718096;
  font-size: 0.9rem;
}

.signup-btn {
  color: #667eea;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.3s ease;
}

.signup-btn:hover {
  color: #5a6fd8;
  text-decoration: underline;
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

  .form-options {
    flex-direction: column;
    gap: 1rem;
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
