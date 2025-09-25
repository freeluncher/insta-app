<template>
  <div v-if="isOpen" class="modal-overlay" @click="closeModal">
    <div class="modal-container" @click.stop>
      <div class="modal-content">
        <!-- Header -->
        <div class="modal-header">
          <div class="user-info">
            <img :src="post?.user?.avatar" :alt="post?.user?.username" class="user-avatar" />
            <span class="username">{{ post?.user?.username }}</span>
          </div>
          <button class="close-btn" @click="closeModal">
            <component :is="icons.XMarkIcon" class="w-6 h-6" />
          </button>
        </div>

        <!-- Image -->
        <div class="image-container">
          <img :src="post?.imageUrl" :alt="post?.caption" class="post-image" />
        </div>

        <!-- Actions -->
        <div class="actions-section">
          <div class="action-buttons">
            <button class="action-btn" @click="toggleLike" :class="{ liked: post?.isLiked }">
              <component :is="post?.isLiked ? icons.HeartSolidIcon : icons.HeartIcon" class="w-6 h-6" />
            </button>
            <button class="action-btn" @click="focusComment">
              <component :is="icons.ChatBubbleOvalLeftIcon" class="w-6 h-6" />
            </button>
            <button class="action-btn" @click="sharePost">
              <component :is="icons.PaperAirplaneIcon" class="w-6 h-6" />
            </button>
          </div>
        </div>

        <!-- Stats -->
        <div class="stats-section">
          <p class="likes-count">{{ formatNumber(post?.likesCount || 0) }} likes</p>
        </div>

        <!-- Caption -->
        <div class="caption-section" v-if="post?.caption">
          <p class="caption">
            <span class="username">{{ post?.user?.username }}</span>
            {{ post?.caption }}
          </p>
        </div>

        <!-- Comments -->
        <div class="comments-section">
          <div class="comments-container">
            <div v-for="comment in comments" :key="comment.id" class="comment-item">
              <img :src="comment.user.avatar" :alt="comment.user.username" class="comment-avatar" />
              <div class="comment-content">
                <p class="comment-text">
                  <span class="comment-username">{{ comment.user.username }}</span>
                  {{ comment.content }}
                </p>
                <div class="comment-actions">
                  <span class="comment-time">{{ formatTime(comment.created_at) }}</span>
                  <button class="comment-like-btn" @click="toggleCommentLike(comment)">
                    {{ comment.isLiked ? 'Unlike' : 'Like' }}
                  </button>
                </div>
              </div>
              <button class="comment-heart" @click="toggleCommentLike(comment)">
                <component :is="comment.isLiked ? icons.HeartSolidIcon : icons.HeartIcon" class="w-4 h-4" />
              </button>
            </div>
          </div>

          <!-- Add Comment -->
          <div class="add-comment">
            <input
              ref="commentInput"
              v-model="newComment"
              type="text"
              placeholder="Add a comment..."
              class="comment-input"
              @keyup.enter="addComment"
            />
            <button
              v-if="newComment.trim()"
              @click="addComment"
              class="post-comment-btn"
            >
              Post
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, nextTick, watch } from 'vue'
import { useIcons } from '../composables/useIcons'

const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false
  },
  post: {
    type: Object,
    default: null
  }
})

const emit = defineEmits(['close', 'like', 'unlike', 'comment'])

const { icons } = useIcons()

// Reactive data
const newComment = ref('')
const commentInput = ref(null)
const comments = ref([])

// Mock comments data
const mockComments = ref([
  {
    id: 1,
    content: 'Beautiful photo! 😍',
    user: {
      id: 2,
      username: 'alice_wonder',
      avatar: 'https://i.pravatar.cc/150?img=2'
    },
    created_at: '2024-01-15T10:30:00Z',
    isLiked: false
  },
  {
    id: 2,
    content: 'Amazing capture! Where was this taken?',
    user: {
      id: 3,
      username: 'bob_photo',
      avatar: 'https://i.pravatar.cc/150?img=3'
    },
    created_at: '2024-01-15T11:15:00Z',
    isLiked: true
  },
  {
    id: 3,
    content: 'Love the composition! 📸',
    user: {
      id: 4,
      username: 'carol_art',
      avatar: 'https://i.pravatar.cc/150?img=4'
    },
    created_at: '2024-01-15T12:00:00Z',
    isLiked: false
  }
])

// Watch for post changes
watch(() => props.post, (newPost) => {
  if (newPost) {
    // Load comments for this post
    loadComments()
  }
}, { immediate: true })

// Methods
const closeModal = () => {
  emit('close')
}

const toggleLike = () => {
  if (props.post?.isLiked) {
    emit('unlike', props.post)
  } else {
    emit('like', props.post)
  }
}

const focusComment = async () => {
  await nextTick()
  if (commentInput.value) {
    commentInput.value.focus()
  }
}

const sharePost = () => {
  // Implement share functionality
  console.log('Share post:', props.post?.id)
}

const addComment = () => {
  if (!newComment.value.trim()) return

  const comment = {
    id: Date.now(),
    content: newComment.value.trim(),
    user: {
      id: 1, // Current user
      username: 'current_user',
      avatar: 'https://i.pravatar.cc/150?img=1'
    },
    created_at: new Date().toISOString(),
    isLiked: false
  }

  comments.value.push(comment)
  emit('comment', { postId: props.post?.id, comment: newComment.value.trim() })
  newComment.value = ''
}

const toggleCommentLike = (comment) => {
  comment.isLiked = !comment.isLiked
}

const loadComments = () => {
  // TODO: Load real comments from API
  // For now, use mock data
  comments.value = [...mockComments.value]
}

const formatNumber = (num) => {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M'
  } else if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K'
  }
  return num.toString()
}

const formatTime = (dateString) => {
  const date = new Date(dateString)
  const now = new Date()
  const diffInSeconds = Math.floor((now - date) / 1000)

  if (diffInSeconds < 60) return `${diffInSeconds}s`
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m`
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h`
  if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)}d`
  return `${Math.floor(diffInSeconds / 604800)}w`
}
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.75);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 1rem;
}

.modal-container {
  background: white;
  border-radius: 12px;
  max-width: 500px;
  width: 100%;
  max-height: 90vh;
  overflow: hidden;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
}

.modal-content {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.modal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  border-bottom: 1px solid #e5e7eb;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.user-avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  object-fit: cover;
}

.username {
  font-weight: 600;
  color: #111827;
}

.close-btn {
  background: none;
  border: none;
  cursor: pointer;
  color: #6b7280;
  padding: 0.5rem;
  border-radius: 50%;
  transition: all 0.2s;
}

.close-btn:hover {
  background: #f3f4f6;
  color: #111827;
}

.image-container {
  position: relative;
  width: 100%;
  aspect-ratio: 1;
  overflow: hidden;
}

.post-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.actions-section {
  padding: 1rem;
  border-bottom: 1px solid #e5e7eb;
}

.action-buttons {
  display: flex;
  gap: 1rem;
}

.action-btn {
  background: none;
  border: none;
  cursor: pointer;
  color: #111827;
  padding: 0.5rem;
  border-radius: 50%;
  transition: all 0.2s;
}

.action-btn:hover {
  background: #f3f4f6;
}

.action-btn.liked {
  color: #ef4444;
}

.stats-section {
  padding: 0 1rem;
  border-bottom: 1px solid #e5e7eb;
}

.likes-count {
  font-weight: 600;
  color: #111827;
  margin: 0;
  padding: 0.5rem 0;
}

.caption-section {
  padding: 0.75rem 1rem;
  border-bottom: 1px solid #e5e7eb;
}

.caption {
  margin: 0;
  color: #111827;
  line-height: 1.5;
}

.caption .username {
  font-weight: 600;
  margin-right: 0.5rem;
}

.comments-section {
  flex: 1;
  display: flex;
  flex-direction: column;
  min-height: 0;
}

.comments-container {
  flex: 1;
  overflow-y: auto;
  padding: 1rem;
  max-height: 300px;
}

.comment-item {
  display: flex;
  gap: 0.75rem;
  margin-bottom: 1rem;
}

.comment-avatar {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  object-fit: cover;
  flex-shrink: 0;
}

.comment-content {
  flex: 1;
  min-width: 0;
}

.comment-text {
  margin: 0;
  color: #111827;
  line-height: 1.4;
}

.comment-username {
  font-weight: 600;
  margin-right: 0.5rem;
}

.comment-actions {
  display: flex;
  gap: 1rem;
  margin-top: 0.25rem;
}

.comment-time {
  font-size: 0.75rem;
  color: #6b7280;
}

.comment-like-btn {
  background: none;
  border: none;
  font-size: 0.75rem;
  color: #6b7280;
  cursor: pointer;
  font-weight: 600;
}

.comment-like-btn:hover {
  color: #111827;
}

.comment-heart {
  background: none;
  border: none;
  cursor: pointer;
  color: #6b7280;
  padding: 0.25rem;
  border-radius: 50%;
  transition: all 0.2s;
  flex-shrink: 0;
}

.comment-heart:hover {
  background: #f3f4f6;
}

.add-comment {
  display: flex;
  align-items: center;
  padding: 1rem;
  border-top: 1px solid #e5e7eb;
  background: white;
}

.comment-input {
  flex: 1;
  border: none;
  outline: none;
  font-size: 0.875rem;
  color: #111827;
}

.comment-input::placeholder {
  color: #9ca3af;
}

.post-comment-btn {
  background: none;
  border: none;
  color: #3b82f6;
  font-weight: 600;
  cursor: pointer;
  padding: 0.5rem;
  font-size: 0.875rem;
}

.post-comment-btn:hover {
  color: #1d4ed8;
}

/* Responsive */
@media (max-width: 640px) {
  .modal-container {
    max-width: 100%;
    margin: 0;
    border-radius: 0;
    height: 100vh;
    max-height: 100vh;
  }

  .modal-overlay {
    padding: 0;
  }
}

/* Scrollbar styling */
.comments-container::-webkit-scrollbar {
  width: 6px;
}

.comments-container::-webkit-scrollbar-track {
  background: #f1f5f9;
  border-radius: 3px;
}

.comments-container::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 3px;
}

.comments-container::-webkit-scrollbar-thumb:hover {
  background: #94a3b8;
}
</style>
