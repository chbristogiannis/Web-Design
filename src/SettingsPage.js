// src/SettingsPage.js
import React, { useState } from 'react';
import './SettingsPage.css';

function SettingsPage() {
  const [email, setEmail] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const handleChangeCurrentPassword = (e) => {
    setCurrentPassword(e.target.value);
  };

  const handleChangeNewPassword = (e) => {
    setNewPassword(e.target.value);
  };

  const handleChangeConfirmNewPassword = (e) => {
    setConfirmNewPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (newPassword !== confirmNewPassword) {
      setError('New passwords do not match.');
      return;
    }

    // Implement API call or logic to update email and/or password
    // For now, we simulate success
    setSuccess('Settings updated successfully.');
  };

  return (
    <div className="settings-container">
      <h2>Settings</h2>
      {error && <p className="error-message">{error}</p>}
      {success && <p className="success-message">{success}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>New Email Address:</label>
          <input
            type="email"
            value={email}
            onChange={handleChangeEmail}
            placeholder="Enter new email address"
            required
          />
        </div>

        <div className="form-group">
          <label>Current Password:</label>
          <input
            type="password"
            value={currentPassword}
            onChange={handleChangeCurrentPassword}
            placeholder="Enter current password"
            required
          />
        </div>

        <div className="form-group">
          <label>New Password:</label>
          <input
            type="password"
            value={newPassword}
            onChange={handleChangeNewPassword}
            placeholder="Enter new password"
            required
          />
        </div>

        <div className="form-group">
          <label>Confirm New Password:</label>
          <input
            type="password"
            value={confirmNewPassword}
            onChange={handleChangeConfirmNewPassword}
            placeholder="Confirm new password"
            required
          />
        </div>

        <button type="submit">Update Settings</button>
      </form>
    </div>
  );
}

export default SettingsPage;
