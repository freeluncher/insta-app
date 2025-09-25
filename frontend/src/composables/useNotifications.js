import { ref } from 'vue'

/**
 * Simple notification system for the app
 * Provides toast-like notifications for user feedback
 */
const notifications = ref([])
const notificationId = ref(0)

export function useNotifications() {

  const addNotification = (message, type = 'info', duration = 5000) => {
    const id = ++notificationId.value
    const notification = {
      id,
      message,
      type, // 'success', 'error', 'warning', 'info'
      timestamp: Date.now()
    }

    notifications.value.push(notification)

    // Auto remove after duration
    if (duration > 0) {
      setTimeout(() => {
        removeNotification(id)
      }, duration)
    }

    return id
  }

  const removeNotification = (id) => {
    const index = notifications.value.findIndex(n => n.id === id)
    if (index > -1) {
      notifications.value.splice(index, 1)
    }
  }

  const clearAll = () => {
    notifications.value = []
  }

  // Convenient methods for different types
  const showSuccess = (message, duration) => addNotification(message, 'success', duration)
  const showError = (message, duration) => addNotification(message, 'error', duration)
  const showWarning = (message, duration) => addNotification(message, 'warning', duration)
  const showInfo = (message, duration) => addNotification(message, 'info', duration)

  return {
    notifications: notifications.value,
    addNotification,
    removeNotification,
    clearAll,
    showSuccess,
    showError,
    showWarning,
    showInfo
  }
}
