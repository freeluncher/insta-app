import { createRouter, createWebHistory } from 'vue-router'
import LoginPage from '../pages/auth/LoginPage.vue'
import { getUserRole as getRoleFromUtils, getDashboardRoute } from '../utils/roleUtils.js'

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
      meta: { requiresAuth: true, role: 'user' }
    },
    {
      path: '/user/home',
      name: 'UserHome',
      component: () => import('../pages/user/HomePage.vue'),
      meta: { requiresAuth: true, role: 'user' }
    },

    // Admin routes
    {
      path: '/admin/dashboard',
      name: 'AdminDashboard',
      component: () => import('../pages/admin/DashboardAdminPage.vue'),
      meta: { requiresAuth: true, role: 'admin' }
    },

    // Moderator routes
    {
      path: '/moderator/dashboard',
      name: 'ModeratorDashboard',
      component: () => import('../pages/moderator/DashboardModeratorPage.vue'),
      meta: { requiresAuth: true, role: 'moderator' }
    },

    // Legacy redirect for backward compatibility
    {
      path: '/dashboard',
      redirect: () => {
        const userRole = getRoleFromUtils()
        return getDashboardRoute(userRole)
      }
    },

    // Catch-all route
    {
      path: '/:pathMatch(.*)*',
      redirect: '/login'
    }
  ],
})

// Authentication and role-based guard
router.beforeEach((to, from, next) => {
  const isAuthenticated = !!localStorage.getItem('token')
  const userRole = getRoleFromUtils()

  if (to.meta.requiresAuth && !isAuthenticated) {
    // User is not authenticated, redirect to login
    next('/login')
  } else if (!to.meta.requiresAuth && isAuthenticated && (to.name === 'Login' || to.name === 'Register')) {
    // User is authenticated and trying to access auth pages, redirect based on role
    next(getDashboardRoute(userRole))
  } else if (to.meta.role && to.meta.role !== userRole) {
    // User doesn't have the required role, redirect to appropriate dashboard
    next(getDashboardRoute(userRole))
  } else {
    // Allow navigation
    next()
  }
})

export default router
