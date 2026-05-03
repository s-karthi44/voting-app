import React from "react";
import { Link } from "react-router-dom";
import "./home.css";

const Home = () => {
  return (
    <div className="home-page">
      <section className="hero">
        <div className="hero-content animate-fade-in">
          <div className="badge">Next Generation Voting</div>
          <h1 className="hero-title">
            Your Vote, <span className="gradient-text">Your Voice</span>, Secured.
          </h1>
          <p className="hero-subtitle">
            Experience the future of democratic participation. A transparent, 
            immutable, and user-friendly voting platform built for the modern era.
          </p>
          <div className="hero-actions">
            <Link to="/vote" className="btn-primary">Start Voting Now</Link>
            <Link to="/login" className="btn-secondary">Join the Platform</Link>
          </div>
        </div>
        <div className="hero-visual">
          <div className="visual-card glass-morphism">
            <div className="visual-header">
              <div className="dot"></div>
              <div className="dot"></div>
              <div className="dot"></div>
            </div>
            <div className="visual-body">
              <div className="stat-row">
                <div className="stat-label">Total Participation</div>
                <div className="stat-value">84%</div>
              </div>
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: '84%' }}></div>
              </div>
              <div className="stat-grid">
                <div className="stat-item">
                  <span className="label">Votes Cast</span>
                  <span className="value">12.4k</span>
                </div>
                <div className="stat-item">
                  <span className="label">Uptime</span>
                  <span className="value">99.9%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="features container">
        <div className="feature-card card">
          <div className="feature-icon">🔒</div>
          <h3>Secure & Encrypted</h3>
          <p>Your identity is protected while ensuring your vote is counted accurately.</p>
        </div>
        <div className="feature-card card">
          <div className="feature-icon">⚡</div>
          <h3>Real-time Results</h3>
          <p>Watch the votes come in live with our high-speed processing engine.</p>
        </div>
        <div className="feature-card card">
          <div className="feature-icon">📱</div>
          <h3>Fully Responsive</h3>
          <p>Vote from any device, anywhere in the world, at any time.</p>
        </div>
      </section>
    </div>
  );
};

export default Home;
