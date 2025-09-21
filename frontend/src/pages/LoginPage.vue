<template>
  <div class="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
    <!-- Instagram Logo -->
    <div class="sm:mx-auto sm:w-full sm:max-w-md">
      <div class="text-center">
        <h1 class="text-4xl font-light text-gray-900 tracking-wider">
          InstaApp
        </h1>
        <p class="mt-2 text-sm text-gray-600">
          Connect with friends and share your moments
        </p>
      </div>
    </div>

    <!-- Login Form -->
    <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div class="bg-white py-8 px-4 shadow-lg sm:rounded-lg sm:px-10 border border-gray-200">
        <form @submit.prevent="onSubmit" class="space-y-6">
          <!-- Email Input -->
          <div>
            <BaseInput
              v-model="email"
              type="email"
              placeholder="Email or username"
              size="lg"
              variant="filled"
              :error="emailError"
              required
            />
          </div>

          <!-- Password Input -->
          <div>
            <BaseInput
              v-model="password"
              type="password"
              placeholder="Password"
              size="lg"
              variant="filled"
              :error="passwordError"
              required
            />
          </div>

          <!-- Login Button -->
          <div>
            <BaseButton
              type="submit"
              variant="primary"
              size="lg"
              :loading="loading"
              loading-text="Logging in..."
              full-width
              class="justify-center"
            >
              Log In
            </BaseButton>
          </div>

          <!-- Error Message -->
          <div v-if="error" class="text-center">
            <p class="text-red-600 text-sm font-medium">
              {{ error }}
            </p>
          </div>

          <!-- Success Message -->
          <div v-if="loginSuccess" class="text-center">
            <p class="text-green-600 text-sm font-medium">
              Login successful! Redirecting...
            </p>
          </div>

          <!-- Divider -->
          <div class="relative">
            <div class="absolute inset-0 flex items-center">
              <div class="w-full border-t border-gray-300" />
            </div>
            <div class="relative flex justify-center text-sm">
              <span class="px-2 bg-white text-gray-500">OR</span>
            </div>
          </div>

          <!-- Forgot Password -->
          <div class="text-center">
            <button
              type="button"
              class="text-sm text-blue-600 hover:text-blue-500 font-medium transition-colors duration-200"
              @click="handleForgotPassword"
            >
              Forgot password?
            </button>
          </div>
        </form>
      </div>

      <!-- Sign Up Link -->
      <div class="mt-6 bg-white py-4 px-4 shadow-sm sm:rounded-lg sm:px-10 border border-gray-200">
        <p class="text-center text-sm text-gray-600">
          Don't have an account?
          <router-link
            to="/register"
            class="font-medium text-blue-600 hover:text-blue-500 transition-colors duration-200"
          >
            Sign up
          </router-link>
        </p>
      </div>

      <!-- Get the App -->
      <div class="mt-6 text-center">
        <p class="text-sm text-gray-600 mb-4">Get the app</p>
        <div class="flex justify-center space-x-2">
          <button class="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors duration-200">
            <svg class="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
            </svg>
            App Store
          </button>
          <button class="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors duration-200">
            <svg class="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
              <path d="M3 20.5V3.5C3 2.91 3.34 2.39 3.84 2.15L13.69 12L3.84 21.85C3.34 21.61 3 21.09 3 20.5Z"/>
              <path d="M16.81 15.12L6.05 21.34L14.54 12.85L16.81 15.12Z"/>
              <path d="M20.16 10.81C20.5 11.08 20.75 11.53 20.75 12C20.75 12.47 20.5 12.92 20.16 13.19L17.89 14.5L15.39 12L17.89 9.5L20.16 10.81Z"/>
              <path d="M6.05 2.66L16.81 8.88L14.54 11.15L6.05 2.66Z"/>
            </svg>
            Google Play
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import BaseInput from '../components/BaseInput.vue'
import BaseButton from '../components/BaseButton.vue'
import { useLogin } from '../composables/useLogin'

const router = useRouter()

const email = ref('')
const password = ref('')
const emailError = ref('')
const passwordError = ref('')

const { loading, error, loginSuccess, login } = useLogin()

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
    await login(email.value, password.value)
  } catch {
    // Error is handled by the composable
  }
}

// Watch for successful login and redirect
import { watch } from 'vue'
watch(loginSuccess, (val) => {
  if (val) {
    setTimeout(() => {
      router.push('/')
    }, 1500)
  }
})
</script>

<style scoped>
/* Custom styles for Instagram-like appearance */
.min-h-screen {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  min-height: 100vh;
}

/* Logo styling */
.text-4xl {
  font-family: 'Billabong', 'Instagram Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  background: linear-gradient(45deg, #f09433 0%,#e6683c 25%,#dc2743 50%,#cc2366 75%,#bc1888 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

/* Card shadow effect */
.shadow-lg {
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
}

/* Button hover effects */
button:hover {
  transform: translateY(-1px);
}

button:active {
  transform: translateY(0);
}

/* Responsive adjustments */
@media (max-width: 640px) {
  .sm\\:mx-auto {
    margin-left: auto;
    margin-right: auto;
  }

  .sm\\:w-full {
    width: 100%;
  }

  .sm\\:max-w-md {
    max-width: 28rem;
  }
}
</style>
