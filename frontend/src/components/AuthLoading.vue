<template>
  <div class="auth-loading">
    <div class="loading-container">
      <div class="logo-container">
        <InstagramLogo class="logo" />
        <h1 class="app-name">InstaVibe</h1>
      </div>

      <div class="loading-animation">
        <div class="spinner"></div>
        <p class="loading-text">{{ message }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import InstagramLogo from './icons/InstagramLogo.vue'

export default {
  name: 'AuthLoading',
  components: {
    InstagramLogo
  },
  props: {
    message: {
      type: String,
      default: 'Loading...'
    }
  }
}
</script>

<style scoped>
.auth-loading {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
}

.loading-container {
  text-align: center;
  animation: fadeIn 0.5s ease-out;
}

.logo-container {
  margin-bottom: 2rem;
}

.logo {
  width: 80px;
  height: 80px;
  margin: 0 auto 1rem;
  animation: pulse 2s ease-in-out infinite;
}

.app-name {
  font-family: 'Dancing Script', cursive;
  font-size: 2.5rem;
  font-weight: 700;
  color: white;
  margin: 0;
  text-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
}

.loading-animation {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.spinner {
  width: 40px;
  height: 40px;
  border: 4px solid rgba(255, 255, 255, 0.3);
  border-top: 4px solid white;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

.loading-text {
  color: rgba(255, 255, 255, 0.9);
  font-size: 1rem;
  margin: 0;
  font-weight: 500;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

@keyframes pulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.05); }
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>
