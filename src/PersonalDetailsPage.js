// src/PersonalDetailsPage.js
import React, { useState } from 'react';
import './PersonalDetailsPage.css';

function PersonalDetailsPage() {
  const [experience, setExperience] = useState('');
  const [education, setEducation] = useState('');
  const [skills, setSkills] = useState('');
  const [privacySettings, setPrivacySettings] = useState({
    experience: 'private',
    education: 'private',
    skills: 'private',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case 'experience':
        setExperience(value);
        break;
      case 'education':
        setEducation(value);
        break;
      case 'skills':
        setSkills(value);
        break;
      default:
        break;
    }
  };

  const handlePrivacyChange = (e) => {
    const { name, value } = e.target;
    setPrivacySettings({ ...privacySettings, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Implement form submission logic here
  };

  return (
    <div className="personal-details-container">
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
      <h2>Personal Details</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Professional Experience:</label>
          <textarea
            name="experience"
            value={experience}
            onChange={handleInputChange}
            placeholder="Describe your professional experience"
          />
          <label>
            Privacy:
            <select
              name="experience"
              value={privacySettings.experience}
              onChange={handlePrivacyChange}
            >
              <option value="public">Public</option>
              <option value="private">Private</option>
            </select>
          </label>
        </div>

        <div className="form-group">
          <label>Education:</label>
          <textarea
            name="education"
            value={education}
            onChange={handleInputChange}
            placeholder="Describe your educational background"
          />
          <label>
            Privacy:
            <select
              name="education"
              value={privacySettings.education}
              onChange={handlePrivacyChange}
            >
              <option value="public">Public</option>
              <option value="private">Private</option>
            </select>
          </label>
        </div>

        <div className="form-group">
          <label>Skills:</label>
          <textarea
            name="skills"
            value={skills}
            onChange={handleInputChange}
            placeholder="List your skills"
          />
          <label>
            Privacy:
            <select
              name="skills"
              value={privacySettings.skills}
              onChange={handlePrivacyChange}
            >
              <option value="public">Public</option>
              <option value="private">Private</option>
            </select>
          </label>
        </div>

        <button type="submit">Save</button>
      </form>
    </div>
  );
}

export default PersonalDetailsPage;
