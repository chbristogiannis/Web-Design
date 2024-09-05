// src/context/AuthContext.js
import React, { createContext, useState, useEffect } from 'react';
import { login as loginService, logout as logoutService } from '../services/authServices';  // Import login, logout services
import { useNavigate } from 'react-router-dom';
import { User } from '../models/User';

// Create the AuthContext
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
	const [isAuthenticated, setIsAuthenticated] = useState(false);  // Holds the login state
	const [loading, setLoading] = useState(true);                   // Loading state during token check
	const [user, setUser] = useState(null);                         // Stores user info
	const navigate = useNavigate();

	// Check if the user is authenticated on initial render
	useEffect(() => {
		const token = localStorage.getItem('token');

		if (token) {
		// If a token exists, assume the user is logged in
			setIsAuthenticated(true);

		// Optionally you can call an API to get user info here
		// setUser(userInfoFromAPI);
		}
		
		setLoading(false);  // Stop loading whether token exists or not
	}, []);

		// Function to log in the user
	const login = async (email, password) => {
		try {
			const data = await loginService(email, password);  // Call login service
			setIsAuthenticated(true);
			navigate('/UserHomePage');  // Redirect to dashboard after login
		} catch (error) {
			throw error;  // Let the calling component handle the error
		}
	};

	// Function to log out the user
	const logout = () => {
		logoutService();  // Call logout service to clear token
		setIsAuthenticated(false);
		setUser(null);
		navigate('/login');  // Redirect to login page after logout
	};

	return (
		<AuthContext.Provider value={{ isAuthenticated, user, login, logout, loading }}>
		{children}
		</AuthContext.Provider>
	);
};

export default AuthContext;
