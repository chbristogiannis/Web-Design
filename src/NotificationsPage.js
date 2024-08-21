// src/NotificationsPage.js
import React, { useState, useEffect } from 'react';
import './NotificationsPage.css';

function NotificationsPage() {
  const [connectionRequests, setConnectionRequests] = useState([]);
  const [interactions, setInteractions] = useState([]);

  useEffect(() => {
    // Fetch the connection requests
    const fetchConnectionRequests = async () => {
      const data = await fetch('/api/connection-requests'); // Replace with actual API call
      const result = await data.json();
      setConnectionRequests(result);
    };

    // Fetch the interaction notes and comments
    const fetchInteractions = async () => {
      const data = await fetch('/api/interactions'); // Replace with actual API call
      const result = await data.json();
      setInteractions(result);
    };

    fetchConnectionRequests();
    fetchInteractions();
  }, []);

  const handleAcceptRequest = async (requestId) => {
    // Handle accepting the request
    await fetch(`/api/connection-requests/${requestId}/accept`, {
      method: 'POST',
    });
    // Update state
    setConnectionRequests(connectionRequests.filter((req) => req.id !== requestId));
  };

  const handleRejectRequest = async (requestId) => {
    // Handle rejecting the request
    await fetch(`/api/connection-requests/${requestId}/reject`, {
      method: 'POST',
    });
    // Update state
    setConnectionRequests(connectionRequests.filter((req) => req.id !== requestId));
  };

  return (
    <div className="notifications-page">
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
      
      <div className="connection-requests-section">
        <h3>Connection Requests</h3>
        {connectionRequests.length > 0 ? (
          <ul>
            {connectionRequests.map((request) => (
              <li key={request.id}>
                <div className="request-info">
                  <p>{request.name}</p>
                  <p>{request.position} at {request.company}</p>
                </div>
                <div className="request-actions">
                  <button onClick={() => handleAcceptRequest(request.id)}>Accept</button>
                  <button onClick={() => handleRejectRequest(request.id)}>Reject</button>
                  <a href={`/profile/${request.id}`} className="view-profile">View Profile</a>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p>No connection requests.</p>
        )}
      </div>

      <div className="interactions-section">
        <h3>Interest Notes and Comments</h3>
        {interactions.length > 0 ? (
          <ul>
            {interactions.map((interaction) => (
              <li key={interaction.id}>
                <p><strong>{interaction.userName}</strong> showed interest in your post: "{interaction.postTitle}"</p>
                <p>Comment: {interaction.comment}</p>
                <span>{interaction.timestamp}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p>No new interactions.</p>
        )}
      </div>
    </div>
  );
}

export default NotificationsPage;
