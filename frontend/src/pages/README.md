# Pages Structure

This project uses a role-based page organization structure to separate different user interfaces based on authentication status and user roles.

## Folder Structure

```
src/pages/
├── auth/           # Authentication pages (no login required)
│   ├── LoginPage.vue
│   └── RegisterPage.vue
├── user/           # Regular user pages (user role required)
│   ├── DashboardUserPage.vue
│   └── HomePage.vue
├── admin/          # Administrator pages (admin role required)
│   └── DashboardAdminPage.vue
└── moderator/      # Moderator pages (moderator role required)
    └── DashboardModeratorPage.vue
```

## Role-Based Routing

The application implements role-based routing with the following features:

### Routes

- **Auth Routes**: `/login`, `/register`
  - Accessible when not authenticated
  - Redirect authenticated users to role-appropriate dashboard

- **User Routes**: `/user/*`
  - Require authentication and 'user' role
  - Default role for new registrations

- **Admin Routes**: `/admin/*`
  - Require authentication and 'admin' role
  - Full system administration access

- **Moderator Routes**: `/moderator/*`
  - Require authentication and 'moderator' role
  - Content moderation and user management

### Route Guards

The router implements automatic role-based redirects:

1. **Authentication Check**: Unauthenticated users are redirected to login
2. **Role Validation**: Users are redirected to their role-appropriate dashboard if they try to access unauthorized areas
3. **Default Redirects**: Legacy `/dashboard` route redirects based on user role

## Role Management

### Setting User Roles

For testing and demonstration purposes, you can set user roles using:

```javascript
import { setDemoRole } from '@/utils/roleUtils.js'

// Set role (will reload page automatically)
setDemoRole('admin')    // Sets admin role
setDemoRole('moderator') // Sets moderator role
setDemoRole('user')     // Sets user role (default)
```

### Role Utilities

The `roleUtils.js` file provides helper functions:

- `getUserRole()` - Get current user role
- `setUserRole(role)` - Set user role
- `hasRole(role)` - Check if user has specific role
- `hasMinimumRole(role)` - Check role hierarchy
- `getDashboardRoute(role)` - Get dashboard URL for role
- `getRoleDisplayName(role)` - Get display name for role

## Role Switcher Component

Each dashboard includes a `RoleSwitcher` component for easy testing:

- Click different role buttons to switch between roles
- Page automatically reloads with new role applied
- Demonstrates role-based routing and access control

## Dashboard Features

### User Dashboard (`/user/dashboard`)
- Instagram-like interface with stories and posts
- Social media functionality
- Bottom navigation bar
- Responsive design

### Admin Dashboard (`/admin/dashboard`)
- User management interface
- System administration tools
- Content management
- Analytics and statistics
- Activity monitoring

### Moderator Dashboard (`/moderator/dashboard`)
- Content moderation tools
- Report queue management
- User suspension/warning tools
- Priority-based task management
- Activity logging

## Authentication Flow

1. User visits the application
2. If not authenticated, redirected to `/login`
3. After successful login, redirected to role-appropriate dashboard:
   - Admin users → `/admin/dashboard`
   - Moderator users → `/moderator/dashboard`
   - Regular users → `/user/dashboard`
4. Role is stored in localStorage as 'userRole'
5. Router guards enforce role-based access control

## Adding New Pages

To add new pages for a specific role:

1. Create the page in the appropriate folder (`auth/`, `user/`, `admin/`, `moderator/`)
2. Add the route to `router/index.js` with appropriate `meta.role`
3. Import and register any new components
4. Update navigation if needed

Example:
```javascript
{
  path: '/admin/users',
  name: 'AdminUsers',
  component: () => import('../pages/admin/UserManagementPage.vue'),
  meta: { requiresAuth: true, role: 'admin' }
}
```

## Security Notes

- This implementation is for demonstration purposes
- In production, role validation should also be enforced on the backend
- JWT tokens should include role information
- API endpoints should validate user roles server-side
- Consider implementing role hierarchies and permissions