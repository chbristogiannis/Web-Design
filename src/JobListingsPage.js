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
    // Dummy data for job listings from connected professionals
    const connectedJobs = [
      { id: 1, title: 'Frontend Developer', description: 'Develop and maintain web applications using React.js and other frontend technologies.' },
      { id: 2, title: 'Backend Engineer', description: 'Design and implement scalable backend services using Node.js and Express.' },
      { id: 3, title: 'Product Manager', description: 'Manage the product lifecycle from conception to launch.' },
    ];

    // Dummy data for job listings from non-connected professionals
    const nonConnectedJobs = [
      { id: 4, title: 'Graphic Designer', description: 'Create visual content for websites, logos, and marketing materials.' },
      { id: 5, title: 'Data Scientist', description: 'Analyze and interpret complex data to help inform decision-making.' },
      { id: 6, title: 'Marketing Specialist', description: 'Develop and execute marketing campaigns across multiple channels.' },
    ];

    // Simulating fetching data from an API
    setConnectedJobListings(connectedJobs);
    setNonConnectedJobListings(nonConnectedJobs);
  }, []);

  const handleApply = async (jobId) => {
    // Logic to apply for a job
    alert(`Applied for job ID: ${jobId}`);
  };

  const handlePostJob = async (e) => {
    e.preventDefault();
    // Logic to post a new job
    alert('Job posted successfully!');
    setNewJob({ title: '', description: '' }); // Clear the form
  };

  const handleViewApplications = async (jobId) => {
    // Logic to view applications for a job
    alert(`Viewing applications for job ID: ${jobId}`);
  };

  return (
    <div className="job-listings-page">
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
    </div>
  );
}

export default JobListingsPage;
