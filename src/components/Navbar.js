import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Navbar.css';

const Navbar = () => {
  const { user, logout, isAuthenticated, isAdmin } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="container">
        <div className="navbar-content">
          <Link to="/" className="navbar-brand">
            Portfolio & Blog
          </Link>
          <ul className="navbar-menu">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/projects">Projects</Link></li>
            <li><Link to="/blog">Blog</Link></li>
            <li><Link to="/contact">Contact</Link></li>
            {isAuthenticated ? (
              <>
                {isAdmin && (
                  <li><Link to="/admin">Admin</Link></li>
                )}
                <li className="navbar-user">
                  <span>Welcome, {user?.username}</span>
                </li>
                <li>
                  <button onClick={handleLogout} className="btn btn-secondary">
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <li><Link to="/login">Login</Link></li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

