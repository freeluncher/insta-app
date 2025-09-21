<template>
  <div class="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
    <!-- Instagram Logo -->
    <div class="sm:mx-auto sm:w-full sm:max-w-md">
      <div class="text-center">
        <h1 class="text-4xl font-light text-gray-900 tracking-wider">
          InstaApp
        </h1>
        <p class="mt-2 text-sm text-gray-600">
          Sign up to see photos and videos from your friends
        </p>
      </div>
    </div>

    <!-- Register Form -->
    <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div class="bg-white py-8 px-4 shadow-lg sm:rounded-lg sm:px-10 border border-gray-200">
        <form @submit.prevent="onSubmit" class="space-y-6">
          <!-- Name Input -->
          <div>
            <BaseInput
              v-model="form.name"
              type="text"
              placeholder="Full Name"
              size="lg"
              variant="filled"
              :error="errors.name"
              required
            />
          </div>

          <!-- Username Input -->
          <div>
            <BaseInput
              v-model="form.username"
              type="text"
              placeholder="Username"
              size="lg"
              variant="filled"
              :error="errors.username"
              required
            />
          </div>

          <!-- Email Input -->
          <div>
            <BaseInput
              v-model="form.email"
              type="email"
              placeholder="Email"
              size="lg"
              variant="filled"
              :error="errors.email"
              required
            />
          </div>

          <!-- Password Input -->
          <div>
            <BaseInput
              v-model="form.password"
              type="password"
              placeholder="Password"
              size="lg"
              variant="filled"
              :error="errors.password"
              required
            />
          </div>

          <!-- Confirm Password Input -->
          <div>
            <BaseInput
              v-model="form.password_confirmation"
              type="password"
              placeholder="Confirm Password"
              size="lg"
              variant="filled"
              :error="errors.password_confirmation"
              required
            />
          </div>

          <!-- Register Button -->
          <div>
            <BaseButton
              type="submit"
              variant="primary"
              size="lg"
              :loading="loading"
              loading-text="Creating account..."
              full-width
              class="justify-center"
            >
              Sign Up
            </BaseButton>
          </div>

          <!-- Error Message -->
          <div v-if="error" class="text-center">
            <p class="text-red-600 text-sm font-medium">
              {{ error }}
            </p>
          </div>

          <!-- Success Message -->
          <div v-if="registerSuccess" class="text-center">
            <p class="text-green-600 text-sm font-medium">
              Account created successfully! Redirecting...
            </p>
          </div>
        </form>
      </div>

      <!-- Login Link -->
      <div class="mt-6 bg-white py-4 px-4 shadow-sm sm:rounded-lg sm:px-10 border border-gray-200">
        <p class="text-center text-sm text-gray-600">
          Have an account?
          <router-link
            to="/login"
            class="font-medium text-blue-600 hover:text-blue-500 transition-colors duration-200"
          >
            Log in
          </router-link>
        </p>
      </div>

      <!-- Terms and Privacy -->
      <div class="mt-6 text-center text-xs text-gray-500">
        <p>
          By signing up, you agree to our
          <a href="#" class="text-blue-600 hover:text-blue-500">Terms</a>,
          <a href="#" class="text-blue-600 hover:text-blue-500">Privacy Policy</a> and
          <a href="#" class="text-blue-600 hover:text-blue-500">Cookies Policy</a>.
        </p>
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
</style>
