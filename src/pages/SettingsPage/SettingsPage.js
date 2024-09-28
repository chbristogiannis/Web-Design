// src/SettingsPage.js
import React, { useContext} from 'react';

import Navbar from '../../components/NavBar/NavBar';  // Adjust the import path
import ChangeEmail from './UpdateEmail';
import ChangePassword from './UpdatePassword';
import AuthContext from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';  // Import the useNavigate hook
import './SettingsPage.css';

function SettingsPage() {

  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();  // Use the useNavigate hook to navigate to different pages

  const handleLogout = async () => {
    await logout();
    navigate('/');  // Use the navigate function to redirect to the login
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
      <button onClick={handleLogout} className='delete-button' style={{
        marginTop: '1rem'
      }}>Αποσύνδεση</button>
    </div>
  );
}

export default SettingsPage;
