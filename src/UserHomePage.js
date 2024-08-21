// src/UserHomePage.js
import React, { useState, useEffect } from 'react';
import './UserHomePage.css';

function HomePage() {
  const [userData, setUserData] = useState({
    name: 'John Smith',
    jobTitle: 'Software Engineer',
    employer: 'Tech Corp',
    profilePicture: 'https://via.placeholder.com/100'
  });

  useEffect(() => {
    // Simulating a fetch call to the backend
    // Replace this with an actual fetch/axios call to your backend
    const fetchUserData = async () => {
      // Simulated user data
      const data = {
        name: 'John Smith',
        profilePicture: 'https://via.placeholder.com/100'
      };

      setUserData(data);
    };

    fetchUserData();
  }, []);

  return (
    <div className="homepage-container">
      <nav className="top-navbar">
        <ul>
          <li><a href="/UserHomePage">Αρχική Σελίδα</a></li>
          <li><a href="/NetworkPage">Δίκτυο</a></li>
          <li><a href="/JobListingsPage">Αγγελίες</a></li>
          <li><a href="/ConversationsPage">Συζητήσεις</a></li>
          <li><a href="/NotificationsPage">Ειδοποιήσεις</a></li>
          <li><a href="/PersonalDetailsPage">Προσωπικά Στοιχεία</a></li>
          <li><a href="/SettingsPage">Ρυθμίσεις</a></li>
        </ul>
      </nav>
      
      <div className="content-container">
        <aside className="left-sidebar">
          <div className="user-info">
            <div className="user-profile">
              <img
                src={userData.profilePicture}
                alt="Profile"
                className="profile-picture"
              />
              <h3>{userData.name}</h3>
            </div>
            <h3>Προσωπικά Στοιχεία</h3>
            <p><a href="/PersonalDetailsPage">Δείτε το προφίλ σας</a></p>
          </div>
          <div className="user-network">
            <h3>Το Δίκτυό σας</h3>
            <p><a href="/NetworkPage">Δείτε το δίκτυό σας</a></p>
          </div>
        </aside>

        <main className="main-content">
          <div className="timeline">
            <h3>Το Χρονολόγιο σας</h3>
            <div className="post-creation">
              <textarea placeholder="Δημιουργήστε ένα νέο κείμενο ..."></textarea>
              <div className="media-upload">
                <button>Φωτογραφία</button>
                <button>Βίντεο</button>
                <button>Αρχείο Ήχου</button>
              </div>
              <button className="submit-post">Αναρτήστε</button>
            </div>

            <div className="posts">
              <div className="post">
                <h4>Άρθρο από επαγγελματία</h4>
                <p>Κείμενο του άρθρου...</p>
                <div className="post-actions">
                  <button>Σχόλιο</button>
                  <button>Ενδιαφέρον</button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default HomePage;

