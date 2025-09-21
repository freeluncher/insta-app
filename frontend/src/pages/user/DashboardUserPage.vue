<template>
  <div class="dashboard-container">
    <!-- Main Content Area -->
    <div class="main-content">
      <!-- Header -->
      <header class="dashboard-header">
        <div class="header-content">
          <div class="logo-section">
            <div class="logo-icon">
              <InstagramLogo />
            </div>
            <h1 class="logo-text">InstaVibe</h1>
          </div>

          <div class="header-actions">
            <!-- Search Bar (hidden on mobile) -->
            <div class="search-bar hidden md:flex">
              <div class="search-input-wrapper">
                <component :is="headerIcons.search" class="search-icon" />
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
                <component :is="headerIcons.notifications" />
                <span v-if="notificationCount > 0" class="notification-badge">{{ notificationCount }}</span>
              </button>

              <button class="action-btn" @click="toggleMessages">
                <component :is="headerIcons.messages" />
                <span v-if="messageCount > 0" class="notification-badge">{{ messageCount }}</span>
              </button>

              <button class="action-btn" @click="logout">
                <component :is="headerIcons.logout" />
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
              <component :is="utilityIcons.add" class="add-icon" />
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
                <component :is="getPostActionIcon('menu')" />
              </button>
            </div>

            <!-- Post Menu Dropdown -->
                        <!-- Post Menu Dropdown -->
            <div v-if="isMenuVisible(post.id)" class="post-menu-dropdown" @click.stop>
              <button
                v-if="canModifyPost(post)"
                class="menu-item delete-item"
                @click="deleteUserPost(post.id)"
              >
                <component :is="utilityIcons.delete" class="w-4 h-4 mr-2" />
                Delete Post
              </button>
              <button class="menu-item">
                <component :is="utilityIcons.share" class="w-4 h-4 mr-2" />
                Share
              </button>
              <button class="menu-item">
                <component :is="getPostActionIcon('bookmark')" class="w-4 h-4 mr-2" />
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
                  <component :is="getPostActionIcon('like', post.isLiked)" />
                </button>

                <button class="action-btn comment-btn" @click="focusComment(post.id)">
                  <component :is="getPostActionIcon('comment')" />
                </button>

                <button class="action-btn share-btn" @click="sharePost(post.id)">
                  <component :is="getPostActionIcon('share')" />
                </button>
              </div>

              <button
                class="action-btn bookmark-btn"
                :class="{ bookmarked: post.isBookmarked }"
                @click="toggleBookmark(post.id)"
              >
                <component :is="getPostActionIcon('bookmark', post.isBookmarked)" />
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
                <div class="comment-content">
                  <span class="comment-username">{{ comment.user.username }}</span>
                  <span class="comment-text">{{ comment.content }}</span>
                </div>
                <button
                  v-if="canDeleteComment(comment, post)"
                  @click="deleteCommentFromPost(comment.id, post.id)"
                  @keydown.enter="deleteCommentFromPost(comment.id, post.id)"
                  @keydown.space.prevent="deleteCommentFromPost(comment.id, post.id)"
                  class="delete-comment-btn"
                  title="Hapus komentar"
                  aria-label="Hapus komentar"
                  :disabled="isDeleting"
                >
                  <component :is="utilityIcons.delete" class="w-3 h-3" />
                </button>
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
        <component :is="getNavigationIcon(tab.icon, activeTab === tab.name)" class="nav-icon" />
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
import InstagramLogo from '../../components/icons/InstagramLogo.vue'
import { useAuthStore } from '../../stores/auth'
import { useIcons } from '../../composables/useIcons'
import { useAuth } from '../../composables/useAuth'
import {
  getPosts,
  deletePost,
  likePost,
  unlikePost,
  getLikesCount,
  isPostLiked,
  addComment,
  getComments,
  deleteComment
} from '../../services/postService.js'

const router = useRouter()
const authStore = useAuthStore()
const { headerIcons, getNavigationIcon, getPostActionIcon, utilityIcons } = useIcons()
const { canModifyPost, canDeleteComment, handleAuthError } = useAuth()

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
    const errorInfo = handleAuthError(error)
    alert(errorInfo.message)
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

const deleteCommentFromPost = async (commentId, postId) => {
  if (!confirm('Are you sure you want to delete this comment?')) {
    return
  }

  try {
    await deleteComment(commentId)
    const post = posts.value.find(p => p.id === postId)
    if (post) {
      // Remove comment from local state
      post.comments = post.comments.filter(comment => comment.id !== commentId)
      post.commentsCount = Math.max(0, post.commentsCount - 1)
    }
  } catch (error) {
    console.error('Error deleting comment:', error)
    const errorInfo = handleAuthError(error)
    alert(errorInfo.message)
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
  padding: 0 1rem 0.25rem; /* Reduced bottom padding from 0.5rem */
}

.view-comments-btn {
  background: none;
  border: none;
  color: #6b7280;
  font-size: 0.9rem;
  cursor: pointer;
  margin-bottom: 0.25rem; /* Reduced from 0.5rem */
  padding: 0;
}

.comment {
  margin-bottom: 0.25rem; /* Reduced from 0.5rem */
  line-height: 1.4;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 0.75rem;
  padding: 0.125rem 0; /* Reduced from 0.25rem */
  border-radius: 6px;
  transition: background-color 0.2s ease;
}

.comment:hover {
  background: rgba(243, 244, 246, 0.5);
}

.comment-content {
  flex: 1;
  min-width: 0; /* Allow text to wrap properly */
}

.comment-username {
  font-weight: 600;
  color: #1f2937;
  margin-right: 0.5rem;
}

.comment-text {
  color: #374151;
}

.delete-comment-btn {
  background: none;
  border: none;
  color: #9ca3af;
  cursor: pointer;
  padding: 0.25rem;
  border-radius: 4px;
  transition: all 0.2s ease;
  opacity: 0.8 !important; /* Always visible with !important */
  margin-left: auto;
  flex-shrink: 0;
  font-size: 0.75rem;
  min-width: 24px;
  min-height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.comment:hover .delete-comment-btn {
  opacity: 1 !important;
  color: #6b7280;
}

.delete-comment-btn:hover {
  color: #ef4444 !important;
  background: #fef2f2;
  opacity: 1 !important;
  transform: scale(1.1);
}

.delete-comment-btn:focus {
  outline: 2px solid #3b82f6;
  outline-offset: 2px;
  opacity: 1 !important;
  color: #ef4444;
  background: #fef2f2;
}

.delete-comment-btn:active {
  transform: scale(0.95);
}

.delete-comment-btn:disabled {
  opacity: 0.5 !important;
  cursor: not-allowed;
  transform: none;
}

/* Mobile specific improvements */
@media (max-width: 768px) {
  .comment .delete-comment-btn {
    opacity: 0.9 !important; /* More visible on mobile */
    min-width: 32px; /* Larger touch target */
    min-height: 32px;
    padding: 0.375rem;
  }

  .comment:hover .delete-comment-btn {
    opacity: 1 !important;
  }
}

/* High contrast mode support */
@media (prefers-contrast: high) {
  .delete-comment-btn {
    opacity: 1 !important;
    border: 1px solid currentColor;
  }
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

  .comment {
    padding: 0.25rem 0; /* Reduced from 0.5rem for better mobile spacing */
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
