<template>
  <div id="app" class="min-h-screen bg-gray-50">
    <!-- Show loading screen during auth initialization -->
    <AuthLoading
      v-if="authStore.loading && !authStore.isAuthenticated"
      message="Initializing..."
    />

    <!-- Main app content -->
    <router-view v-else />
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useAuthStore } from './stores/auth'
import AuthLoading from './components/AuthLoading.vue'

// Initialize auth store
const authStore = useAuthStore()

onMounted(() => {
  // Check if user is already authenticated on app start
  authStore.initializeAuth()
})
</script>

<style>
/* Global styles */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html, body {
  height: 100%;
}

#app {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

/* Custom scrollbar */
::-webkit-scrollbar {
  width: 6px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
}

::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 3px;
}

::-webkit-scrollbar-thumb:hover {
  background: #a8a8a8;
}
</style>
