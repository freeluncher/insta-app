<template>
  <div class="flex min-h-screen items-center justify-center bg-gray-50">
    <div class="w-full max-w-md p-8 bg-white rounded shadow">
      <h2 class="text-2xl font-bold text-center mb-6">Login</h2>
      <form @submit.prevent="onSubmit">
        <BaseInput
          v-model="email"
          type="email"
          placeholder="Email"
          class="mb-4"
        />
        <BaseInput
          v-model="password"
          type="password"
          placeholder="Password"
          class="mb-4"
        />

        <BaseButton type="submit" :disabled="loading">
          <span v-if="!loading">Login</span>
          <span v-else>Loading...</span>
        </BaseButton>
        <p v-if="error" class="mt-4 text-red-600 text-sm text-center">{{ error }}</p>
        <p v-if="loginSuccess" class="mt-4 text-green-600 text-sm text-center">
          Login successful! Redirecting...
        </p>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import BaseInput from '../components/BaseInput.vue'
import BaseButton from '../components/BaseButton.vue'
import { useLogin } from '../composables/useLogin'

const email = ref('')
const password = ref('')

const { loading, error, loginSuccess, login } = useLogin()

function onSubmit() {
  login(email.value, password.value)
}

watch(loginSuccess, (val) => {
  if (val) {
    // Redirect ke halaman utama setelah login sukses
    setTimeout(() => window.location.href = '/', 1500)
  }
})
</script>
