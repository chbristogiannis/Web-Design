// src/JobListingsPage.js
import React, { useState, useEffect } from 'react';
import './JobListingsPage.css';

function JobListingsPage() {
  const [connectedJobListings, setConnectedJobListings] = useState([]);
  const [nonConnectedJobListings, setNonConnectedJobListings] = useState([]);
  const [newJob, setNewJob] = useState({
    title: '',
    description: '',
  });
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    // Fetch job listings from connected professionals
    const fetchConnectedJobListings = async () => {
      const data = await fetch('/api/connectedJobListings'); // Replace with actual API call
      const result = await data.json();
      setConnectedJobListings(result);
    };

    // Fetch job listings from non-connected professionals
    const fetchNonConnectedJobListings = async () => {
      const data = await fetch('/api/nonConnectedJobListings'); // Replace with actual API call
      const result = await data.json();
      setNonConnectedJobListings(result);
    };

    fetchConnectedJobListings();
    fetchNonConnectedJobListings();
  }, []);

  const handleApply = async (jobId) => {
    // Logic to apply for a job
    const response = await fetch(`/api/applyForJob/${jobId}`, {
      method: 'POST',
    });
    if (response.ok) {
      alert('Application submitted successfully!');
    } else {
      alert('Failed to submit application.');
    }
  };

  const handlePostJob = async (e) => {
    e.preventDefault();
    // Logic to post a new job
    const response = await fetch('/api/postJob', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newJob),
    });
    if (response.ok) {
      alert('Job posted successfully!');
      setNewJob({ title: '', description: '' }); // Clear the form
    } else {
      alert('Failed to post job.');
    }
  };

  const handleViewApplications = async (jobId) => {
    // Logic to view applications for a job
    const data = await fetch(`/api/getApplications/${jobId}`); // Replace with actual API call
    const result = await data.json();
    setApplications(result);
  };

  return (
    <div className="job-listings-page">
      {/* <h2>Job Listings</h2> */}
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

      <div className="job-posting-section">
        <h3>Post a New Job</h3>
        <form onSubmit={handlePostJob} className="job-posting-form">
          <div className="form-group">
            <label>Job Title:</label>
            <input
              type="text"
              value={newJob.title}
              onChange={(e) => setNewJob({ ...newJob, title: e.target.value })}
              required
            />
          </div>
          <div className="form-group">
            <label>Job Description:</label>
            <textarea
              value={newJob.description}
              onChange={(e) => setNewJob({ ...newJob, description: e.target.value })}
              required
            />
          </div>
          <div className="button-container">
            <button type="submit">Post Job</button>
          </div>
        </form>
      </div>

      <div className="connected-job-listings">
        <h3>Jobs from Your Network</h3>
        <div className="job-list">
          {connectedJobListings.map((job) => (
            <div key={job.id} className="job-card">
              <h4>{job.title}</h4>
              <p>{job.description}</p>
              <button onClick={() => handleApply(job.id)}>Apply</button>
              <button onClick={() => handleViewApplications(job.id)}>View Applications</button>
            </div>
          ))}
        </div>
      </div>

      <div className="non-connected-job-listings">
        <h3>Jobs from Other Professionals</h3>
        <div className="job-list">
          {nonConnectedJobListings.map((job) => (
            <div key={job.id} className="job-card">
              <h4>{job.title}</h4>
              <p>{job.description}</p>
              <button onClick={() => handleApply(job.id)}>Apply</button>
            </div>
          ))}
        </div>
      </div>

      {/* Placeholder for Matrix Factorization Collaborative Filtering */}
      {/* TODO*/}
    </div>
  );
}

export default JobListingsPage;
