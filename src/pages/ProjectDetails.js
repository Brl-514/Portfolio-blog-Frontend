import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from '../services/api';
import './ProjectDetails.css';

const ProjectDetails = () => {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchProject();
  }, [id]);

  const fetchProject = async () => {
    try {
      setLoading(true);
      const response = await api.get(`/projects/${id}`);
      setProject(response.data);
    } catch (err) {
      console.error('Failed to fetch project:', err);
      setError('Failed to load project');
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

  if (error || !project) {
    return (
      <div className="container">
        <div className="error-message">{error || 'Project not found'}</div>
      </div>
    );
  }

  return (
    <div className="project-details-page">
      <div className="container">
        <div className="project-details-card">
          {project.imageUrl && (
            <div className="project-details-image">
              <img src={project.imageUrl} alt={project.title} />
            </div>
          )}
          <div className="project-details-content">
            <h1>{project.title}</h1>
            <div className="project-details-meta">
              <span className="category">{project.category}</span>
              {project.featured && <span className="featured">Featured</span>}
            </div>
            <div className="project-details-description">
              {project.description.split('\n').map((paragraph, idx) => (
                <p key={idx}>{paragraph}</p>
              ))}
            </div>
            {project.technologies?.length > 0 && (
              <div className="project-details-technologies">
                <h3>Technologies Used</h3>
                <div className="technologies-list">
                  {project.technologies.map((tech, idx) => (
                    <span key={idx} className="tech-tag">{tech}</span>
                  ))}
                </div>
              </div>
            )}
            <div className="project-details-links">
              {project.liveUrl && (
                <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                  View Live Demo
                </a>
              )}
              {project.repoUrl && (
                <a href={project.repoUrl} target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
                  View Repository
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetails;

