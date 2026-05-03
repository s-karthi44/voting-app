import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './navbar.css';

const Navbar = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isLoggedIn = !!localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsMenuOpen(false);
    navigate('/login');
  };

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <nav className="navbar glass-morphism">
      <div className="navbar-container">
        <Link to="/" className="logo-container">
          <div className="logo-icon">V</div>
          <h2 className="logo-text">Vote<span>Flow</span></h2>
        </Link>

        <div className={`nav-menu ${isMenuOpen ? 'active' : ''}`}>
          <Link to="/" onClick={() => setIsMenuOpen(false)} className="nav-item">Home</Link>
          <Link to="/vote" onClick={() => setIsMenuOpen(false)} className="nav-item">Candidates</Link>
          
          {isLoggedIn ? (
            <button onClick={handleLogout} className="nav-btn logout">Logout</button>
          ) : (
            <Link to="/login" onClick={() => setIsMenuOpen(false)} className="nav-btn login">Login</Link>
          )}
        </div>

        <button className="mobile-toggle" onClick={toggleMenu} aria-label="Toggle menu">
          <div className={`hamburger ${isMenuOpen ? 'active' : ''}`}>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
