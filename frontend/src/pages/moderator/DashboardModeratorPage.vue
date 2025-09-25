<template>
  <div class="moderator-dashboard">
    <!-- Header -->
    <header class="dashboard-header">
      <div class="header-content">
        <div class="logo-section">
          <div class="logo-icon">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" fill="url(#logoGradient)"/>
              <defs>
                <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" style="stop-color:#8b5cf6"/>
                  <stop offset="50%" style="stop-color:#7c3aed"/>
                  <stop offset="100%" style="stop-color:#6d28d9"/>
                </linearGradient>
              </defs>
            </svg>
          </div>
          <h1 class="logo-text">InstaVibe Moderator</h1>
        </div>

        <div class="header-actions">
          <div class="user-info">
            <span class="user-role">Moderator</span>
            <button @click="handleLogout" class="logout-btn">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              Logout
            </button>
          </div>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <div class="main-content">
      <!-- Navigation Sidebar -->
      <nav class="moderator-sidebar">
        <div class="nav-section">
          <h3 class="nav-title">Dashboard</h3>
          <ul class="nav-list">
            <li class="nav-item active">
              <a href="#" class="nav-link">
                <svg class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <rect x="3" y="3" width="7" height="7"/>
                  <rect x="14" y="3" width="7" height="7"/>
                  <rect x="14" y="14" width="7" height="7"/>
                  <rect x="3" y="14" width="7" height="7"/>
                </svg>
                Overview
              </a>
            </li>
          </ul>
        </div>

        <div class="nav-section">
          <h3 class="nav-title">Content Moderation</h3>
          <ul class="nav-list">
            <li class="nav-item">
              <a href="#" class="nav-link">
                <svg class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                </svg>
                Reports Queue
                <span class="notification-badge">42</span>
              </a>
            </li>
            <li class="nav-item">
              <a href="#" class="nav-link">
                <svg class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                  <circle cx="8.5" cy="8.5" r="1.5"/>
                  <polyline points="21,15 16,10 5,21"/>
                </svg>
                Flagged Posts
              </a>
            </li>
            <li class="nav-item">
              <a href="#" class="nav-link">
                <svg class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                  <path d="M13 8l-3 3 3 3"/>
                </svg>
                Comments
              </a>
            </li>
          </ul>
        </div>

        <div class="nav-section">
          <h3 class="nav-title">User Management</h3>
          <ul class="nav-list">
            <li class="nav-item">
              <a href="#" class="nav-link">
                <svg class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                  <circle cx="9" cy="7" r="4"/>
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                </svg>
                Suspended Users
              </a>
            </li>
            <li class="nav-item">
              <a href="#" class="nav-link">
                <svg class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <circle cx="12" cy="12" r="10"/>
                  <line x1="4.93" y1="4.93" x2="19.07" y2="19.07"/>
                </svg>
                Banned Users
              </a>
            </li>
          </ul>
        </div>

        <div class="nav-section">
          <h3 class="nav-title">Tools</h3>
          <ul class="nav-list">
            <li class="nav-item">
              <a href="#" class="nav-link">
                <svg class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <circle cx="11" cy="11" r="8"/>
                  <path d="M21 21l-4.35-4.35"/>
                </svg>
                Search Users
              </a>
            </li>
            <li class="nav-item">
              <a href="#" class="nav-link">
                <svg class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                  <polyline points="14,2 14,8 20,8"/>
                  <line x1="16" y1="13" x2="8" y2="13"/>
                  <line x1="16" y1="17" x2="8" y2="17"/>
                  <polyline points="10,9 9,9 8,9"/>
                </svg>
                Activity Log
              </a>
            </li>
          </ul>
        </div>
      </nav>

      <!-- Dashboard Content -->
      <div class="dashboard-content">
        <!-- Quick Actions -->
        <div class="quick-actions">
          <h2 class="section-title">Quick Actions</h2>
          <div class="action-buttons">
            <button class="action-btn priority">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
                <line x1="12" y1="9" x2="12" y2="13"/>
                <line x1="12" y1="17" x2="12.01" y2="17"/>
              </svg>
              Review Priority Reports
            </button>
            <button class="action-btn">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                <circle cx="8.5" cy="8.5" r="1.5"/>
                <polyline points="21,15 16,10 5,21"/>
              </svg>
              Moderate Posts
            </button>
            <button class="action-btn">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <circle cx="11" cy="11" r="8"/>
                <path d="M21 21l-4.35-4.35"/>
              </svg>
              Search Content
            </button>
          </div>
        </div>

        <!-- Stats Cards -->
        <div class="stats-grid">
          <div class="stat-card">
            <div class="stat-icon reports">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
              </svg>
            </div>
            <div class="stat-content">
              <div class="stat-number">42</div>
              <div class="stat-label">Pending Reports</div>
              <div class="stat-change urgent">+5 today</div>
            </div>
          </div>

          <div class="stat-card">
            <div class="stat-icon posts">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                <circle cx="8.5" cy="8.5" r="1.5"/>
                <polyline points="21,15 16,10 5,21"/>
              </svg>
            </div>
            <div class="stat-content">
              <div class="stat-number">127</div>
              <div class="stat-label">Posts Reviewed Today</div>
              <div class="stat-change positive">+23</div>
            </div>
          </div>

          <div class="stat-card">
            <div class="stat-icon actions">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <polyline points="9,11 12,14 22,4"/>
                <path d="M21,12v7a2,2 0 0,1-2,2H5a2,2 0 0,1-2-2V5a2,2 0 0,1,2-2h11"/>
              </svg>
            </div>
            <div class="stat-content">
              <div class="stat-number">89</div>
              <div class="stat-label">Actions Taken</div>
              <div class="stat-change positive">+12</div>
            </div>
          </div>

          <div class="stat-card">
            <div class="stat-icon users">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <circle cx="12" cy="12" r="10"/>
                <line x1="4.93" y1="4.93" x2="19.07" y2="19.07"/>
              </svg>
            </div>
            <div class="stat-content">
              <div class="stat-number">15</div>
              <div class="stat-label">Users Suspended</div>
              <div class="stat-change negative">+3</div>
            </div>
          </div>
        </div>

        <!-- Pending Reports -->
        <div class="reports-section">
          <div class="section-header">
            <h2 class="section-title">Pending Reports</h2>
            <button class="view-all-btn">View All</button>
          </div>
          <div class="reports-list">
            <div class="report-item urgent">
              <div class="report-header">
                <div class="report-type">Harassment</div>
                <div class="report-priority">High Priority</div>
                <div class="report-time">5 min ago</div>
              </div>
              <div class="report-content">
                <div class="report-description">User @toxic_user sending threatening messages</div>
                <div class="report-details">
                  <span class="reporter">Reported by: @concerned_user</span>
                  <span class="post-id">Post ID: #5432</span>
                </div>
              </div>
              <div class="report-actions">
                <button class="action-btn-sm approve">Take Action</button>
                <button class="action-btn-sm dismiss">Dismiss</button>
                <button class="action-btn-sm details">Details</button>
              </div>
            </div>

            <div class="report-item">
              <div class="report-header">
                <div class="report-type">Spam</div>
                <div class="report-priority">Medium Priority</div>
                <div class="report-time">15 min ago</div>
              </div>
              <div class="report-content">
                <div class="report-description">Multiple reports of spam content from same user</div>
                <div class="report-details">
                  <span class="reporter">Multiple reporters</span>
                  <span class="post-id">User ID: #1234</span>
                </div>
              </div>
              <div class="report-actions">
                <button class="action-btn-sm approve">Take Action</button>
                <button class="action-btn-sm dismiss">Dismiss</button>
                <button class="action-btn-sm details">Details</button>
              </div>
            </div>

            <div class="report-item">
              <div class="report-header">
                <div class="report-type">Inappropriate Content</div>
                <div class="report-priority">Low Priority</div>
                <div class="report-time">1 hour ago</div>
              </div>
              <div class="report-content">
                <div class="report-description">Content may violate community guidelines</div>
                <div class="report-details">
                  <span class="reporter">Reported by: @community_guard</span>
                  <span class="post-id">Post ID: #7890</span>
                </div>
              </div>
              <div class="report-actions">
                <button class="action-btn-sm approve">Take Action</button>
                <button class="action-btn-sm dismiss">Dismiss</button>
                <button class="action-btn-sm details">Details</button>
              </div>
            </div>
          </div>
        </div>

        <!-- Recent Activity -->
        <div class="activity-section">
          <h2 class="section-title">Your Recent Activity</h2>
          <div class="activity-list">
            <div class="activity-item">
              <div class="activity-icon approved">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <polyline points="9,11 12,14 22,4"/>
                </svg>
              </div>
              <div class="activity-content">
                <div class="activity-title">Post approved</div>
                <div class="activity-description">Post #8765 was approved after review</div>
                <div class="activity-time">10 minutes ago</div>
              </div>
            </div>

            <div class="activity-item">
              <div class="activity-icon removed">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <circle cx="12" cy="12" r="10"/>
                  <line x1="15" y1="9" x2="9" y2="15"/>
                  <line x1="9" y1="9" x2="15" y2="15"/>
                </svg>
              </div>
              <div class="activity-content">
                <div class="activity-title">Content removed</div>
                <div class="activity-description">Removed post #4321 for violating guidelines</div>
                <div class="activity-time">25 minutes ago</div>
              </div>
            </div>

            <div class="activity-item">
              <div class="activity-icon warning">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
                  <line x1="12" y1="9" x2="12" y2="13"/>
                  <line x1="12" y1="17" x2="12.01" y2="17"/>
                </svg>
              </div>
              <div class="activity-content">
                <div class="activity-title">User warned</div>
                <div class="activity-description">Issued warning to @problem_user for inappropriate behavior</div>
                <div class="activity-time">1 hour ago</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useRouter } from 'vue-router'

export default {
  name: 'DashboardModeratorPage',
  setup() {
    const router = useRouter()

    const handleLogout = () => {
      localStorage.removeItem('token')
      router.push('/login')
    }

    return {
      handleLogout
    }
  }
}
</script>

<style scoped>
.moderator-dashboard {
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.dashboard-header {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  padding: 1rem 2rem;
  position: sticky;
  top: 0;
  z-index: 100;
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1400px;
  margin: 0 auto;
}

.logo-section {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.logo-icon {
  width: 2.5rem;
  height: 2.5rem;
}

.logo-text {
  font-size: 1.5rem;
  font-weight: 700;
  background: linear-gradient(135deg, #8b5cf6, #6d28d9);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin: 0;
}

.header-actions {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.user-role {
  background: linear-gradient(135deg, #8b5cf6, #6d28d9);
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 2rem;
  font-size: 0.875rem;
  font-weight: 600;
}

.logout-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: transparent;
  border: 2px solid #8b5cf6;
  color: #8b5cf6;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.logout-btn:hover {
  background: #8b5cf6;
  color: white;
}

.logout-btn svg {
  width: 1rem;
  height: 1rem;
}

.main-content {
  display: flex;
  max-width: 1400px;
  margin: 0 auto;
  gap: 2rem;
  padding: 2rem;
}

.moderator-sidebar {
  width: 280px;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 1rem;
  padding: 1.5rem;
  height: fit-content;
  position: sticky;
  top: 6rem;
}

.nav-section {
  margin-bottom: 2rem;
}

.nav-section:last-child {
  margin-bottom: 0;
}

.nav-title {
  font-size: 0.875rem;
  font-weight: 700;
  color: #6b7280;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: 0.75rem;
}

.nav-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.nav-item {
  margin-bottom: 0.25rem;
}

.nav-link {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem;
  border-radius: 0.5rem;
  color: #6b7280;
  text-decoration: none;
  transition: all 0.3s ease;
  position: relative;
}

.nav-link:hover,
.nav-item.active .nav-link {
  background: linear-gradient(135deg, #8b5cf6, #6d28d9);
  color: white;
}

.nav-icon {
  width: 1.25rem;
  height: 1.25rem;
  stroke-width: 2;
}

.notification-badge {
  background: #ef4444;
  color: white;
  font-size: 0.75rem;
  font-weight: 600;
  padding: 0.125rem 0.5rem;
  border-radius: 1rem;
  margin-left: auto;
}

.dashboard-content {
  flex: 1;
}

.quick-actions {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 1rem;
  padding: 1.5rem;
  margin-bottom: 2rem;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.section-title {
  font-size: 1.25rem;
  font-weight: 700;
  color: #1f2937;
  margin-bottom: 1rem;
}

.action-buttons {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.action-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: linear-gradient(135deg, #8b5cf6, #6d28d9);
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 0.5rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.action-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 20px rgba(139, 92, 246, 0.3);
}

.action-btn.priority {
  background: linear-gradient(135deg, #ef4444, #dc2626);
}

.action-btn.priority:hover {
  box-shadow: 0 10px 20px rgba(239, 68, 68, 0.3);
}

.action-btn svg {
  width: 1.25rem;
  height: 1.25rem;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.stat-card {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 1rem;
  padding: 1.5rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.stat-icon {
  width: 3rem;
  height: 3rem;
  border-radius: 0.75rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.stat-icon svg {
  width: 1.5rem;
  height: 1.5rem;
  stroke-width: 2;
}

.stat-icon.reports {
  background: linear-gradient(135deg, #ef4444, #dc2626);
  color: white;
}

.stat-icon.posts {
  background: linear-gradient(135deg, #10b981, #059669);
  color: white;
}

.stat-icon.actions {
  background: linear-gradient(135deg, #3b82f6, #1d4ed8);
  color: white;
}

.stat-icon.users {
  background: linear-gradient(135deg, #f59e0b, #d97706);
  color: white;
}

.stat-content {
  flex: 1;
}

.stat-number {
  font-size: 2rem;
  font-weight: 700;
  color: #1f2937;
  line-height: 1;
}

.stat-label {
  color: #6b7280;
  font-size: 0.875rem;
  margin: 0.25rem 0;
}

.stat-change {
  font-size: 0.875rem;
  font-weight: 600;
}

.stat-change.positive {
  color: #10b981;
}

.stat-change.negative {
  color: #ef4444;
}

.stat-change.urgent {
  color: #ef4444;
  font-weight: 700;
}

.reports-section {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 1rem;
  padding: 1.5rem;
  margin-bottom: 2rem;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.view-all-btn {
  background: transparent;
  border: 2px solid #8b5cf6;
  color: #8b5cf6;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.view-all-btn:hover {
  background: #8b5cf6;
  color: white;
}

.reports-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.report-item {
  background: rgba(249, 250, 251, 0.5);
  border-radius: 0.75rem;
  padding: 1.5rem;
  border-left: 4px solid #6b7280;
}

.report-item.urgent {
  border-left-color: #ef4444;
  background: rgba(254, 242, 242, 0.8);
}

.report-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
}

.report-type {
  background: #8b5cf6;
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: 1rem;
  font-size: 0.875rem;
  font-weight: 600;
}

.report-priority {
  color: #6b7280;
  font-size: 0.875rem;
}

.report-priority:before {
  content: "•";
  margin-right: 0.5rem;
}

.report-time {
  color: #9ca3af;
  font-size: 0.875rem;
  margin-left: auto;
}

.report-content {
  margin-bottom: 1rem;
}

.report-description {
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 0.5rem;
}

.report-details {
  display: flex;
  gap: 1rem;
  color: #6b7280;
  font-size: 0.875rem;
}

.report-actions {
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
}

.action-btn-sm {
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  border: none;
}

.action-btn-sm.approve {
  background: #10b981;
  color: white;
}

.action-btn-sm.approve:hover {
  background: #059669;
}

.action-btn-sm.dismiss {
  background: #6b7280;
  color: white;
}

.action-btn-sm.dismiss:hover {
  background: #4b5563;
}

.action-btn-sm.details {
  background: transparent;
  border: 2px solid #8b5cf6;
  color: #8b5cf6;
}

.action-btn-sm.details:hover {
  background: #8b5cf6;
  color: white;
}

.activity-section {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 1rem;
  padding: 1.5rem;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.activity-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.activity-item {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  padding: 1rem;
  background: rgba(249, 250, 251, 0.5);
  border-radius: 0.75rem;
}

.activity-icon {
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.activity-icon svg {
  width: 1.25rem;
  height: 1.25rem;
  color: white;
  stroke-width: 2;
}

.activity-icon.approved {
  background: linear-gradient(135deg, #10b981, #059669);
}

.activity-icon.removed {
  background: linear-gradient(135deg, #ef4444, #dc2626);
}

.activity-icon.warning {
  background: linear-gradient(135deg, #f59e0b, #d97706);
}

.activity-content {
  flex: 1;
}

.activity-title {
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 0.25rem;
}

.activity-description {
  color: #6b7280;
  font-size: 0.875rem;
  margin-bottom: 0.5rem;
}

.activity-time {
  color: #9ca3af;
  font-size: 0.75rem;
}

@media (max-width: 1024px) {
  .main-content {
    flex-direction: column;
  }

  .moderator-sidebar {
    width: 100%;
    position: static;
  }
}

@media (max-width: 768px) {
  .header-content {
    padding: 0 1rem;
  }

  .main-content {
    padding: 1rem;
  }

  .stats-grid {
    grid-template-columns: 1fr;
  }

  .action-buttons {
    flex-direction: column;
  }

  .section-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }

  .report-details {
    flex-direction: column;
    gap: 0.5rem;
  }

  .user-role {
    display: none;
  }
}
</style>
