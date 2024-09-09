// src/SettingsPage.js
import React, { useState } from 'react';

import Navbar from '../../components/NavBar/NavBar';  // Adjust the import path
import ChangeEmail from '../../components/UpdateEmail';
import changePassword from '../../components/UpdatePassword';
import './SettingsPage.css';
import ChangePassword from '../../components/UpdatePassword';

function SettingsPage() {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [passwordSuccess, setPasswordSuccess] = useState('');

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
      <Navbar/>

      <div className="settings-container">
        <h3>Change Email Address</h3>
        <ChangeEmail />

        <h3>Change Password</h3>
        <ChangePassword />
      </div>
    </div>
  );
}

export default SettingsPage;
