/* src/WelcomePage.js */
import React from 'react';
import './WelcomePage.css';

function WelcomePage() {
  return (
    <div className="welcome-container">
      <nav className="navbar">
        <h1 className="brand">Professional Network</h1>
        <div className="nav-links">
          <button onClick={() => window.location.href = '/register'}>Register</button>
          <span className="separator"></span>
          <button onClick={() => window.location.href = '/login'}>Login</button>
        </div>
      </nav>
      <main className="welcome-content">
        <h2>Welcome to the Professional Networking Application</h2>
        <p>Connect with professionals, share your experiences, and grow your career.</p>
      </main>
    </div>
  );
}

export default WelcomePage;