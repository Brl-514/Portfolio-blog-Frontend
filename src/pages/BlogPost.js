import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';
import './BlogPost.css';

const BlogPost = () => {
  const { id } = useParams();
  const { isAuthenticated } = useAuth();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [commentBody, setCommentBody] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [commentError, setCommentError] = useState('');

  useEffect(() => {
    fetchPost();
    fetchComments();
  }, [id]);

  const fetchPost = async () => {
    try {
      setLoading(true);
      const response = await api.get(`/blog/${id}`);
      setPost(response.data);
    } catch (error) {
      console.error('Failed to fetch blog post:', error);
      setError('Failed to load blog post');
    } finally {
      setLoading(false);
    }
  };

  const fetchComments = async () => {
    try {
      const response = await api.get(`/blog/${id}/comments`);
      setComments(response.data);
    } catch (err) {
      console.error('Failed to fetch comments:', err);
    }
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    setCommentError('');

    if (!commentBody.trim()) {
      setCommentError('Comment cannot be empty');
      return;
    }

    try {
      setSubmitting(true);
      const response = await api.post(`/blog/${id}/comments`, { body: commentBody });
      setComments((prev) => [response.data, ...prev]);
      setCommentBody('');
    } catch (err) {
      setCommentError(err.response?.data?.message || 'Failed to post comment');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="loading">
        <div className="spinner"></div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="container">
        <div className="error-message">{error || 'Blog post not found'}</div>
      </div>
    );
  }

  return (
    <div className="blog-post-page">
      <div className="container">
        <article className="blog-post">
          {post.featuredImage && (
            <div className="blog-post-image">
              <img src={post.featuredImage} alt={post.title} />
            </div>
          )}
          <div className="blog-post-content">
            <h1>{post.title}</h1>
            <div className="blog-post-meta">
              <span>By {post.author?.username || 'Admin'}</span>
              <span>{new Date(post.publishedAt).toLocaleDateString()}</span>
              <span>{post.views} views</span>
            </div>
            {post.tags && post.tags.length > 0 && (
              <div className="blog-post-tags">
                {post.tags.map((tag, idx) => (
                  <span key={idx} className="tag">{tag}</span>
                ))}
              </div>
            )}
            <div className="blog-post-body">
              {post.content.split('\n').map((paragraph, idx) => (
                <p key={idx}>{paragraph}</p>
              ))}
            </div>
          </div>
        </article>
        <section className="comments-section">
          <h2>Comments</h2>
          {isAuthenticated ? (
            <form className="comment-form" onSubmit={handleCommentSubmit}>
              <textarea
                value={commentBody}
                onChange={(e) => setCommentBody(e.target.value)}
                placeholder="Share your thoughts..."
                rows="4"
              />
              {commentError && <div className="error-message">{commentError}</div>}
              <button type="submit" className="btn btn-primary" disabled={submitting}>
                {submitting ? 'Posting...' : 'Post Comment'}
              </button>
            </form>
          ) : (
            <p className="comment-hint">Please log in to post a comment.</p>
          )}

          <div className="comments-list">
            {comments.length > 0 ? (
              comments.map((comment) => (
                <div key={comment._id} className="comment-card">
                  <div className="comment-meta">
                    <span className="comment-author">{comment.author?.username || 'User'}</span>
                    <span className="comment-date">{new Date(comment.createdAt).toLocaleDateString()}</span>
                  </div>
                  <p>{comment.body}</p>
                </div>
              ))
            ) : (
              <p>No comments yet. Be the first to share!</p>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default BlogPost;

