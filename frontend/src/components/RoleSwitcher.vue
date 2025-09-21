<template>
  <div class="role-switcher">
    <div class="switcher-header">
      <h3>Demo: Switch Role</h3>
      <p>Current Role: <span class="current-role">{{ currentRole }}</span></p>
    </div>

    <div class="role-buttons">
      <button
        @click="switchRole('user')"
        :class="{ active: currentRole === 'user' }"
        class="role-btn user"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
          <circle cx="12" cy="7" r="4"/>
        </svg>
        User
      </button>

      <button
        @click="switchRole('moderator')"
        :class="{ active: currentRole === 'moderator' }"
        class="role-btn moderator"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
        </svg>
        Moderator
      </button>

      <button
        @click="switchRole('admin')"
        :class="{ active: currentRole === 'admin' }"
        class="role-btn admin"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <circle cx="12" cy="12" r="3"/>
          <path d="M12 1v6m0 6v6m11-7h-6m-6 0H1"/>
        </svg>
        Admin
      </button>
    </div>

    <div class="switcher-note">
      <p>🔧 This component is for demonstration purposes. Click a role to see different dashboards.</p>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { getUserRole, setDemoRole, getRoleDisplayName } from '../utils/roleUtils.js'

export default {
  name: 'RoleSwitcher',
  setup() {
    const currentRole = ref('user')

    const updateCurrentRole = () => {
      currentRole.value = getUserRole()
    }

    const switchRole = (role) => {
      if (role !== currentRole.value) {
        setDemoRole(role)
        // The setDemoRole function will reload the page automatically
      }
    }

    onMounted(() => {
      updateCurrentRole()
    })

    return {
      currentRole,
      switchRole,
      getRoleDisplayName
    }
  }
}
</script>

<style scoped>
.role-switcher {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 1rem;
  padding: 1.5rem;
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;
}

.switcher-header {
  text-align: center;
  margin-bottom: 1.5rem;
}

.switcher-header h3 {
  color: #1f2937;
  font-size: 1.125rem;
  font-weight: 700;
  margin: 0 0 0.5rem 0;
}

.switcher-header p {
  color: #6b7280;
  font-size: 0.875rem;
  margin: 0;
}

.current-role {
  background: linear-gradient(135deg, #667eea, #764ba2);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-weight: 600;
  text-transform: capitalize;
}

.role-buttons {
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin-bottom: 1rem;
}

.role-btn {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem;
  border: 2px solid transparent;
  border-radius: 0.75rem;
  background: rgba(249, 250, 251, 0.8);
  color: #6b7280;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  min-width: 80px;
}

.role-btn svg {
  width: 1.5rem;
  height: 1.5rem;
  stroke-width: 2;
}

.role-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
}

.role-btn.user.active,
.role-btn.user:hover {
  border-color: #3b82f6;
  background: linear-gradient(135deg, #3b82f6, #1d4ed8);
  color: white;
}

.role-btn.moderator.active,
.role-btn.moderator:hover {
  border-color: #8b5cf6;
  background: linear-gradient(135deg, #8b5cf6, #7c3aed);
  color: white;
}

.role-btn.admin.active,
.role-btn.admin:hover {
  border-color: #dc2626;
  background: linear-gradient(135deg, #dc2626, #b91c1c);
  color: white;
}

.switcher-note {
  text-align: center;
  padding-top: 1rem;
  border-top: 1px solid rgba(229, 231, 235, 0.8);
}

.switcher-note p {
  color: #6b7280;
  font-size: 0.75rem;
  margin: 0;
  font-style: italic;
}

@media (max-width: 640px) {
  .role-buttons {
    flex-direction: column;
    align-items: center;
  }

  .role-btn {
    width: 100%;
    max-width: 200px;
    flex-direction: row;
    justify-content: center;
  }
}
</style>
