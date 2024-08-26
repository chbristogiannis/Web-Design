// src/NotificationsPage.js
import React, { useState, useEffect } from 'react';
import './NotificationsPage.css';

function NotificationsPage() {
  const [connectionRequests, setConnectionRequests] = useState([]);
  const [interactions, setInteractions] = useState([]);

  useEffect(() => {
    // Simulate fetching connection requests with dummy data
    const fetchConnectionRequests = () => {
      const dummyConnectionRequests = [
        {
          id: 1,
          name: 'John Doe',
          position: 'Software Engineer',
          company: 'Tech Solutions Inc.',
        },
        {
          id: 2,
          name: 'Jane Smith',
          position: 'Product Manager',
          company: 'Innovatech Co.',
        },
        {
          id: 3,
          name: 'Mark Johnson',
          position: 'UX Designer',
          company: 'Creative Labs',
        },
      ];
      setConnectionRequests(dummyConnectionRequests);
    };

    // Simulate fetching interactions with dummy data
    const fetchInteractions = () => {
      const dummyInteractions = [
        {
          id: 1,
          userName: 'Alice Brown',
          postTitle: '5 Tips for Effective Teamwork',
          comment: 'Great article! Thanks for sharing.',
          timestamp: '2 hours ago',
        },
        {
          id: 2,
          userName: 'David Green',
          postTitle: 'The Future of AI in Healthcare',
          comment: 'Very informative. AI is truly changing the game.',
          timestamp: '1 day ago',
        },
        {
          id: 3,
          userName: 'Emily White',
          postTitle: 'How to Stay Productive While Working Remotely',
          comment: 'This helped me a lot. Thanks!',
          timestamp: '3 days ago',
        },
      ];
      setInteractions(dummyInteractions);
    };

    fetchConnectionRequests();
    fetchInteractions();
  }, []);

  const handleAcceptRequest = (requestId) => {
    // Simulate accepting the request
    setConnectionRequests(connectionRequests.filter((req) => req.id !== requestId));
  };

  const handleRejectRequest = (requestId) => {
    // Simulate rejecting the request
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
