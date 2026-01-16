import { useState } from 'react'
import './AddPost.css'

function AddPost({ onAddPost, onCancel }) {
  const [title, setTitle] = useState('')
  const [excerpt, setExcerpt] = useState('')
  const [content, setContent] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!title.trim() || !excerpt.trim() || !content.trim()) {
      alert('Please fill in all fields')
      return
    }

    const newPost = {
      id: Date.now(),
      title: title.trim(),
      date: new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      }),
      excerpt: excerpt.trim(),
      content: content.trim()
    }

    onAddPost(newPost)
    setTitle('')
    setExcerpt('')
    setContent('')
  }

  return (
    <div className="add-post">
      <h2 className="add-post-title">Create New Post</h2>
      <form onSubmit={handleSubmit} className="add-post-form">
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter post title"
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label htmlFor="excerpt">Excerpt</label>
          <textarea
            id="excerpt"
            value={excerpt}
            onChange={(e) => setExcerpt(e.target.value)}
            placeholder="Brief summary of your post"
            rows="3"
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label htmlFor="content">Content</label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Write your post content here. Use ## for headings and - for bullet points."
            rows="12"
            className="form-input"
          />
        </div>

        <div className="form-actions">
          <button type="button" onClick={onCancel} className="cancel-button">
            Cancel
          </button>
          <button type="submit" className="submit-button">
            Publish Post
          </button>
        </div>
      </form>
    </div>
  )
}

export default AddPost
