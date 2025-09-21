// Role management utilities
export const ROLES = {
  USER: 'user',
  MODERATOR: 'moderator',
  ADMIN: 'admin'
}

// Get current user role from localStorage
export function getUserRole() {
  return localStorage.getItem('userRole') || ROLES.USER
}

// Set user role in localStorage
export function setUserRole(role) {
  if (Object.values(ROLES).includes(role)) {
    localStorage.setItem('userRole', role)
    return true
  }
  return false
}

// Check if user has specific role
export function hasRole(role) {
  return getUserRole() === role
}

// Check if user has at least the specified role level
export function hasMinimumRole(role) {
  const userRole = getUserRole()
  const roleHierarchy = {
    [ROLES.USER]: 1,
    [ROLES.MODERATOR]: 2,
    [ROLES.ADMIN]: 3
  }

  return roleHierarchy[userRole] >= roleHierarchy[role]
}

// Get dashboard route for user role
export function getDashboardRoute(role = null) {
  const userRole = role || getUserRole()

  switch(userRole) {
    case ROLES.ADMIN:
      return '/admin/dashboard'
    case ROLES.MODERATOR:
      return '/moderator/dashboard'
    default:
      return '/user/dashboard'
  }
}

// Get role display name
export function getRoleDisplayName(role = null) {
  const userRole = role || getUserRole()

  switch(userRole) {
    case ROLES.ADMIN:
      return 'Administrator'
    case ROLES.MODERATOR:
      return 'Moderator'
    default:
      return 'User'
  }
}

// For demonstration purposes - set different roles
export function setDemoRole(role) {
  if (setUserRole(role)) {
    console.log(`Demo: Role set to ${role}`)
    // Reload the page to apply new role
    window.location.reload()
  }
}
