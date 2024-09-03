/* src/App.js */
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import WelcomePage from './pages/WelcomePage/WelcomePage';
import RegisterPage from './pages/RegisterPage/RegisterPage';
import LoginPage from './pages/LoginPage/LoginPage';
import UserHomePage from './pages/UserHomePage/UserHomePage';
import NetworkPage from './pages/NetworkPage/NetworkPage';
import JobListingsPage from './pages/JobListingsPage/JobListingsPage';
import ConversationsPage from './pages/ConversationsPage/ConversationsPage';
import NotificationsPage from './pages/NotificationsPage/NotificationsPage';
import PersonalDetailsPage from './pages/PersonalDetailsPage/PersonalDetailsPage';
import SettingsPage from './pages/SettingsPage/SettingsPage';
import UserDetailPage from './pages/UserDetailPage/UserDetailPage';
import ManagerPage from './pages/ManagerPage/ManagerPage';

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
        <Route path="/UserDetailPage" element={<UserDetailPage />} />
        <Route path="/ManagerPage" element={<ManagerPage />} />
      </Routes>
    </Router>
  );
}

export default App;
