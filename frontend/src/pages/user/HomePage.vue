<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header -->
    <header class="bg-white border-b border-gray-200 sticky top-0 z-10">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16">
          <h1 class="text-2xl font-light text-gray-900">InstaApp</h1>
          <div class="flex items-center space-x-4">
            <button
              @click="handleLogout"
              class="text-gray-600 hover:text-gray-900 transition-colors duration-200"
            >
              <component :is="icons.ArrowRightOnRectangleIcon" class="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <main class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div class="text-center">
          <div class="w-24 h-24 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mx-auto mb-4 flex items-center justify-center">
            <component :is="icons.UserIcon" class="w-12 h-12 text-white" />
          </div>
          <h2 class="text-2xl font-semibold text-gray-900 mb-2">
            Welcome to InstaApp!
          </h2>
          <p class="text-gray-600 mb-6">
            Your Instagram-like social media platform
          </p>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <div class="text-center">
              <div class="w-16 h-16 bg-blue-100 rounded-full mx-auto mb-3 flex items-center justify-center">
                <component :is="icons.PlusIcon" class="w-8 h-8 text-blue-600" />
              </div>
              <h3 class="font-semibold text-gray-900 mb-1">Create Posts</h3>
              <p class="text-sm text-gray-600">Share your moments with photos and captions</p>
            </div>
            <div class="text-center">
              <div class="w-16 h-16 bg-green-100 rounded-full mx-auto mb-3 flex items-center justify-center">
                <component :is="icons.HeartIcon" class="w-8 h-8 text-green-600" />
              </div>
              <h3 class="font-semibold text-gray-900 mb-1">Like & Comment</h3>
              <p class="text-sm text-gray-600">Engage with posts from your friends</p>
            </div>
            <div class="text-center">
              <div class="w-16 h-16 bg-purple-100 rounded-full mx-auto mb-3 flex items-center justify-center">
                <component :is="icons.UsersIcon" class="w-8 h-8 text-purple-600" />
              </div>
              <h3 class="font-semibold text-gray-900 mb-1">Connect</h3>
              <p class="text-sm text-gray-600">Follow friends and discover new people</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useAuthStore } from '../../stores/auth'
import { useIcons } from '../../composables/useIcons'

const router = useRouter()
const authStore = useAuthStore()
const { icons } = useIcons()

const handleLogout = async () => {
  try {
    await authStore.logout()
    router.push('/login')
  } catch (error) {
    console.error('Logout error:', error)
    // Force logout on client side even if API call fails
    authStore.logout()
    router.push('/login')
  }
}
</script>

<style scoped>
/* Additional custom styles for the home page */
</style>
