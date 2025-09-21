<template>
  <div class="dashboard-container">
    <!-- Main Content Area -->
    <div class="main-content">
      <!-- Header -->
      <header class="dashboard-header">
        <div class="header-content">
          <div class="logo-section">
            <div class="logo-icon">
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" fill="url(#logoGradient)"/>
                <defs>
                  <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style="stop-color:#667eea"/>
                    <stop offset="50%" style="stop-color:#764ba2"/>
                    <stop offset="100%" style="stop-color:#f093fb"/>
                  </linearGradient>
                </defs>
              </svg>
            </div>
            <h1 class="logo-text">InstaVibe</h1>
          </div>

          <div class="header-actions">
            <!-- Search Bar (hidden on mobile) -->
            <div class="search-bar hidden md:flex">
              <div class="search-input-wrapper">
                <svg class="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <circle cx="11" cy="11" r="8"/>
                  <path d="M21 21l-4.35-4.35"/>
                </svg>
                <input
                  type="text"
                  placeholder="Search..."
                  class="search-input"
                  v-model="searchQuery"
                >
              </div>
            </div>

            <!-- Notification & Messages (desktop only) -->
            <div class="action-buttons hidden md:flex">
              <button class="action-btn" @click="toggleNotifications">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
                  <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
                </svg>
                <span v-if="notificationCount > 0" class="notification-badge">{{ notificationCount }}</span>
              </button>

              <button class="action-btn" @click="toggleMessages">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                </svg>
                <span v-if="messageCount > 0" class="notification-badge">{{ messageCount }}</span>
              </button>

              <button class="action-btn" @click="logout">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
                  <polyline points="16,17 21,12 16,7"/>
                  <line x1="21" y1="12" x2="9" y2="12"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </header>

      <!-- Stories Section -->
      <section class="stories-section">
        <div class="stories-container">
          <!-- Add Your Story -->
          <div class="story-item add-story" @click="addStory">
            <div class="story-avatar add-avatar">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" class="add-icon">
                <line x1="12" y1="5" x2="12" y2="19"/>
                <line x1="5" y1="12" x2="19" y2="12"/>
              </svg>
            </div>
            <span class="story-username">Your Story</span>
          </div>

          <!-- User Stories -->
          <div
            v-for="story in stories"
            :key="story.id"
            class="story-item"
            @click="viewStory(story)"
          >
            <div class="story-avatar" :class="{ 'story-viewed': story.viewed }">
              <img :src="story.user.avatar" :alt="story.user.username" />
            </div>
            <span class="story-username">{{ story.user.username }}</span>
          </div>
        </div>
      </section>

      <!-- Posts Feed -->
      <section class="posts-feed">
        <div class="feed-container">
          <div
            v-for="post in posts"
            :key="post.id"
            class="post-card"
          >
            <!-- Post Header -->
            <div class="post-header">
              <div class="post-user-info">
                <img :src="post.user.avatar || 'https://i.pravatar.cc/150?img=' + post.user.id" :alt="post.user.username" class="post-avatar" />
                <div class="post-user-details">
                  <h3 class="post-username">{{ post.user.username }}</h3>
                  <span class="post-location" v-if="post.location">{{ post.location }}</span>
                </div>
              </div>
              <button class="post-menu-btn" @click.stop="togglePostMenu(post.id)">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <circle cx="12" cy="12" r="1"/>
                  <circle cx="19" cy="12" r="1"/>
                  <circle cx="5" cy="12" r="1"/>
                </svg>
              </button>
            </div>

            <!-- Post Menu Dropdown -->
                        <!-- Post Menu Dropdown -->
            <div v-if="isMenuVisible(post.id)" class="post-menu-dropdown" @click.stop>
              <button
                v-if="post.user.id === authStore.user?.id"
                class="menu-item delete-item"
                @click="deleteUserPost(post.id)"
              >
                <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                </svg>
                Delete Post
              </button>
              <button class="menu-item">
                <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z"/>
                </svg>
                Share
              </button>
              <button class="menu-item">
                <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"/>
                </svg>
                Save
              </button>
            </div>

            <!-- Post Image -->
            <div class="post-image-container">
              <img :src="getImageUrl(post.image_path)" :alt="post.caption" class="post-image" />

              <!-- Image Navigation (for multiple images) -->
              <div v-if="post.images && post.images.length > 1" class="image-navigation">
                <button
                  v-for="(img, index) in post.images"
                  :key="index"
                  class="nav-dot"
                  :class="{ active: index === post.currentImageIndex }"
                  @click="changeImage(post.id, index)"
                ></button>
              </div>
            </div>

            <!-- Post Actions -->
            <div class="post-actions">
              <div class="primary-actions">
                <button
                  class="action-btn like-btn"
                  :class="{ liked: post.isLiked }"
                  @click="toggleLike(post.id)"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                  </svg>
                </button>

                <button class="action-btn comment-btn" @click="focusComment(post.id)">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                  </svg>
                </button>

                <button class="action-btn share-btn" @click="sharePost(post.id)">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/>
                    <polyline points="16,6 12,2 8,6"/>
                    <line x1="12" y1="2" x2="12" y2="15"/>
                  </svg>
                </button>
              </div>

              <button
                class="action-btn bookmark-btn"
                :class="{ bookmarked: post.isBookmarked }"
                @click="toggleBookmark(post.id)"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/>
                </svg>
              </button>
            </div>

            <!-- Likes Count -->
            <div class="post-likes" v-if="post.likesCount > 0">
              <span class="likes-count">{{ formatCount(post.likesCount) }} likes</span>
            </div>

            <!-- Post Caption -->
            <div class="post-caption" v-if="post.caption">
              <span class="caption-username">{{ post.user.username }}</span>
              <span class="caption-text">{{ post.caption }}</span>
            </div>

            <!-- Comments -->
            <div class="post-comments" v-if="post.comments && post.comments.length > 0">
              <button
                v-if="post.commentsCount > 2"
                class="view-comments-btn"
                @click="toggleCommentsView(post.id)"
              >
                {{ expandedComments[post.id] ? 'Hide comments' : `View all ${post.commentsCount} comments` }}
              </button>

              <div
                v-for="comment in (expandedComments[post.id] ? post.comments : post.comments.slice(0, 2))"
                :key="comment.id"
                class="comment"
              >
                <span class="comment-username">{{ comment.user.username }}</span>
                <span class="comment-text">{{ comment.content }}</span>
              </div>
            </div>

            <!-- Time Ago -->
            <div class="post-time">
              <span class="time-text">{{ formatTimeAgo(post.createdAt) }}</span>
            </div>

            <!-- Add Comment -->
            <div class="add-comment">
              <input
                type="text"
                placeholder="Add a comment..."
                class="comment-input"
                v-model="newComments[post.id]"
                @keyup.enter="addCommentToPost(post.id)"
                :ref="(el) => commentRefs[post.id] = el"
              />
              <button
                v-if="newComments[post.id]?.trim()"
                class="post-comment-btn"
                @click="addCommentToPost(post.id)"
              >
                Post
              </button>
            </div>
          </div>

          <!-- Load More -->
          <div class="load-more" v-if="hasMorePosts">
            <button class="load-more-btn" @click="loadMorePosts" :disabled="loadingPosts">
              <span v-if="loadingPosts">Loading...</span>
              <span v-else>Load More Posts</span>
            </button>
          </div>
        </div>
      </section>
    </div>

    <!-- Bottom Navigation -->
    <nav class="bottom-navigation">
      <button
        v-for="tab in navigationTabs"
        :key="tab.name"
        class="nav-tab"
        :class="{ active: activeTab === tab.name }"
        @click="switchTab(tab.name)"
      >
        <component :is="getIconComponent(tab.icon)" class="nav-icon" />
        <span class="nav-label">{{ tab.label }}</span>
        <span v-if="tab.badge && tab.badge > 0" class="nav-badge">{{ tab.badge }}</span>
      </button>
    </nav>

    <!-- Create Post Modal -->
    <CreatePostModal
      :is-open="showCreatePostModal"
      @close="closeCreatePostModal"
      @post-created="onPostCreated"
    />
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, onUnmounted, nextTick, computed } from 'vue'
import { useRouter } from 'vue-router'
import CreatePostModal from '../../components/CreatePostModal.vue'
import { useAuthStore } from '../../stores/auth'
import {
  getPosts,
  deletePost,
  likePost,
  unlikePost,
  getLikesCount,
  isPostLiked,
  addComment,
  getComments
} from '../../services/postService.js'

const router = useRouter()
const authStore = useAuthStore()

// Reactive data
const searchQuery = ref('')
const activeTab = ref('home')
const notificationCount = ref(3)
const messageCount = ref(1)
const loadingPosts = ref(false)
const hasMorePosts = ref(true)
const newComments = reactive({})
const posts = ref([])
const showCreatePostModal = ref(false)
const commentRefs = ref({})
const expandedComments = reactive({})
const showPostMenu = reactive({})

// Computed property for menu visibility
const isMenuVisible = computed(() => {
  return (postId) => {
    return showPostMenu[postId] || false
  }
})

// Navigation tabs
const navigationTabs = ref([
  {
    name: 'home',
    label: 'Home',
    icon: 'HomeIcon',
    badge: 0
  },
  {
    name: 'search',
    label: 'Search',
    icon: 'SearchIcon',
    badge: 0
  },
  {
    name: 'add',
    label: 'Add',
    icon: 'PlusIcon',
    badge: 0
  },
  {
    name: 'activity',
    label: 'Activity',
    icon: 'HeartIcon',
    badge: notificationCount.value
  },
  {
    name: 'profile',
    label: 'Profile',
    icon: 'UserIcon',
    badge: 0
  }
])

// Sample data for stories (keeping as is for now)
const stories = ref([
  {
    id: 1,
    user: { username: 'alice_wonder', avatar: 'https://i.pravatar.cc/150?img=1' },
    viewed: false
  },
  {
    id: 2,
    user: { username: 'bob_builder', avatar: 'https://i.pravatar.cc/150?img=2' },
    viewed: true
  },
  {
    id: 3,
    user: { username: 'carol_sing', avatar: 'https://i.pravatar.cc/150?img=3' },
    viewed: false
  },
  {
    id: 4,
    user: { username: 'david_dance', avatar: 'https://i.pravatar.cc/150?img=4' },
    viewed: false
  },
  {
    id: 5,
    user: { username: 'emma_art', avatar: 'https://i.pravatar.cc/150?img=5' },
    viewed: true
  }
])

// Methods
const switchTab = (tabName) => {
  activeTab.value = tabName

  // Handle navigation
  switch(tabName) {
    case 'search':
      // Open search modal or navigate to search page
      break
    case 'add':
      showCreatePostModal.value = true
      break
    case 'activity':
      // Navigate to activity/notifications page
      break
    case 'profile':
      // Navigate to profile page
      break
    default:
      // Home - already here
      break
  }
}

const toggleNotifications = () => {
  // Toggle notifications dropdown
  console.log('Toggle notifications')
}

const toggleMessages = () => {
  // Toggle messages dropdown
  console.log('Toggle messages')
}

const logout = async () => {
  await authStore.logout()
  router.push('/login')
}

const addStory = () => {
  // Open add story interface
  console.log('Add story')
}

const viewStory = (story) => {
  // View story in fullscreen
  console.log('View story:', story.user.username)
}

const togglePostMenu = (postId) => {
  showPostMenu[postId] = !showPostMenu[postId]
}

const deleteUserPost = async (postId) => {
  if (!confirm('Are you sure you want to delete this post?')) {
    return
  }

  try {
    await deletePost(postId)
    // Remove post from local state
    posts.value = posts.value.filter(post => post.id !== postId)
    showPostMenu[postId] = false
  } catch (error) {
    console.error('Error deleting post:', error)
    alert('Failed to delete post. Please try again.')
  }
}

const changeImage = (postId, imageIndex) => {
  // Change image in carousel
  const post = posts.value.find(p => p.id === postId)
  if (post) {
    post.currentImageIndex = imageIndex
  }
}

const toggleLike = async (postId) => {
  try {
    const post = posts.value.find(p => p.id === postId)
    if (!post) return

    if (post.isLiked) {
      await unlikePost(postId)
      post.isLiked = false
      post.likesCount = Math.max(0, post.likesCount - 1)
    } else {
      await likePost(postId)
      post.isLiked = true
      post.likesCount += 1
    }
  } catch (error) {
    console.error('Error toggling like:', error)
    // Revert optimistic update on error
    const post = posts.value.find(p => p.id === postId)
    if (post) {
      post.isLiked = !post.isLiked
      post.likesCount += post.isLiked ? 1 : -1
    }
  }
}

const toggleBookmark = (postId) => {
  const post = posts.value.find(p => p.id === postId)
  if (post) {
    post.isBookmarked = !post.isBookmarked
  }
}

const focusComment = (postId) => {
  nextTick(() => {
    const commentInput = commentRefs.value[postId]
    if (commentInput) {
      commentInput.focus()
      commentInput.scrollIntoView({ behavior: 'smooth', block: 'center' })
    } else {
      // Fallback: try again after a short delay
      setTimeout(() => {
        const retryInput = commentRefs.value[postId]
        if (retryInput) {
          retryInput.focus()
          retryInput.scrollIntoView({ behavior: 'smooth', block: 'center' })
        }
      }, 100)
    }
  })
}

const sharePost = (postId) => {
  // Share post functionality
  console.log('Share post:', postId)
}

const toggleCommentsView = (postId) => {
  // Toggle expanded state for comments
  if (expandedComments[postId]) {
    expandedComments[postId] = false
  } else {
    expandedComments[postId] = true
  }
}

const addCommentToPost = async (postId) => {
  const commentText = newComments[postId]?.trim()
  if (!commentText) return

  try {
    const response = await addComment(postId, commentText)
    const post = posts.value.find(p => p.id === postId)
    if (post) {
      post.comments.push({
        id: response.data.id,
        user: response.data.user,
        content: response.data.content,
        created_at: response.data.created_at
      })
      post.commentsCount++
      newComments[postId] = ''
    }
  } catch (error) {
    console.error('Error adding comment:', error)
  }
}

const loadMorePosts = () => {
  loadingPosts.value = true
  // Simulate API call
  setTimeout(() => {
    // Add more posts here
    loadingPosts.value = false
    hasMorePosts.value = false // Simulate no more posts
  }, 1000)
}

const formatCount = (count) => {
  if (count >= 1000000) {
    return (count / 1000000).toFixed(1) + 'M'
  } else if (count >= 1000) {
    return (count / 1000).toFixed(1) + 'K'
  }
  return count.toString()
}

const formatTimeAgo = (date) => {
  const now = new Date()
  const postDate = new Date(date)
  const diffMs = now - postDate
  const diffMins = Math.floor(diffMs / 60000)
  const diffHours = Math.floor(diffMs / 3600000)
  const diffDays = Math.floor(diffMs / 86400000)

  if (diffMins < 1) return 'Just now'
  if (diffMins < 60) return `${diffMins}m`
  if (diffHours < 24) return `${diffHours}h`
  if (diffDays < 7) return `${diffDays}d`
  return postDate.toLocaleDateString()
}

const getImageUrl = (imagePath) => {
  if (!imagePath) return 'https://via.placeholder.com/600x600?text=No+Image'
  if (imagePath.startsWith('http')) return imagePath
  return `http://localhost:8000/storage/${imagePath}`
}

const getIconComponent = (iconName) => {
  return iconComponents[iconName] || iconComponents.HomeIcon
}

// Icon components (simplified)
const iconComponents = {
  HomeIcon: {
    template: `
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
        <polyline points="9,22 9,12 15,12 15,22"/>
      </svg>
    `
  },
  SearchIcon: {
    template: `
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <circle cx="11" cy="11" r="8"/>
        <path d="M21 21l-4.35-4.35"/>
      </svg>
    `
  },
  PlusIcon: {
    template: `
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <line x1="12" y1="5" x2="12" y2="19"/>
        <line x1="5" y1="12" x2="19" y2="12"/>
      </svg>
    `
  },
  HeartIcon: {
    template: `
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
      </svg>
    `
  },
  UserIcon: {
    template: `
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
        <circle cx="12" cy="7" r="4"/>
      </svg>
    `
  }
}

// Fetch posts on mount
const fetchPosts = async () => {
  try {
    console.log('Fetching posts...')
    loadingPosts.value = true
    const response = await getPosts()
    console.log('Posts response:', response.data)

    // Transform posts data and add like/comment info
    posts.value = await Promise.all(response.data.data.map(async (post) => {
      try {
        const [likesResponse, isLikedResponse, commentsResponse] = await Promise.all([
          getLikesCount(post.id),
          isPostLiked(post.id),
          getComments(post.id)
        ])

        return {
          ...post,
          likesCount: likesResponse.data.count,
          isLiked: isLikedResponse.data.liked,
          isBookmarked: false, // Not implemented yet
          comments: commentsResponse.data, // Store all comments
          commentsCount: commentsResponse.data.length,
          createdAt: new Date(post.created_at)
        }
      } catch (error) {
        console.error(`Error fetching data for post ${post.id}:`, error)
        return {
          ...post,
          likesCount: 0,
          isLiked: false,
          isBookmarked: false,
          comments: [], // No comments available
          commentsCount: 0,
          createdAt: new Date(post.created_at)
        }
      }
    }))
    console.log('Posts loaded:', posts.value.length)
  } catch (error) {
    console.error('Error fetching posts:', error)
    posts.value = []
  } finally {
    loadingPosts.value = false
  }
}

const closeAllMenus = () => {
  Object.keys(showPostMenu).forEach(id => {
    showPostMenu[id] = false
  })
}

// Lifecycle
onMounted(() => {
  fetchPosts()

  // Add click outside listener to close menus
  document.addEventListener('click', closeAllMenus)
})

onUnmounted(() => {
  document.removeEventListener('click', closeAllMenus)
})

const closeCreatePostModal = () => {
  showCreatePostModal.value = false
}

const onPostCreated = (newPost) => {
  console.log('New post created:', newPost)
  // Refresh posts after creating a new one
  fetchPosts()
}
</script>

<style scoped>
/* Dashboard Container */
.dashboard-container {
  min-height: 100vh;
  background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
  padding-bottom: 80px; /* Space for bottom navigation */
}

/* Header */
.dashboard-header {
  position: sticky;
  top: 0;
  z-index: 50;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  border-bottom: 1px solid rgba(226, 232, 240, 0.5);
}

.header-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem 1.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.logo-section {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.logo-icon {
  width: 32px;
  height: 32px;
}

.logo-text {
  font-family: 'Dancing Script', cursive;
  font-size: 1.75rem;
  font-weight: 700;
  background: linear-gradient(45deg, #667eea, #764ba2);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.header-actions {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.search-bar {
  position: relative;
}

.search-input-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}

.search-icon {
  position: absolute;
  left: 12px;
  width: 16px;
  height: 16px;
  color: #9ca3af;
  z-index: 1;
}

.search-input {
  width: 300px;
  padding: 8px 12px 8px 36px;
  background: #f3f4f6;
  border: 1px solid #e5e7eb;
  border-radius: 20px;
  font-size: 0.9rem;
  transition: all 0.3s ease;
}

.search-input:focus {
  outline: none;
  border-color: #667eea;
  background: white;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

.action-buttons {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.action-btn {
  position: relative;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: none;
  border: none;
  border-radius: 50%;
  color: #4b5563;
  transition: all 0.3s ease;
  cursor: pointer;
}

.action-btn:hover {
  background: #f3f4f6;
  color: #667eea;
}

.action-btn svg {
  width: 20px;
  height: 20px;
}

.notification-badge {
  position: absolute;
  top: 6px;
  right: 6px;
  background: #ef4444;
  color: white;
  font-size: 0.7rem;
  font-weight: 600;
  padding: 2px 6px;
  border-radius: 10px;
  min-width: 18px;
  height: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Main Content */
.main-content {
  max-width: 600px;
  margin: 0 auto;
  padding: 0 1rem;
}

/* Stories Section */
.stories-section {
  margin: 1.5rem 0;
}

.stories-container {
  display: flex;
  gap: 1rem;
  overflow-x: auto;
  padding: 1rem 0;
  scrollbar-width: none;
  -ms-overflow-style: none;
}

.stories-container::-webkit-scrollbar {
  display: none;
}

.story-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  flex-shrink: 0;
}

.story-avatar {
  width: 70px;
  height: 70px;
  border-radius: 50%;
  position: relative;
  padding: 3px;
  background: linear-gradient(45deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888);
  transition: transform 0.3s ease;
}

.story-avatar.story-viewed {
  background: #d1d5db;
}

.story-avatar:hover {
  transform: scale(1.05);
}

.story-avatar img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  border: 3px solid white;
  object-fit: cover;
}

.add-avatar {
  background: #e5e7eb;
  display: flex;
  align-items: center;
  justify-content: center;
}

.add-icon {
  width: 24px;
  height: 24px;
  color: #6b7280;
}

.story-username {
  font-size: 0.8rem;
  color: #374151;
  text-align: center;
  max-width: 70px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

/* Posts Feed */
.posts-feed {
  margin-bottom: 2rem;
}

.feed-container {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.post-card {
  background: white;
  border-radius: 16px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  overflow: hidden;
  border: 1px solid rgba(226, 232, 240, 0.5);
  position: relative !important;
}

/* Post Header */
.post-header {
  display: flex !important;
  align-items: center !important;
  justify-content: space-between !important;
  padding: 1rem !important;
  position: relative !important; /* Added for dropdown positioning */
}

.post-user-info {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.post-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
}

.post-user-details {
  display: flex;
  flex-direction: column;
}

.post-username {
  font-weight: 600;
  font-size: 0.9rem;
  color: #1f2937;
  margin: 0;
}

.post-location {
  font-size: 0.8rem;
  color: #6b7280;
}

.post-menu-btn {
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: none;
  border: none;
  border-radius: 50%;
  color: #6b7280;
  cursor: pointer;
  transition: all 0.3s ease;
}

.post-menu-btn:hover {
  background: #f3f4f6;
}

.post-menu-btn svg {
  width: 16px;
  height: 16px;
}

/* Post Menu Dropdown */
.post-menu-dropdown {
  position: absolute;
  top: 60px;
  right: 16px;
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  z-index: 1000;
  min-width: 150px;
  overflow: hidden;
}

.menu-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  width: 100%;
  padding: 0.75rem 1rem;
  background: none;
  border: none;
  text-align: left;
  font-size: 0.9rem;
  color: #374151;
  cursor: pointer;
  transition: background 0.2s ease;
}

.menu-item:hover {
  background: #f3f4f6;
}

.menu-item svg {
  width: 16px;
  height: 16px;
}

.delete-item {
  color: #ef4444;
}

.delete-item:hover {
  background: #fef2f2;
}

/* Post Image */
.post-image-container {
  position: relative;
  width: 100%;
  aspect-ratio: 1;
}

.post-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.image-navigation {
  position: absolute;
  bottom: 12px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 6px;
}

.nav-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.5);
  border: none;
  cursor: pointer;
  transition: background 0.3s ease;
}

.nav-dot.active {
  background: white;
}

/* Post Actions */
.post-actions {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.75rem 1rem 0.5rem;
}

.primary-actions {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.post-actions .action-btn {
  width: 32px;
  height: 32px;
}

.post-actions .action-btn svg {
  width: 20px;
  height: 20px;
}

.like-btn.liked {
  color: #ef4444;
}

.like-btn.liked svg {
  fill: currentColor;
}

.bookmark-btn.bookmarked {
  color: #1f2937;
}

.bookmark-btn.bookmarked svg {
  fill: currentColor;
}

/* Post Content */
.post-likes {
  padding: 0 1rem 0.5rem;
}

.likes-count {
  font-weight: 600;
  font-size: 0.9rem;
  color: #1f2937;
}

.post-caption {
  padding: 0 1rem 0.5rem;
  line-height: 1.4;
}

.caption-username {
  font-weight: 600;
  color: #1f2937;
  margin-right: 0.5rem;
}

.caption-text {
  color: #374151;
}

.post-comments {
  padding: 0 1rem 0.5rem;
}

.view-comments-btn {
  background: none;
  border: none;
  color: #6b7280;
  font-size: 0.9rem;
  cursor: pointer;
  margin-bottom: 0.5rem;
  padding: 0;
}

.comment {
  margin-bottom: 0.25rem;
  line-height: 1.4;
}

.comment-username {
  font-weight: 600;
  color: #1f2937;
  margin-right: 0.5rem;
}

.comment-text {
  color: #374151;
}

.post-time {
  padding: 0 1rem 0.75rem;
}

.time-text {
  font-size: 0.8rem;
  color: #9ca3af;
  text-transform: uppercase;
  letter-spacing: 0.02em;
}

/* Add Comment */
.add-comment {
  display: flex;
  align-items: center;
  padding: 0.75rem 1rem;
  border-top: 1px solid #f3f4f6;
  gap: 0.75rem;
}

.comment-input {
  flex: 1;
  border: none;
  outline: none;
  font-size: 0.9rem;
  color: #374151;
}

.comment-input::placeholder {
  color: #9ca3af;
}

.post-comment-btn {
  background: none;
  border: none;
  color: #667eea;
  font-weight: 600;
  font-size: 0.9rem;
  cursor: pointer;
  padding: 0;
}

/* Load More */
.load-more {
  display: flex;
  justify-content: center;
  margin-top: 2rem;
}

.load-more-btn {
  padding: 0.75rem 1.5rem;
  background: #667eea;
  color: white;
  border: none;
  border-radius: 20px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
}

.load-more-btn:hover:not(:disabled) {
  background: #5a6fd8;
  transform: translateY(-1px);
}

.load-more-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
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

/* Responsive Design */
@media (max-width: 768px) {
  .header-content {
    padding: 0.75rem 1rem;
  }

  .logo-text {
    font-size: 1.5rem;
  }

  .search-input {
    width: 200px;
  }

  .main-content {
    padding: 0 0.5rem;
  }

  .stories-container {
    padding: 0.75rem 0;
    gap: 0.75rem;
  }

  .story-avatar {
    width: 60px;
    height: 60px;
  }

  .story-username {
    max-width: 60px;
  }
}

@media (max-width: 640px) {
  .dashboard-header {
    position: relative;
  }

  .search-bar {
    display: none;
  }

  .main-content {
    padding: 0;
  }

  .post-card {
    border-radius: 0;
    border-left: none;
    border-right: none;
  }

  .stories-section {
    margin: 1rem 0;
    padding: 0 1rem;
  }
}

/* Animations */
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

.post-card {
  animation: fadeIn 0.5s ease-out;
}

/* Loading states */
.loading-shimmer {
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
}

@keyframes shimmer {
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
}
</style>
