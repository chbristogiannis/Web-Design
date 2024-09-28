// src/WelcomePage.js
import React from 'react';
import './WelcomePage.css';

function WelcomePage() {
  return (
    <div className="welcome-page">
      <div className="welcome-container">
        <nav className="navbar">
          <h1 className="brand">Professional Network</h1>
          <div className="nav-links">
            <button onClick={() => window.location.href = '/register'}>Εγγραφή</button>
            <button onClick={() => window.location.href = '/login'}>Σύνδεση</button>
          </div>
        </nav>
        <main className="welcome-content">
          <h2>Καλώς ορίσατε στην Εφαρμογή Επαγγελματικής Δικτύωσης</h2>
          <p>Συνδεθείτε με επαγγελματίες, μοιραστείτε τις εμπειρίες σας και αναπτύξτε την καριέρα σας.</p>
        </main>
      </div>
    </div>
  );
}

export default WelcomePage;