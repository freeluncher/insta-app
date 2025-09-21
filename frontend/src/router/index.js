import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import LoginPage from '../pages/auth/LoginPage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // Auth routes
    {
      path: '/login',
      name: 'Login',
      component: LoginPage,
      meta: { requiresAuth: false }
    },
    {
      path: '/register',
      name: 'Register',
      component: () => import('../pages/auth/RegisterPage.vue'),
      meta: { requiresAuth: false }
    },

    // Default redirects
    {
      path: '/',
      redirect: '/user/dashboard'
    },

    // User routes
    {
      path: '/user/dashboard',
      name: 'UserDashboard',
      component: () => import('../pages/user/DashboardUserPage.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/user/home',
      name: 'UserHome',
      component: () => import('../pages/user/HomePage.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/user/profile/:id?',
      name: 'UserProfile',
      component: () => import('../pages/user/ProfilePage.vue'),
      meta: { requiresAuth: true }
    },

    // Admin routes (kept for future use)
    {
      path: '/admin/dashboard',
      name: 'AdminDashboard',
      component: () => import('../pages/admin/DashboardAdminPage.vue'),
      meta: { requiresAuth: true }
    },

    // Moderator routes (kept for future use)
    {
      path: '/moderator/dashboard',
      name: 'ModeratorDashboard',
      component: () => import('../pages/moderator/DashboardModeratorPage.vue'),
      meta: { requiresAuth: true }
    },

    // Legacy redirect for backward compatibility
    {
      path: '/dashboard',
      redirect: '/user/dashboard'
    },

    // Catch-all route
    {
      path: '/:pathMatch(.*)*',
      redirect: '/login'
    }
  ],
})

// Authentication guard
router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore()
  const isAuthenticated = authStore.isAuthenticated

  // Wait for auth initialization if coming from a fresh page load
  if (isAuthenticated && !authStore.user) {
    try {
      await authStore.fetchUser()
    } catch {
      // If user fetch fails, treat as unauthenticated
      await authStore.logout()
    }
  }

  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    // User is not authenticated, redirect to login
    next('/login')
  } else if (!to.meta.requiresAuth && authStore.isAuthenticated && (to.name === 'Login' || to.name === 'Register')) {
    // User is authenticated and trying to access auth pages, redirect to dashboard
    next('/user/dashboard')
  } else {
    // Allow navigation
    next()
  }
})

export default router
