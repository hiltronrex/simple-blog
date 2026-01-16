import { useState, useEffect } from 'react'
import Header from './components/Header'
import BlogList from './components/BlogList'
import BlogPost from './components/BlogPost'
import AddPost from './components/AddPost'
import './App.css'

const API_URL = import.meta.env.PROD ? '/api' : 'http://localhost:8888/api'

function App() {
  const [posts, setPosts] = useState([])
  const [selectedPost, setSelectedPost] = useState(null)
  const [isAddingPost, setIsAddingPost] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Fetch posts from API on mount
  useEffect(() => {
    fetchPosts()
  }, [])

  const fetchPosts = async () => {
    try {
      setLoading(true)
      const response = await fetch(`${API_URL}/posts`)
      if (!response.ok) {
        throw new Error('Failed to fetch posts')
      }
      const data = await response.json()
      setPosts(data)
      setError(null)
    } catch (err) {
      console.error('Error fetching posts:', err)
      setError('Failed to load posts. Please try again later.')
    } finally {
      setLoading(false)
    }
  }

  const handleAddPost = async (newPost) => {
    try {
      const response = await fetch(`${API_URL}/posts/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newPost),
      })

      if (!response.ok) {
        throw new Error('Failed to create post')
      }

      const createdPost = await response.json()
      setPosts([createdPost, ...posts])
      setIsAddingPost(false)
    } catch (err) {
      console.error('Error creating post:', err)
      alert('Failed to create post. Please try again.')
    }
  }

  const handleHomeClick = () => {
    setSelectedPost(null)
    setIsAddingPost(false)
  }

  if (loading) {
    return (
      <div className="app">
        <Header onHomeClick={handleHomeClick} />
        <main className="main-content">
          <div style={{ textAlign: 'center', padding: '2rem' }}>
            <p>Loading posts...</p>
          </div>
        </main>
      </div>
    )
  }

  if (error) {
    return (
      <div className="app">
        <Header onHomeClick={handleHomeClick} />
        <main className="main-content">
          <div style={{ textAlign: 'center', padding: '2rem', color: '#DA291C' }}>
            <p>{error}</p>
            <button onClick={fetchPosts} style={{ marginTop: '1rem', padding: '0.5rem 1rem', cursor: 'pointer' }}>
              Retry
            </button>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="app">
      <Header onHomeClick={handleHomeClick} />
      <main className="main-content">
        {isAddingPost ? (
          <AddPost
            onAddPost={handleAddPost}
            onCancel={() => setIsAddingPost(false)}
          />
        ) : selectedPost ? (
          <BlogPost post={selectedPost} onBack={() => setSelectedPost(null)} />
        ) : (
          <BlogList
            posts={posts}
            onSelectPost={setSelectedPost}
            onAddPost={() => setIsAddingPost(true)}
          />
        )}
      </main>
      <footer className="footer">
        <p>&copy; 2026 Simon's Blog. Built with React.</p>
      </footer>
    </div>
  )
}

export default App
