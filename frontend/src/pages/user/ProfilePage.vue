<template>
  <div class="profile-container">
    <!-- Loading State -->
    <div v-if="loading" class="loading-container">
      <div class="loading-spinner"></div>
      <p>Loading profile...</p>
    </div>

    <!-- Profile Content -->
    <div v-else>
      <!-- Header -->
      <header class="profile-header">
        <div class="header-content">
          <div class="header-left">
            <button class="back-btn" @click="goBack">
              <component :is="icons.ArrowLeftIcon" class="w-6 h-6" />
            </button>
            <h1 class="username-title">{{ userProfile.username || 'Profile' }}</h1>
          </div>

          <div class="header-actions">
            <button class="action-btn" @click="toggleMenu">
              <component :is="icons.EllipsisHorizontalIcon" class="w-6 h-6" />
            </button>
          </div>
        </div>
      </header>

    <!-- Profile Info Section -->
    <section class="profile-info">
      <div class="profile-main">
        <!-- Avatar -->
        <div class="avatar-section">
          <div class="avatar-container">
            <img
              :src="userProfile.avatar"
              :alt="userProfile.username || 'User'"
              class="profile-avatar"
            />
            <button v-if="isOwnProfile" class="edit-avatar-btn" @click="editAvatar">
              <component :is="icons.CameraIcon" class="w-4 h-4" />
            </button>
          </div>
        </div>

        <!-- Stats & Actions -->
        <div class="profile-stats">
          <div class="stats-grid">
            <div class="stat-item">
              <span class="stat-number">{{ userProfile.postsCount }}</span>
              <span class="stat-label">posts</span>
            </div>
            <div class="stat-item" @click="showFollowers">
              <span class="stat-number">{{ formatNumber(userProfile.followersCount) }}</span>
              <span class="stat-label">followers</span>
            </div>
            <div class="stat-item" @click="showFollowing">
              <span class="stat-number">{{ formatNumber(userProfile.followingCount) }}</span>
              <span class="stat-label">following</span>
            </div>
          </div>

          <!-- Action Buttons -->
          <div class="action-buttons">
            <button
              v-if="isOwnProfile"
              class="btn btn-secondary"
              @click="editProfile"
            >
              Edit Profile
            </button>
            <button
              v-if="isOwnProfile"
              class="btn btn-secondary"
              @click="shareProfile"
            >
              Share Profile
            </button>

            <template v-if="!isOwnProfile">
              <button
                class="btn"
                :class="userProfile.isFollowing ? 'btn-secondary' : 'btn-primary'"
                @click="toggleFollow"
              >
                {{ userProfile.isFollowing ? 'Following' : 'Follow' }}
              </button>
              <button class="btn btn-secondary" @click="sendMessage">
                Message
              </button>
            </template>
          </div>
        </div>
      </div>

      <!-- Bio Section -->
      <div class="bio-section">
        <h2 class="display-name">{{ userProfile.displayName || userProfile.username || 'User' }}</h2>
        <p class="bio-text" v-if="userProfile.bio">{{ userProfile.bio }}</p>
        <a
          v-if="userProfile.website"
          :href="userProfile.website"
          class="website-link"
          target="_blank"
        >
          {{ userProfile.website }}
        </a>
      </div>
    </section>

    <!-- Highlights Section -->
    <section class="highlights-section">
      <div class="highlights-container">
        <!-- Add New Highlight (Own Profile Only) -->
        <div v-if="isOwnProfile" class="highlight-item add-highlight" @click="addHighlight">
          <div class="highlight-circle">
            <component :is="icons.PlusIcon" class="w-6 h-6" />
          </div>
          <span class="highlight-name">New</span>
        </div>

        <!-- Existing Highlights -->
        <div
          v-for="highlight in highlights"
          :key="highlight.id"
          class="highlight-item"
          @click="viewHighlight(highlight)"
        >
          <div class="highlight-circle">
            <img :src="highlight.cover" :alt="highlight.name" />
          </div>
          <span class="highlight-name">{{ highlight.name }}</span>
        </div>
      </div>
    </section>

    <!-- Navigation Tabs -->
    <section class="content-tabs">
      <div class="tabs-container">
        <button
          class="tab-btn"
          :class="{ active: activeTab === 'posts' }"
          @click="setActiveTab('posts')"
        >
          <component :is="icons.Squares2X2Icon" class="w-6 h-6" />
        </button>
        <button
          class="tab-btn"
          :class="{ active: activeTab === 'reels' }"
          @click="setActiveTab('reels')"
        >
          <component :is="icons.PlayIcon" class="w-6 h-6" />
        </button>
        <button
          v-if="isOwnProfile"
          class="tab-btn"
          :class="{ active: activeTab === 'tagged' }"
          @click="setActiveTab('tagged')"
        >
          <component :is="icons.UserIcon" class="w-6 h-6" />
        </button>
      </div>
    </section>

    <!-- Content Grid -->
    <section class="content-section">
      <!-- Posts Grid -->
      <div v-if="activeTab === 'posts'" class="posts-grid">
        <div
          v-for="post in posts"
          :key="post.id"
          class="post-item"
          @click="openPost(post)"
        >
          <img :src="post.imageUrl" :alt="post.caption" />
          <div class="post-overlay">
            <div class="post-stats">
              <span class="stat">
                <component :is="icons.HeartIcon" class="w-5 h-5" />
                {{ formatNumber(post.likesCount) }}
              </span>
              <span class="stat">
                <component :is="icons.ChatBubbleOvalLeftIcon" class="w-5 h-5" />
                {{ formatNumber(post.commentsCount) }}
              </span>
            </div>
          </div>
        </div>

        <!-- Empty State -->
        <div v-if="posts.length === 0" class="empty-state">
          <div class="empty-icon">
            <component :is="icons.CameraIcon" class="w-16 h-16" />
          </div>
          <h3 class="empty-title">
            {{ isOwnProfile ? 'Share your first photo' : 'No posts yet' }}
          </h3>
          <p class="empty-description">
            {{ isOwnProfile ? 'When you share photos, they will appear on your profile.' : 'When they share photos, you\'ll see them here.' }}
          </p>
          <button v-if="isOwnProfile" class="btn btn-primary" @click="createPost">
            Share your first photo
          </button>
        </div>
      </div>

      <!-- Reels Grid -->
      <div v-if="activeTab === 'reels'" class="reels-grid">
        <div
          v-for="reel in reels"
          :key="reel.id"
          class="reel-item"
          @click="openReel(reel)"
        >
          <img :src="reel.thumbnail" :alt="reel.title" />
          <div class="reel-overlay">
            <component :is="icons.PlayIcon" class="play-icon" />
            <div class="reel-stats">
              <span class="stat">
                <component :is="icons.PlayIcon" class="w-4 h-4" />
                {{ formatNumber(reel.viewsCount) }}
              </span>
            </div>
          </div>
        </div>

        <!-- Empty Reels State -->
        <div v-if="reels.length === 0" class="empty-state">
          <div class="empty-icon">
            <component :is="icons.PlayIcon" class="w-16 h-16" />
          </div>
          <h3 class="empty-title">
            {{ isOwnProfile ? 'Create your first reel' : 'No reels yet' }}
          </h3>
          <p class="empty-description">
            {{ isOwnProfile ? 'Reels you create will appear here.' : 'When they create reels, you\'ll see them here.' }}
          </p>
        </div>
      </div>

      <!-- Tagged Posts -->
      <div v-if="activeTab === 'tagged'" class="tagged-grid">
        <div
          v-for="post in taggedPosts"
          :key="post.id"
          class="post-item"
          @click="openPost(post)"
        >
          <img :src="post.imageUrl" :alt="post.caption" />
          <div class="tagged-indicator">
            <component :is="icons.UserIcon" class="w-4 h-4" />
          </div>
        </div>

        <!-- Empty Tagged State -->
        <div v-if="taggedPosts.length === 0" class="empty-state">
          <div class="empty-icon">
            <component :is="icons.UserIcon" class="w-16 h-16" />
          </div>
          <h3 class="empty-title">Photos of you</h3>
          <p class="empty-description">
            When people tag you in photos, they'll appear here.
          </p>
        </div>
      </div>
    </section>
    </div> <!-- End of profile content -->

    <!-- Bottom Navigation -->
    <nav class="bottom-navigation">
      <button
        v-for="tab in navigationTabs"
        :key="tab.name"
        class="nav-tab"
        :class="{ active: activeNavigationTab === tab.name }"
        @click="switchNavigationTab(tab.name)"
      >
        <component :is="getNavigationIcon(tab.icon, activeNavigationTab === tab.name)" class="nav-icon" />
        <span class="nav-label">{{ tab.label }}</span>
        <span v-if="tab.badge && tab.badge > 0" class="nav-badge">{{ tab.badge }}</span>
      </button>
    </nav>
  </div> <!-- End of profile container -->
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useAuthStore } from '../../stores/auth'
import { useIcons } from '../../composables/useIcons'
import { getPosts } from '../../services/postService'

const router = useRouter()
const route = useRoute()
const authStore = useAuthStore()
const { icons, getNavigationIcon } = useIcons()

// Reactive data
const activeTab = ref('posts')
const activeNavigationTab = ref('profile')
const posts = ref([])
const reels = ref([])
const taggedPosts = ref([])
const loading = ref(true)
const notificationCount = ref(3)

// Get user ID from route params or use current user
const userId = computed(() => {
  return route.params.id ? parseInt(route.params.id) : authStore.user?.id
})

// Mock user profile data (replace with actual API call)
const userProfile = ref({
  id: 1,
  username: 'johndoe',
  displayName: 'John Doe',
  bio: 'Photography enthusiast 📸\nTravel lover ✈️\nCoffee addict ☕',
  website: 'https://johndoe.com',
  avatar: 'https://i.pravatar.cc/150?img=1',
  postsCount: 42,
  followersCount: 1250,
  followingCount: 384,
  isFollowing: false,
  isPrivate: false
})

// Mock highlights data
const highlights = ref([
  {
    id: 1,
    name: 'Travel',
    cover: 'https://picsum.photos/100/100?random=1'
  },
  {
    id: 2,
    name: 'Food',
    cover: 'https://picsum.photos/100/100?random=2'
  },
  {
    id: 3,
    name: 'Work',
    cover: 'https://picsum.photos/100/100?random=3'
  },
  {
    id: 4,
    name: 'Friends',
    cover: 'https://picsum.photos/100/100?random=4'
  }
])

// Mock reels data
reels.value = [
  {
    id: 1,
    title: 'Morning routine',
    thumbnail: 'https://picsum.photos/300/400?random=11',
    viewsCount: 2400
  },
  {
    id: 2,
    title: 'Workout',
    thumbnail: 'https://picsum.photos/300/400?random=12',
    viewsCount: 1800
  },
  {
    id: 3,
    title: 'Cooking',
    thumbnail: 'https://picsum.photos/300/400?random=13',
    viewsCount: 3200
  }
]

// Mock tagged posts
taggedPosts.value = [
  {
    id: 1,
    imageUrl: 'https://picsum.photos/300/300?random=21',
    caption: 'Tagged post 1'
  },
  {
    id: 2,
    imageUrl: 'https://picsum.photos/300/300?random=22',
    caption: 'Tagged post 2'
  }
]

// Computed properties
const isOwnProfile = computed(() => {
  return authStore.user?.id === userId.value && userId.value && authStore.user
})

// Navigation tabs
const navigationTabs = ref([
  {
    name: 'home',
    label: 'Home',
    icon: 'home',
    badge: 0
  },
  {
    name: 'search',
    label: 'Search',
    icon: 'search',
    badge: 0
  },
  {
    name: 'add',
    label: 'Add',
    icon: 'add',
    badge: 0
  },
  {
    name: 'activity',
    label: 'Activity',
    icon: 'activity',
    badge: notificationCount.value
  },
  {
    name: 'profile',
    label: 'Profile',
    icon: 'profile',
    badge: 0
  }
])

// Methods
const switchNavigationTab = (tabName) => {
  activeNavigationTab.value = tabName

  // Handle navigation
  switch(tabName) {
    case 'home':
      router.push('/user/dashboard')
      break
    case 'search':
      // Open search modal or navigate to search page
      break
    case 'add':
      // Navigate to add post page
      break
    case 'activity':
      // Navigate to activity/notifications page
      break
    case 'profile':
      // Already on profile page
      break
    default:
      break
  }
}

// Methods
const goBack = () => {
  router.go(-1)
}

const toggleMenu = () => {
  console.log('Toggle menu')
}

const editAvatar = () => {
  console.log('Edit avatar')
}

const editProfile = () => {
  console.log('Edit profile')
}

const shareProfile = () => {
  console.log('Share profile')
}

const toggleFollow = () => {
  userProfile.value.isFollowing = !userProfile.value.isFollowing
  if (userProfile.value.isFollowing) {
    userProfile.value.followersCount++
  } else {
    userProfile.value.followersCount--
  }
}

const sendMessage = () => {
  console.log('Send message')
}

const showFollowers = () => {
  console.log('Show followers')
}

const showFollowing = () => {
  console.log('Show following')
}

const addHighlight = () => {
  console.log('Add highlight')
}

const viewHighlight = (highlight) => {
  console.log('View highlight:', highlight.name)
}

const setActiveTab = (tab) => {
  activeTab.value = tab
}

const openPost = (post) => {
  console.log('Open post:', post.id)
}

const openReel = (reel) => {
  console.log('Open reel:', reel.id)
}

const createPost = () => {
  console.log('Create post')
}

const formatNumber = (num) => {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M'
  } else if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K'
  }
  return num.toString()
}

// Load user profile data
const loadUserProfile = async (id) => {
  if (!id) {
    loading.value = false
    return
  }

  loading.value = true
  try {
    // TODO: Replace with actual API call
    // const response = await getUserProfile(id)
    // userProfile.value = response.data

    // For now, update with current user data if it's own profile
    if (id === authStore.user?.id && authStore.user) {
      userProfile.value = {
        ...userProfile.value,
        id: authStore.user.id,
        username: authStore.user.username || 'user',
        displayName: authStore.user.name || authStore.user.username || 'User',
        avatar: authStore.user.avatar || `https://i.pravatar.cc/150?img=${authStore.user.id}`
      }
    } else {
      // For other users or when current user data is not available
      userProfile.value = {
        ...userProfile.value,
        id: id,
        username: `user${id}`,
        displayName: `User ${id}`,
        avatar: `https://i.pravatar.cc/150?img=${id}`
      }
    }
  } catch (error) {
    console.error('Error loading user profile:', error)
  } finally {
    loading.value = false
  }
}

// Load posts
const loadPosts = async () => {
  try {
    const response = await getPosts()
    if (response.data && Array.isArray(response.data)) {
      // Filter posts by current profile user if viewing specific user
      if (userId.value && userId.value !== authStore.user?.id) {
        // For other user's profile, filter posts by user
        posts.value = response.data.filter(post => post.user.id === userId.value)
      } else {
        // For own profile, show own posts
        posts.value = response.data.filter(post => post.user.id === authStore.user?.id)
      }

      // Update posts count in profile
      userProfile.value.postsCount = posts.value.length
    } else {
      posts.value = []
    }
  } catch (error) {
    console.error('Error loading posts:', error)
    // Use mock data if API fails
    const mockPosts = [
      {
        id: 1,
        imageUrl: 'https://picsum.photos/300/300?random=1',
        caption: 'Beautiful sunset',
        likesCount: 124,
        commentsCount: 8,
        user: { id: userId.value, username: userProfile.value.username }
      },
      {
        id: 2,
        imageUrl: 'https://picsum.photos/300/300?random=2',
        caption: 'Coffee time',
        likesCount: 89,
        commentsCount: 5,
        user: { id: userId.value, username: userProfile.value.username }
      },
      {
        id: 3,
        imageUrl: 'https://picsum.photos/300/300?random=3',
        caption: 'Weekend vibes',
        likesCount: 256,
        commentsCount: 12,
        user: { id: userId.value, username: userProfile.value.username }
      },
      {
        id: 4,
        imageUrl: 'https://picsum.photos/300/300?random=4',
        caption: 'Nature walk',
        likesCount: 178,
        commentsCount: 9,
        user: { id: userId.value, username: userProfile.value.username }
      },
      {
        id: 5,
        imageUrl: 'https://picsum.photos/300/300?random=5',
        caption: 'City lights',
        likesCount: 312,
        commentsCount: 15,
        user: { id: userId.value, username: userProfile.value.username }
      },
      {
        id: 6,
        imageUrl: 'https://picsum.photos/300/300?random=6',
        caption: 'Food photography',
        likesCount: 201,
        commentsCount: 7,
        user: { id: userId.value, username: userProfile.value.username }
      }
    ]
    posts.value = mockPosts
    userProfile.value.postsCount = mockPosts.length
  }
}

// Watch for route changes (after loadUserProfile is defined)
watch(() => route.params.id, (newId) => {
  if (newId) {
    loadUserProfile(parseInt(newId))
    loadPosts() // Reload posts when user changes
  } else {
    // Load current user's profile
    loadUserProfile(authStore.user?.id)
    loadPosts() // Reload posts for current user
  }
}, { immediate: true })

// Watch for auth store changes
watch(() => authStore.user, (newUser) => {
  if (newUser && !route.params.id) {
    // Update profile if viewing own profile and user data changes
    loadUserProfile(newUser.id)
    loadPosts() // Reload posts when user auth changes
  }
}, { immediate: false })

// Lifecycle
onMounted(() => {
  loadPosts()
  // Ensure user profile is loaded even if watcher doesn't trigger
  if (!loading.value && authStore.user) {
    const targetId = route.params.id ? parseInt(route.params.id) : authStore.user.id
    loadUserProfile(targetId)
  }
})
</script>

<style scoped>
/* Profile Container */
.profile-container {
  min-height: 100vh;
  background: #fafafa;
  padding-bottom: 80px;
}

/* Loading State */
.loading-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  gap: 1rem;
}

.loading-spinner {
  width: 40px;
  height: 40px;
  border: 3px solid #f3f3f3;
  border-top: 3px solid #667eea;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

/* Header */
.profile-header {
  background: white;
  border-bottom: 1px solid #dbdbdb;
  position: sticky;
  top: 0;
  z-index: 50;
}

.header-content {
  max-width: 935px;
  margin: 0 auto;
  padding: 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.header-left {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.back-btn {
  background: none;
  border: none;
  cursor: pointer;
  color: #262626;
  padding: 0.5rem;
  border-radius: 50%;
  transition: background-color 0.2s;
}

.back-btn:hover {
  background: #f5f5f5;
}

.username-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: #262626;
  margin: 0;
}

.header-actions {
  display: flex;
  gap: 1rem;
}

.action-btn {
  background: none;
  border: none;
  cursor: pointer;
  color: #262626;
  padding: 0.5rem;
  border-radius: 50%;
  transition: background-color 0.2s;
}

.action-btn:hover {
  background: #f5f5f5;
}

/* Profile Info */
.profile-info {
  background: white;
  padding: 2rem;
  border-bottom: 1px solid #dbdbdb;
}

.profile-main {
  max-width: 935px;
  margin: 0 auto;
  display: flex;
  gap: 2rem;
  margin-bottom: 1.5rem;
}

.avatar-section {
  flex-shrink: 0;
}

.avatar-container {
  position: relative;
  width: 150px;
  height: 150px;
}

.profile-avatar {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid #dbdbdb;
}

.edit-avatar-btn {
  position: absolute;
  bottom: 8px;
  right: 8px;
  width: 32px;
  height: 32px;
  background: #0095f6;
  border: 2px solid white;
  border-radius: 50%;
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.2s;
}

.edit-avatar-btn:hover {
  background: #1877f2;
}

.profile-stats {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.stats-grid {
  display: flex;
  gap: 2rem;
}

.stat-item {
  text-align: center;
  cursor: pointer;
  transition: transform 0.2s;
}

.stat-item:hover {
  transform: translateY(-2px);
}

.stat-number {
  display: block;
  font-size: 1.125rem;
  font-weight: 600;
  color: #262626;
  margin-bottom: 0.25rem;
}

.stat-label {
  font-size: 1rem;
  color: #8e8e8e;
}

.action-buttons {
  display: flex;
  gap: 0.5rem;
}

.btn {
  padding: 0.5rem 1.5rem;
  border-radius: 8px;
  font-weight: 600;
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.2s;
  border: 1px solid transparent;
}

.btn-primary {
  background: #0095f6;
  color: white;
  border-color: #0095f6;
}

.btn-primary:hover {
  background: #1877f2;
  border-color: #1877f2;
}

.btn-secondary {
  background: #efefef;
  color: #262626;
  border-color: #dbdbdb;
}

.btn-secondary:hover {
  background: #e0e0e0;
}

.bio-section {
  max-width: 935px;
  margin: 0 auto;
}

.display-name {
  font-size: 1rem;
  font-weight: 600;
  color: #262626;
  margin: 0 0 0.5rem 0;
}

.bio-text {
  font-size: 1rem;
  color: #262626;
  line-height: 1.5;
  margin: 0 0 0.5rem 0;
  white-space: pre-line;
}

.website-link {
  color: #00376b;
  text-decoration: none;
  font-weight: 600;
}

.website-link:hover {
  text-decoration: underline;
}

/* Highlights */
.highlights-section {
  background: white;
  padding: 1rem 0;
  border-bottom: 1px solid #dbdbdb;
}

.highlights-container {
  max-width: 935px;
  margin: 0 auto;
  padding: 0 2rem;
  display: flex;
  gap: 1rem;
  overflow-x: auto;
  scrollbar-width: none;
  -ms-overflow-style: none;
}

.highlights-container::-webkit-scrollbar {
  display: none;
}

.highlight-item {
  text-align: center;
  cursor: pointer;
  flex-shrink: 0;
}

.highlight-circle {
  width: 77px;
  height: 77px;
  border-radius: 50%;
  border: 2px solid #dbdbdb;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 0.5rem;
  overflow: hidden;
  transition: transform 0.2s;
}

.highlight-item:hover .highlight-circle {
  transform: scale(1.05);
}

.highlight-circle img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.add-highlight .highlight-circle {
  background: #fafafa;
  color: #8e8e8e;
}

.highlight-name {
  font-size: 0.75rem;
  color: #262626;
  display: block;
  max-width: 77px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

/* Content Tabs */
.content-tabs {
  background: white;
  border-bottom: 1px solid #dbdbdb;
}

.tabs-container {
  max-width: 935px;
  margin: 0 auto;
  display: flex;
  justify-content: center;
}

.tab-btn {
  background: none;
  border: none;
  padding: 1rem;
  cursor: pointer;
  color: #8e8e8e;
  border-top: 1px solid transparent;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
}

.tab-btn.active {
  color: #262626;
  border-top-color: #262626;
}

.tab-btn:hover {
  color: #262626;
}

/* Content Section */
.content-section {
  background: white;
  min-height: 400px;
}

.posts-grid,
.reels-grid,
.tagged-grid {
  max-width: 935px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 3px;
  padding: 0;
}

.post-item,
.reel-item {
  aspect-ratio: 1;
  position: relative;
  cursor: pointer;
  overflow: hidden;
  background: #f5f5f5;
}

.post-item img,
.reel-item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.2s;
}

.post-item:hover img,
.reel-item:hover img {
  transform: scale(1.05);
}

.post-overlay,
.reel-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.2s;
  color: white;
}

.post-item:hover .post-overlay,
.reel-item:hover .reel-overlay {
  opacity: 1;
}

.post-stats,
.reel-stats {
  display: flex;
  gap: 1rem;
  align-items: center;
}

.stat {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  font-weight: 600;
  font-size: 0.875rem;
}

.play-icon {
  width: 24px;
  height: 24px;
  margin-bottom: 1rem;
}

.tagged-indicator {
  position: absolute;
  top: 8px;
  right: 8px;
  background: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 4px;
  border-radius: 4px;
}

/* Empty States */
.empty-state {
  grid-column: 1 / -1;
  text-align: center;
  padding: 3rem 2rem;
}

.empty-icon {
  color: #c7c7c7;
  margin-bottom: 1rem;
  display: flex;
  justify-content: center;
}

.empty-title {
  font-size: 1.5rem;
  font-weight: 600;
  color: #262626;
  margin: 0 0 0.5rem 0;
}

.empty-description {
  color: #8e8e8e;
  margin: 0 0 1.5rem 0;
  font-size: 1rem;
}

/* Responsive Design */
@media (max-width: 768px) {
  .profile-info {
    padding: 1rem;
  }

  .profile-main {
    gap: 1rem;
  }

  .avatar-container {
    width: 100px;
    height: 100px;
  }

  .stats-grid {
    gap: 1rem;
  }

  .action-buttons {
    flex-direction: column;
  }

  .highlights-container {
    padding: 0 1rem;
  }

  .posts-grid,
  .reels-grid,
  .tagged-grid {
    gap: 1px;
  }

  .empty-state {
    padding: 2rem 1rem;
  }
}

@media (max-width: 480px) {
  .header-content {
    padding: 0.75rem 1rem;
  }

  .profile-main {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }

  .avatar-container {
    width: 120px;
    height: 120px;
  }

  .profile-stats {
    width: 100%;
  }

  .stats-grid {
    justify-content: center;
  }

  .bio-section {
    text-align: center;
    margin-top: 1rem;
  }
}

/* Animations */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.profile-container {
  animation: fadeIn 0.5s ease-out;
}

/* Loading states */
.loading-shimmer {
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
}

@keyframes shimmer {
  0% {
    background-position: -200% 0;
  }
  100% {
    background-position: 200% 0;
  }
}

/* Bottom Navigation */
.bottom-navigation {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  border-top: 1px solid rgba(226, 232, 240, 0.5);
  display: flex;
  justify-content: space-around;
  padding: 0.75rem 0;
  z-index: 50;
}

.nav-tab {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.25rem;
  background: none;
  border: none;
  color: #6b7280;
  cursor: pointer;
  transition: all 0.3s ease;
  padding: 0.5rem;
  border-radius: 12px;
  min-width: 60px;
}

.nav-tab.active {
  color: #667eea;
}

.nav-tab:hover {
  background: rgba(102, 126, 234, 0.1);
}

.nav-icon {
  width: 24px;
  height: 24px;
}

.nav-label {
  font-size: 0.7rem;
  font-weight: 500;
}

.nav-badge {
  position: absolute;
  top: 4px;
  right: 8px;
  background: #ef4444;
  color: white;
  font-size: 0.6rem;
  font-weight: 600;
  padding: 2px 5px;
  border-radius: 8px;
  min-width: 16px;
  height: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
