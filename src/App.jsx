import { useState } from 'react'
import Header from './components/Header'
import BlogList from './components/BlogList'
import BlogPost from './components/BlogPost'
import './App.css'

function App() {
  const [selectedPost, setSelectedPost] = useState(null)

  return (
    <div className="app">
      <Header onHomeClick={() => setSelectedPost(null)} />
      <main className="main-content">
        {selectedPost ? (
          <BlogPost post={selectedPost} onBack={() => setSelectedPost(null)} />
        ) : (
          <BlogList onSelectPost={setSelectedPost} />
        )}
      </main>
      <footer className="footer">
        <p>&copy; 2026 My Blog. Built with React and deployed on Netlify.</p>
      </footer>
    </div>
  )
}

export default App
