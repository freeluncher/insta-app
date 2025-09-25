import axios from 'axios'

export async function getPosts() {
  return axios.get('/api/posts')
}

export async function getPost(postId) {
  return axios.get(`/api/posts/${postId}`)
}

export async function createPost(postData) {
  const formData = new FormData()

  if (postData.caption) {
    formData.append('caption', postData.caption)
  }

  if (postData.image) {
    formData.append('image', postData.image)
  }

  return axios.post('/api/posts', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}

export async function updatePost(postId, postData) {
  const formData = new FormData()

  if (postData.caption) {
    formData.append('caption', postData.caption)
  }

  if (postData.image) {
    formData.append('image', postData.image)
  }

  return axios.put(`/api/posts/${postId}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}

export async function deletePost(postId) {
  return axios.delete(`/api/posts/${postId}`)
}

export async function likePost(postId) {
  return axios.post(`/api/posts/${postId}/like`)
}

export async function unlikePost(postId) {
  return axios.delete(`/api/posts/${postId}/like`)
}

export async function getLikesCount(postId) {
  return axios.get(`/api/posts/${postId}/likes/count`)
}

export async function isPostLiked(postId) {
  return axios.get(`/api/posts/${postId}/likes/is-liked`)
}

export async function addComment(postId, content) {
  return axios.post(`/api/posts/${postId}/comments`, { content })
}

export async function getComments(postId) {
  return axios.get(`/api/posts/${postId}/comments`)
}

export async function deleteComment(commentId) {
  return axios.delete(`/api/comments/${commentId}`)
}
