import React, { useState, useEffect } from 'react';
import api from '../services/api';
import './Admin.css';

const Admin = () => {
  const [activeTab, setActiveTab] = useState('blog');
  const [blogs, setBlogs] = useState([]);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [editingItem, setEditingItem] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState(getInitialFormData('blog'));

  function getInitialFormData(type) {
    if (type === 'blog') {
      return {
        title: '',
        content: '',
        excerpt: '',
        tags: '',
        featuredImage: '',
        published: false
      };
    }
    return {
      title: '',
      description: '',
      shortDescription: '',
      technologies: '',
      imageUrl: '',
      liveUrl: '',
      repoUrl: '',
      category: 'web',
      featured: false,
      displayOrder: 0
    };
  }

  useEffect(() => {
    fetchData();
  }, [activeTab]);

  const fetchData = async () => {
    try {
      setLoading(true);
      if (activeTab === 'blog') {
        const response = await api.get('/blog/admin/list');
        setBlogs(response.data);
      } else {
        const response = await api.get('/projects');
        setProjects(response.data);
      }
    } catch (err) {
      console.error('Failed to fetch data:', err);
      setError('Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleEdit = (item) => {
    setEditingItem(item);
    if (activeTab === 'blog') {
      setFormData({
        title: item.title,
        content: item.content,
        excerpt: item.excerpt || '',
        tags: item.tags?.join(', ') || '',
        featuredImage: item.featuredImage || '',
        published: item.published
      });
    } else {
      setFormData({
        title: item.title,
        description: item.description,
        shortDescription: item.shortDescription || '',
        technologies: item.technologies?.join(', ') || '',
        imageUrl: item.imageUrl || '',
        liveUrl: item.liveUrl || '',
        repoUrl: item.repoUrl || '',
        category: item.category,
        featured: item.featured,
        displayOrder: item.displayOrder || 0
      });
    }
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this item?')) {
      return;
    }

    try {
      const endpoint = activeTab === 'blog' ? `/blog/${id}` : `/projects/${id}`;
      await api.delete(endpoint);
      setSuccess('Item deleted successfully');
      fetchData();
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError('Failed to delete item');
      setTimeout(() => setError(''), 3000);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const submitData = { ...formData };
      if (activeTab === 'blog') {
        submitData.tags = submitData.tags
          ? submitData.tags.split(',').map((t) => t.trim()).filter(Boolean)
          : [];
      } else {
        submitData.technologies = submitData.technologies
          ? submitData.technologies.split(',').map((t) => t.trim()).filter(Boolean)
          : [];
      }

      if (editingItem) {
        const endpoint = activeTab === 'blog' ? `/blog/${editingItem._id}` : `/projects/${editingItem._id}`;
        await api.put(endpoint, submitData);
        setSuccess('Item updated successfully');
      } else {
        const endpoint = activeTab === 'blog' ? '/blog' : '/projects';
        await api.post(endpoint, submitData);
        setSuccess('Item created successfully');
      }

      setShowForm(false);
      setEditingItem(null);
      setFormData(getInitialFormData(activeTab));
      fetchData();
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save item');
      setTimeout(() => setError(''), 3000);
    }
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingItem(null);
    setFormData(getInitialFormData(activeTab));
  };


  if (loading) {
    return (
      <div className="loading">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="admin-page">
      <div className="container">
        <h1>Admin Panel</h1>
        
        {error && <div className="error-message">{error}</div>}
        {success && <div className="success-message">{success}</div>}

        <div className="admin-tabs">
          {['blog', 'project'].map((tab) => (
            <button
              key={tab}
              onClick={() => {
                setActiveTab(tab);
                setShowForm(false);
                setEditingItem(null);
              }}
              className={`tab-btn ${activeTab === tab ? 'active' : ''}`}
            >
              {tab === 'blog' ? 'Blog Posts' : tab === 'project' ? 'Projects' : 'Messages'}
            </button>
          ))}
        </div>

        <div className="admin-actions">
          <button onClick={() => setShowForm(true)} className="btn btn-primary">
            Add New {activeTab === 'blog' ? 'Blog Post' : 'Project'}
          </button>
        </div>

        {showForm && (
          <div className="admin-form-container">
            <h2>{editingItem ? 'Edit' : 'Create'} {activeTab === 'blog' ? 'Blog Post' : 'Project'}</h2>
            <form onSubmit={handleSubmit} className="admin-form">
              {activeTab === 'blog' ? (
                <>
                  <div className="form-group">
                    <label>Title *</label>
                    <input type="text" name="title" value={formData.title} onChange={handleChange} required />
                  </div>
                  <div className="form-group">
                    <label>Content *</label>
                    <textarea name="content" value={formData.content} onChange={handleChange} rows="10" required />
                  </div>
                  <div className="form-group">
                    <label>Excerpt</label>
                    <textarea name="excerpt" value={formData.excerpt} onChange={handleChange} rows="3" />
                  </div>
                  <div className="form-group">
                    <label>Tags (comma-separated)</label>
                    <input type="text" name="tags" value={formData.tags} onChange={handleChange} />
                  </div>
                  <div className="form-group">
                    <label>Featured Image URL</label>
                    <input type="text" name="featuredImage" value={formData.featuredImage} onChange={handleChange} />
                  </div>
                  <div className="form-group checkbox-group">
                    <label>
                      <input type="checkbox" name="published" checked={formData.published} onChange={handleChange} />
                      Published
                    </label>
                  </div>
                </>
              ) : (
                <>
                  <div className="form-group">
                    <label>Title *</label>
                    <input type="text" name="title" value={formData.title} onChange={handleChange} required />
                  </div>
                  <div className="form-group">
                    <label>Description *</label>
                    <textarea name="description" value={formData.description} onChange={handleChange} rows="8" required />
                  </div>
                  <div className="form-group">
                    <label>Short Description</label>
                    <textarea name="shortDescription" value={formData.shortDescription} onChange={handleChange} rows="3" />
                  </div>
                  <div className="form-group">
                    <label>Technologies (comma-separated)</label>
                    <input type="text" name="technologies" value={formData.technologies} onChange={handleChange} />
                  </div>
                  <div className="form-group">
                    <label>Image URL</label>
                    <input type="text" name="imageUrl" value={formData.imageUrl} onChange={handleChange} />
                  </div>
                  <div className="form-group">
                    <label>Live URL</label>
                    <input type="text" name="liveUrl" value={formData.liveUrl} onChange={handleChange} />
                  </div>
                  <div className="form-group">
                    <label>Repository URL</label>
                    <input type="text" name="repoUrl" value={formData.repoUrl} onChange={handleChange} />
                  </div>
                  <div className="form-group">
                    <label>Category</label>
                    <select name="category" value={formData.category} onChange={handleChange}>
                      <option value="web">Web</option>
                      <option value="mobile">Mobile</option>
                      <option value="desktop">Desktop</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Display Order</label>
                    <input type="number" name="displayOrder" value={formData.displayOrder} onChange={handleChange} />
                  </div>
                  <div className="form-group checkbox-group">
                    <label>
                      <input type="checkbox" name="featured" checked={formData.featured} onChange={handleChange} />
                      Featured
                    </label>
                  </div>
                </>
              )}
              <div className="form-actions">
                <button type="submit" className="btn btn-primary">
                  {editingItem ? 'Update' : 'Create'}
                </button>
                <button type="button" onClick={handleCancel} className="btn btn-secondary">
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        <div className="admin-list">
          {activeTab === 'blog' && (
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Author</th>
                  <th>Published</th>
                  <th>Views</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {blogs.map((blog) => (
                  <tr key={blog._id}>
                    <td>{blog.title}</td>
                    <td>{blog.author?.username || 'Admin'}</td>
                    <td>{blog.published ? 'Yes' : 'No'}</td>
                    <td>{blog.views}</td>
                    <td>
                      <button onClick={() => handleEdit(blog)} className="btn btn-secondary" style={{ marginRight: '10px' }}>
                        Edit
                      </button>
                      <button onClick={() => handleDelete(blog._id)} className="btn btn-danger">
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {activeTab === 'project' && (
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Category</th>
                  <th>Featured</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {projects.map((project) => (
                  <tr key={project._id}>
                    <td>{project.title}</td>
                    <td>{project.category}</td>
                    <td>{project.featured ? 'Yes' : 'No'}</td>
                    <td>
                      <button onClick={() => handleEdit(project)} className="btn btn-secondary" style={{ marginRight: '10px' }}>
                        Edit
                      </button>
                      <button onClick={() => handleDelete(project._id)} className="btn btn-danger">
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default Admin;

