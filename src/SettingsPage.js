// src/SettingsPage.js
import React, { useState } from 'react';
import './SettingsPage.css';

function SettingsPage() {
  const [email, setEmail] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [emailSuccess, setEmailSuccess] = useState('');
  const [passwordSuccess, setPasswordSuccess] = useState('');

  // Handle Email Update
  const handleEmailSubmit = (e) => {
    e.preventDefault();
    setEmailError('');
    setEmailSuccess('');

    // Implement email update logic here
    // For now, we simulate success
    setEmailSuccess('Email updated successfully.');
  };

  // Handle Password Update
  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    setPasswordError('');
    setPasswordSuccess('');

    if (newPassword !== confirmNewPassword) {
      setPasswordError('New passwords do not match.');
      return;
    }

    // Implement password update logic here
    // For now, we simulate success
    setPasswordSuccess('Password updated successfully.');
  };

  return (
    <div className="settings-page">
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

      <div className="settings-container">
        <h3>Change Email Address</h3>
        <div className="settings-form-container">
          
          {emailError && <p className="error-message">{emailError}</p>}
          {emailSuccess && <p className="success-message">{emailSuccess}</p>}
          <form onSubmit={handleEmailSubmit}>
            <div className="form-group">
              <label>New Email Address:</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter new email address"
                required
              />
            </div>
            <button type="submit">Update Email</button>
          </form>
        </div>

        <h3>Change Password</h3>
        <div className="settings-form-container">
          
          {passwordError && <p className="error-message">{passwordError}</p>}
          {passwordSuccess && <p className="success-message">{passwordSuccess}</p>}
          <form onSubmit={handlePasswordSubmit}>
            <div className="form-group">
              <label>Current Password:</label>
              <input
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                placeholder="Enter current password"
                required
              />
            </div>

            <div className="form-group">
              <label>New Password:</label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Enter new password"
                required
              />
            </div>

            <div className="form-group">
              <label>Confirm New Password:</label>
              <input
                type="password"
                value={confirmNewPassword}
                onChange={(e) => setConfirmNewPassword(e.target.value)}
                placeholder="Confirm new password"
                required
              />
            </div>
            <button type="submit">Update Password</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SettingsPage;
