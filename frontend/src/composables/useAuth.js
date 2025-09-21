import { computed } from 'vue'
import { useAuthStore } from '../stores/auth'

/**
 * Authorization composable for handling permissions
 * Provides helper functions to check user permissions for posts, comments, and likes
 */
export function useAuth() {
  const authStore = useAuthStore()

  // Check if current user can edit/delete a post
  const canModifyPost = computed(() => (post) => {
    if (!authStore.user || !post) return false
    return authStore.user.id === post.user_id
  })

  // Check if current user can delete a comment
  const canDeleteComment = computed(() => (comment, post) => {
    if (!authStore.user || !comment) return false

    // Comment owner OR post owner can delete comment
    return authStore.user.id === comment.user_id ||
           (post && authStore.user.id === post.user_id)
  })

  // Check if current user can modify a comment
  const canModifyComment = computed(() => (comment) => {
    if (!authStore.user || !comment) return false
    return authStore.user.id === comment.user_id
  })

  // Check if current user can interact with posts (like, comment)
  const canInteractWithPost = computed(() => () => {
    if (!authStore.user) return false
    // All authenticated users can like and comment
    return true
  })

  // Check if current user owns a resource
  const isOwner = computed(() => (resourceUserId) => {
    if (!authStore.user || !resourceUserId) return false
    return authStore.user.id === resourceUserId
  })

  // Handle authorization errors from API
  const handleAuthError = (error) => {
    if (error.response?.status === 403) {
      // Show user-friendly message for forbidden actions
      return {
        message: 'You do not have permission to perform this action.',
        type: 'authorization'
      }
    } else if (error.response?.status === 401) {
      // Handle unauthorized (token expired, etc.)
      authStore.logout()
      return {
        message: 'Your session has expired. Please log in again.',
        type: 'authentication'
      }
    } else if (error.response?.status === 404) {
      return {
        message: 'The requested resource was not found.',
        type: 'notfound'
      }
    } else {
      return {
        message: error.response?.data?.message || 'An error occurred. Please try again.',
        type: 'general'
      }
    }
  }

  // Get current user info
  const currentUser = computed(() => authStore.user)
  const isAuthenticated = computed(() => authStore.isAuthenticated)

  return {
    // Computed properties for permissions
    canModifyPost,
    canDeleteComment,
    canModifyComment,
    canInteractWithPost,
    isOwner,

    // User info
    currentUser,
    isAuthenticated,

    // Error handling
    handleAuthError,

    // Direct access to auth store if needed
    authStore
  }
}
