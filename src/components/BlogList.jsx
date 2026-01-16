import './BlogList.css'

function BlogList({ posts, onSelectPost, onAddPost }) {
  return (
    <div className="blog-list">
      <div className="blog-list-header">
        <h2 className="blog-list-title">Latest Posts</h2>
        <button className="add-post-button" onClick={onAddPost}>
          + New Post
        </button>
      </div>
      <div className="posts-grid">
        {posts.map((post) => (
          <article key={post.id} className="post-card" onClick={() => onSelectPost(post)}>
            <h3 className="post-title">{post.title}</h3>
            <p className="post-date">{post.date}</p>
            <p className="post-excerpt">{post.excerpt}</p>
            <button className="read-more">Read More →</button>
          </article>
        ))}
      </div>
    </div>
  )
}

export default BlogList
