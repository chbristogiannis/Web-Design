// src/NetworkPage.js
import React, { useState, useEffect } from 'react';
import './NetworkPage.css';

function NetworkPage() {
  const [connectedProfessionals, setConnectedProfessionals] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    // Instead of fetching, use dummy data
    const fetchConnectedProfessionals = () => {
      const dummyData = [
        {
          id: 1,
          name: 'Alice Johnson',
          jobTitle: 'Software Engineer',
          employer: 'Tech Corp',
          photo: 'https://via.placeholder.com/100'
        },
        {
          id: 2,
          name: 'Bob Smith',
          jobTitle: 'Product Manager',
          employer: 'Innovate Ltd.',
          photo: 'https://via.placeholder.com/100'
        },
        {
          id: 3,
          name: 'Carol White',
          jobTitle: 'UX Designer',
          employer: 'Design Studio',
          photo: 'https://via.placeholder.com/100'
        },
        {
          id: 4,
          name: 'David Brown',
          jobTitle: 'Data Scientist',
          employer: 'Data Insights',
          photo: 'https://via.placeholder.com/100'
        } 
      ];
      setConnectedProfessionals(dummyData);
    };

    fetchConnectedProfessionals();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    const filteredResults = connectedProfessionals.filter(professional =>
      professional.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSearchResults(filteredResults);
  };

  const handleProfessionalClick = (id) => {
    window.location.href = `/professional/${id}`;
  };

  return (
    <div className="network-page">
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

      <div className="search-bar">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search for professionals..."
        />
        <button onClick={handleSearch}>Search</button>
      </div>

      {searchResults.length > 0 && (
        <div className="search-results">
          <h3>Search Results</h3>
          <ul>
            {searchResults.map((professional) => (
              <li key={professional.id} onClick={() => handleProfessionalClick(professional.id)}>
                {professional.name} - {professional.jobTitle} at {professional.employer}
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="connected-professionals">
        <h3>Your Connected Professionals</h3>
        <div className="professionals-grid">
          {connectedProfessionals.map((professional) => (
            <div
              key={professional.id}
              className="professional-card"
              onClick={() => handleProfessionalClick(professional.id)}
            >
              <img src={professional.photo} alt={`${professional.name}`} />
              <h4>{professional.name}</h4>
              <p>{professional.jobTitle}</p>
              <p>{professional.employer}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default NetworkPage;

