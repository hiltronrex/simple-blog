import './BlogPost.css'

function BlogPost({ post, onBack }) {
  // Simple markdown-like rendering for the content
  const renderContent = (content) => {
    return content.split('\n').map((line, index) => {
      if (line.startsWith('## ')) {
        return <h2 key={index} className="post-heading">{line.slice(3)}</h2>
      } else if (line.startsWith('- ')) {
        return <li key={index} className="post-list-item">{line.slice(2)}</li>
      } else if (line.trim() === '') {
        return <br key={index} />
      } else {
        return <p key={index} className="post-paragraph">{line}</p>
      }
    })
  }

  return (
    <article className="blog-post">
      <button className="back-button" onClick={onBack}>
        ← Back to Posts
      </button>
      <h1 className="post-full-title">{post.title}</h1>
      <p className="post-full-date">{post.date}</p>
      <div className="post-content">
        {renderContent(post.content)}
      </div>
    </article>
  )
}

export default BlogPost
