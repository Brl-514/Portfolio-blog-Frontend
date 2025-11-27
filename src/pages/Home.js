import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  return (
    <div className="home">
      <section className="hero">
        <div className="container">
          <h1>Welcome to My Portfolio & Blog</h1>
          <p>view my projects, blogs, and comment on it.</p>
          <div className="hero-buttons">
            <Link to="/projects" className="btn btn-primary">View Projects</Link>
            <Link to="/blog" className="btn btn-secondary">Read Blog</Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;

