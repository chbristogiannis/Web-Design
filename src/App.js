/* src/App.js */
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import WelcomePage from './WelcomePage';
import RegisterPage from './RegisterPage';
import LoginPage from './LoginPage';
import UserHomePage from './UserHomePage';
import NetworkPage from './NetworkPage';
import JobListingsPage from './JobListingsPage';
import ConversationsPage from './ConversationsPage';
import NotificationsPage from './NotificationsPage';
import PersonalDetailsPage from './PersonalDetailsPage';
import SettingsPage from './SettingsPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/Register" element={<RegisterPage />} />
        <Route path="/Login" element={<LoginPage />} />
        <Route path="/UserHomePage" element={<UserHomePage />} />
        <Route path="/NetworkPage" element={<NetworkPage />} />
        <Route path="/JobListingsPage" element={<JobListingsPage />} />
        <Route path="/ConversationsPage" element={<ConversationsPage />} />
        <Route path="/NotificationsPage" element={<NotificationsPage />} />
        <Route path="/PersonalDetailsPage" element={<PersonalDetailsPage />} />
        <Route path="/SettingsPage" element={<SettingsPage />} />
      </Routes>
    </Router>
  );
}

export default App;
