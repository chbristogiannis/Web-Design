/* src/App.js */
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

// Import Context
import { AuthProvider } from './context/AuthContext';  // AuthProvider wraps the app

// Import global styles
import './styles/variables.css';

// Import components
import RoleBasedRoute from './components/RoleBasedRoute';

// Import pages
import WelcomePage from './pages/WelcomePage/WelcomePage';
import RegisterPage from './pages/RegisterPage/RegisterPage';
import LoginPage from './pages/LoginPage/LoginPage';
import TimelinePage from './pages/TimelinePage/TimelinePage';
import NetworkPage from './pages/NetworkPage/NetworkPage';
import JobListingsPage from './pages/JobListingsPage/JobListingsPage';
import ConversationsPage from './pages/ConversationsPage/ConversationsPage';
import NotificationsPage from './pages/NotificationsPage/NotificationsPage';
import PersonalDetailsPage from './pages/PersonalDetailsPage/PersonalDetailsPage';
import SettingsPage from './pages/SettingsPage/SettingsPage';
import UserProfilePage from './pages/UserProfilePage/UserProfilePage';
import AdminPage from './pages/AdminPage/AdminPage';
import AdminUserPage from './pages/AdminUserPage/AdminUserPage';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';


function App() {
	return (
		<Router>
			<AuthProvider>
				<Routes>
					<Route path="/" element={<WelcomePage />} />
					<Route path="/Register" element={<RegisterPage />} />
					<Route path="/login" element={<LoginPage />} />

					<Route element={<RoleBasedRoute allowedRoles={['user']} />}>
                        <Route path="/TimelinePage" element={<TimelinePage />} />
                        <Route path="/NetworkPage" element={<NetworkPage />} />
                        <Route path="/JobListingsPage" element={<JobListingsPage />} />
                        <Route path="/ConversationsPage/:conversationId?" element={<ConversationsPage />} />
                        <Route path="/NotificationsPage" element={<NotificationsPage />} />
                        <Route path="/PersonalDetailsPage" element={<PersonalDetailsPage />} />
                        <Route path="/SettingsPage" element={<SettingsPage />} />
                        <Route path="/UserProfilePage/:id" element={<UserProfilePage />} />
                    </Route>

					<Route element={<RoleBasedRoute allowedRoles={['admin']} />}>
                        <Route path="/AdminPage" element={<AdminPage />} />
                        <Route path="/AdminUserPage/:userId?" element={<AdminUserPage />} />
                    </Route>

					<Route path="/404" element={<NotFoundPage />} />
					<Route path="*" element={<NotFoundPage />} />
				</Routes>
			</AuthProvider>
		</Router>
	);
}

export default App;