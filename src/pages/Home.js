import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  return (
    <div className="home">
      <section className="hero">
        <div className="container">
          <h1>欢迎来到我的创作空间</h1>
          <p>在这里探索精选项目、阅读最新文章，并与我交流想法。</p>
          <div className="hero-buttons">
            <Link to="/projects" className="btn btn-primary">查看项目</Link>
            <Link to="/blog" className="btn btn-secondary">阅读博客</Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;

