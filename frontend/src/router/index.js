import { createRouter, createWebHistory } from 'vue-router'
import LoginPage from '../pages/LoginPage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: LoginPage,
      meta: { requiresAuth: false }
    },
    {
      path: '/',
      name: 'Home',
      component: () => import('../pages/HomePage.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/register',
      name: 'Register',
      component: () => import('../pages/RegisterPage.vue'),
      meta: { requiresAuth: false }
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: '/login'
    }
  ],
})

// Authentication guard
router.beforeEach((to, from, next) => {
  const isAuthenticated = !!localStorage.getItem('token')

  if (to.meta.requiresAuth && !isAuthenticated) {
    // User is not authenticated, redirect to login
    next('/login')
  } else if (!to.meta.requiresAuth && isAuthenticated && to.name !== 'Login') {
    // User is authenticated and trying to access auth pages, redirect to home
    next('/')
  } else {
    // Allow navigation
    next()
  }
})

export default router
