import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import './Projects.css';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetchProjects();
  }, [filter]);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const params = {};
      if (filter !== 'all') {
        params.category = filter;
      }
      const response = await api.get('/projects', { params });
      setProjects(response.data);
    } catch (err) {
      console.error('Failed to fetch projects:', err);
      setError('Failed to load projects');
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

  const categories = ['all', 'web', 'mobile', 'desktop', 'other'];

  return (
    <div className="projects-page">
      <div className="container">
        <h1>Projects</h1>
        {error && <div className="error-message">{error}</div>}

        <div className="projects-filters">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setFilter(category)}
              className={`filter-btn ${filter === category ? 'active' : ''}`}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>

        {projects.length > 0 ? (
          <div className="projects-grid">
            {projects.map((project) => (
              <div key={project._id} className="project-card">
                <div className="project-image">
                  {project.imageUrl ? (
                    <img src={project.imageUrl} alt={project.title} />
                  ) : (
                    <div className="placeholder-image">No Image</div>
                  )}
                </div>
                <div className="project-content">
                  <h3>{project.title}</h3>
                  <p>{project.shortDescription || `${project.description.substring(0, 150)}...`}</p>
                  <div className="project-tags">
                    {project.technologies?.map((tech, idx) => (
                      <span key={idx} className="tag">{tech}</span>
                    ))}
                  </div>
                  <div className="project-links">
                    <Link to={`/projects/${project._id}`} className="btn btn-primary">
                      View Details
                    </Link>
                    {project.liveUrl && (
                      <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
                        Live Demo
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>No projects available</p>
        )}
      </div>
    </div>
  );
};

export default Projects;

