import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import './Blog.css';

const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchBlogs();
  }, [page]);

  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const response = await api.get(`/blog?page=${page}&limit=9`);
      setBlogs(response.data.blogs);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error('Failed to fetch blogs:', error);
      setError('Failed to load blog posts');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="loading">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="blog-page">
      <div className="container">
        <h1>Blog Posts</h1>
        {error && <div className="error-message">{error}</div>}
        
        {blogs.length > 0 ? (
          <>
            <div className="blog-list">
              {blogs.map((post) => (
                <article key={post._id} className="blog-item">
                  <div className="blog-item-image">
                    {post.featuredImage ? (
                      <img src={post.featuredImage} alt={post.title} />
                    ) : (
                      <div className="placeholder-image">No Image</div>
                    )}
                  </div>
                  <div className="blog-item-content">
                    <h2>{post.title}</h2>
                    <p className="blog-excerpt">{post.excerpt}</p>
                    <div className="blog-meta">
                      <span>By {post.author?.username || 'Admin'}</span>
                      <span>{new Date(post.publishedAt).toLocaleDateString()}</span>
                      <span>{post.views} views</span>
                    </div>
                    {post.tags && post.tags.length > 0 && (
                      <div className="blog-tags">
                        {post.tags.map((tag, idx) => (
                          <span key={idx} className="tag">{tag}</span>
                        ))}
                      </div>
                    )}
                    <Link to={`/blog/${post._id}`} className="btn btn-primary">
                      Read More
                    </Link>
                  </div>
                </article>
              ))}
            </div>
            
            {totalPages > 1 && (
              <div className="pagination">
                <button
                  onClick={() => setPage(p => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="btn btn-secondary"
                >
                  Previous
                </button>
                <span>Page {page} of {totalPages}</span>
                <button
                  onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                  className="btn btn-secondary"
                >
                  Next
                </button>
              </div>
            )}
          </>
        ) : (
          <p>No blog posts available</p>
        )}
      </div>
    </div>
  );
};

export default Blog;

