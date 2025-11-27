import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import './Home.css';

const Home = () => {
  const [featuredBlogs, setFeaturedBlogs] = useState([]);
  const [featuredProjects, setFeaturedProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFeaturedContent();
  }, []);

  const fetchFeaturedContent = async () => {
    try {
      const [blogsRes, projectsRes] = await Promise.all([
        api.get('/blog/featured/list'),
        api.get('/projects', { params: { featured: true } })
      ]);
      setFeaturedBlogs(blogsRes.data);
      setFeaturedProjects(projectsRes.data);
    } catch (error) {
      console.error('Failed to fetch featured content:', error);
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
    <div className="home">
      <section className="hero">
        <div className="container">
          <h1>Welcome to My Portfolio & Blog</h1>
          <p>Explore my projects, read articles, and get in touch</p>
          <div className="hero-buttons">
            <Link to="/projects" className="btn btn-primary">View Projects</Link>
            <Link to="/blog" className="btn btn-secondary">Read Blog</Link>
          </div>
        </div>
      </section>

      <section className="featured-section">
        <div className="container">
          <h2>Featured Projects</h2>
          <div className="projects-grid">
            {featuredProjects.length > 0 ? (
              featuredProjects.map((item) => (
                <div key={item._id} className="project-card">
                  <div className="project-image">
                    {item.imageUrl ? (
                      <img src={item.imageUrl} alt={item.title} />
                    ) : (
                      <div className="placeholder-image">No Image</div>
                    )}
                  </div>
                  <div className="project-content">
                    <h3>{item.title}</h3>
                    <p>{item.shortDescription || item.description.substring(0, 100)}...</p>
                    <div className="project-tags">
                      {item.technologies?.slice(0, 3).map((tech, idx) => (
                        <span key={idx} className="tag">{tech}</span>
                      ))}
                    </div>
                    <Link to={`/projects/${item._id}`} className="btn btn-primary">
                      View Details
                    </Link>
                  </div>
                </div>
              ))
            ) : (
              <p>No featured projects available</p>
            )}
          </div>
        </div>
      </section>

      <section className="featured-section">
        <div className="container">
          <h2>Latest Blog Posts</h2>
          <div className="blog-grid">
            {featuredBlogs.length > 0 ? (
              featuredBlogs.map((post) => (
                <div key={post._id} className="blog-card">
                  <div className="blog-image">
                    {post.featuredImage ? (
                      <img src={post.featuredImage} alt={post.title} />
                    ) : (
                      <div className="placeholder-image">No Image</div>
                    )}
                  </div>
                  <div className="blog-content">
                    <h3>{post.title}</h3>
                    <p className="blog-excerpt">{post.excerpt}</p>
                    <div className="blog-meta">
                      <span>By {post.author?.username || 'Admin'}</span>
                      <span>{new Date(post.publishedAt).toLocaleDateString()}</span>
                    </div>
                    <Link to={`/blog/${post._id}`} className="btn btn-primary">
                      Read More
                    </Link>
                  </div>
                </div>
              ))
            ) : (
              <p>No blog posts available</p>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;

