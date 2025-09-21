<template>
  <div v-if="isOpen" class="modal-overlay" @click="closeModal">
    <div class="modal-content" @click.stop>
      <div class="modal-header">
        <h2 class="modal-title">Create new post</h2>
        <button class="close-btn" @click="closeModal">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <line x1="18" y1="6" x2="6" y2="18"/>
            <line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </button>
      </div>

      <div class="modal-body">
        <div class="image-upload-section">
          <div v-if="!previewImage" class="upload-area" @click="triggerFileInput">
            <div class="upload-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                <circle cx="9" cy="9" r="2"/>
                <path d="M21 15l-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/>
              </svg>
            </div>
            <p class="upload-text">Click to upload an image</p>
            <input
              ref="fileInput"
              type="file"
              accept="image/*"
              @change="handleFileSelect"
              style="display: none"
            >
          </div>

          <div v-else class="image-preview">
            <img :src="previewImage" alt="Preview" class="preview-img" />
            <button class="remove-image-btn" @click="removeImage">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <line x1="18" y1="6" x2="6" y2="18"/>
                <line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </button>
          </div>
        </div>

        <div class="caption-section">
          <textarea
            v-model="caption"
            placeholder="Write a caption..."
            class="caption-input"
            rows="3"
            maxlength="2200"
          ></textarea>
          <div class="caption-footer">
            <span class="char-count">{{ caption.length }}/2200</span>
          </div>
        </div>
      </div>

      <div class="modal-footer">
        <button
          class="share-btn"
          :disabled="!canShare"
          @click="sharePost"
        >
          <span v-if="isLoading">Sharing...</span>
          <span v-else>Share</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { createPost } from '../services/postService.js'

const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['close', 'post-created'])

const fileInput = ref(null)
const previewImage = ref('')
const selectedFile = ref(null)
const caption = ref('')
const isLoading = ref(false)

const canShare = computed(() => {
  return selectedFile.value && !isLoading.value
})

const triggerFileInput = () => {
  fileInput.value?.click()
}

const handleFileSelect = (event) => {
  const file = event.target.files[0]
  if (file && file.type.startsWith('image/')) {
    selectedFile.value = file
    const reader = new FileReader()
    reader.onload = (e) => {
      previewImage.value = e.target.result
    }
    reader.readAsDataURL(file)
  }
}

const removeImage = () => {
  previewImage.value = ''
  selectedFile.value = null
  if (fileInput.value) {
    fileInput.value.value = ''
  }
}

const sharePost = async () => {
  if (!canShare.value) return

  try {
    isLoading.value = true
    const formData = new FormData()
    formData.append('image', selectedFile.value)
    if (caption.value.trim()) {
      formData.append('caption', caption.value.trim())
    }

    await createPost(formData)

    // Reset form
    removeImage()
    caption.value = ''

    emit('post-created')
    emit('close')
  } catch (error) {
    console.error('Error creating post:', error)
    // You could add error handling here
  } finally {
    isLoading.value = false
  }
}

const closeModal = () => {
  if (!isLoading.value) {
    emit('close')
  }
}
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 1rem;
}

.modal-content {
  background: white;
  border-radius: 12px;
  width: 100%;
  max-width: 500px;
  max-height: 90vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.modal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 1.5rem;
  border-bottom: 1px solid #e5e7eb;
}

.modal-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: #1f2937;
  margin: 0;
}

.close-btn {
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

.close-btn:hover {
  background: #f3f4f6;
  color: #374151;
}

.close-btn svg {
  width: 20px;
  height: 20px;
}

.modal-body {
  padding: 1.5rem;
  flex: 1;
  overflow-y: auto;
}

.image-upload-section {
  margin-bottom: 1.5rem;
}

.upload-area {
  border: 2px dashed #d1d5db;
  border-radius: 8px;
  padding: 3rem 2rem;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;
}

.upload-area:hover {
  border-color: #667eea;
  background: rgba(102, 126, 234, 0.05);
}

.upload-icon {
  width: 48px;
  height: 48px;
  margin: 0 auto 1rem;
  color: #9ca3af;
}

.upload-icon svg {
  width: 100%;
  height: 100%;
}

.upload-text {
  color: #6b7280;
  font-size: 0.9rem;
  margin: 0;
}

.image-preview {
  position: relative;
  border-radius: 8px;
  overflow: hidden;
  background: #f9fafb;
}

.preview-img {
  width: 100%;
  height: auto;
  max-height: 300px;
  object-fit: cover;
  display: block;
}

.remove-image-btn {
  position: absolute;
  top: 8px;
  right: 8px;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.5);
  border: none;
  border-radius: 50%;
  color: white;
  cursor: pointer;
  transition: all 0.3s ease;
}

.remove-image-btn:hover {
  background: rgba(0, 0, 0, 0.7);
}

.remove-image-btn svg {
  width: 16px;
  height: 16px;
}

.caption-section {
  display: flex;
  flex-direction: column;
}

.caption-input {
  width: 100%;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  padding: 0.75rem;
  font-size: 0.9rem;
  line-height: 1.5;
  resize: vertical;
  min-height: 80px;
  font-family: inherit;
  transition: border-color 0.3s ease;
}

.caption-input:focus {
  outline: none;
  border-color: #667eea;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

.caption-input::placeholder {
  color: #9ca3af;
}

.caption-footer {
  display: flex;
  justify-content: flex-end;
  margin-top: 0.5rem;
}

.char-count {
  font-size: 0.8rem;
  color: #9ca3af;
}

.modal-footer {
  padding: 1rem 1.5rem;
  border-top: 1px solid #e5e7eb;
  display: flex;
  justify-content: flex-end;
}

.share-btn {
  padding: 0.5rem 1.5rem;
  background: #667eea;
  color: white;
  border: none;
  border-radius: 20px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
}

.share-btn:hover:not(:disabled) {
  background: #5a6fd8;
  transform: translateY(-1px);
}

.share-btn:disabled {
  background: #d1d5db;
  cursor: not-allowed;
  transform: none;
}

/* Responsive */
@media (max-width: 640px) {
  .modal-overlay {
    padding: 0.5rem;
  }

  .modal-content {
    max-height: 95vh;
  }

  .modal-header,
  .modal-body,
  .modal-footer {
    padding-left: 1rem;
    padding-right: 1rem;
  }

  .upload-area {
    padding: 2rem 1rem;
  }
}
</style>
