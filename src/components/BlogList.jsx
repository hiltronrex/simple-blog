import { blogPosts } from '../blogData'
import './BlogList.css'

function BlogList({ onSelectPost }) {
  return (
    <div className="blog-list">
      <h2 className="blog-list-title">Latest Posts</h2>
      <div className="posts-grid">
        {blogPosts.map((post) => (
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
