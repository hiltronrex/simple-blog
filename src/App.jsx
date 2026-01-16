import { useState, useEffect } from 'react'
import Header from './components/Header'
import BlogList from './components/BlogList'
import BlogPost from './components/BlogPost'
import AddPost from './components/AddPost'
import { blogPosts as initialPosts } from './blogData'
import './App.css'

const STORAGE_KEY = 'blog-posts'

function App() {
  // Load posts from localStorage or use initial posts
  const [posts, setPosts] = useState(() => {
    const savedPosts = localStorage.getItem(STORAGE_KEY)
    if (savedPosts) {
      try {
        return JSON.parse(savedPosts)
      } catch (error) {
        console.error('Error loading posts from localStorage:', error)
        return initialPosts
      }
    }
    return initialPosts
  })

  const [selectedPost, setSelectedPost] = useState(null)
  const [isAddingPost, setIsAddingPost] = useState(false)

  // Save posts to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(posts))
  }, [posts])

  const handleAddPost = (newPost) => {
    setPosts([newPost, ...posts])
    setIsAddingPost(false)
  }

  const handleHomeClick = () => {
    setSelectedPost(null)
    setIsAddingPost(false)
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
