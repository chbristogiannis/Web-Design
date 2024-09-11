// src/context/AuthContext.js
import React, { createContext, useState, useEffect, useContext } from 'react';
import { login as loginService, logout as logoutService } from '../services/authServices';  // Import login, logout services
import { useNavigate } from 'react-router-dom';

// Create the AuthContext
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
	const [isAuthenticated, setIsAuthenticated] = useState(false);  // Holds the login state
	const [loading, setLoading] = useState(true);                   // Loading state during token check
	const [user, setUser] = useState(null);                         // Stores user info
	const navigate = useNavigate();


	const validateUser = (userData) => {
        return userData && userData.firstName && userData.lastName && userData.isAdmin !== undefined;
    };

	// Check if the user is authenticated on initial render
	useEffect(() => {
		const token = localStorage.getItem('token');
		const storedUser = localStorage.getItem('user');

		if (token && storedUser) {
			const userInfo = JSON.parse(storedUser);

			if(validateUser(userInfo)) {
				setIsAuthenticated(true);
				setUser(JSON.parse(storedUser));  // Restore user from localStorage
			}
			else {
				setIsAuthenticated(false);
				// logout();
			}
		} else {
			setIsAuthenticated(false);
		}
		setLoading(false);  // Stop loading whether token exists or not
	}, []);

	// Function to log in the user
	const login = async (email, password) => {
		try {
			const response = await loginService(email, password);
			const {token, userInfo} = response;

			if (!token || !userInfo) {
				throw new Error('Invalid response from server');
			}

			if(!userInfo.hasPhoto) {
				userInfo.photo = 'https://via.placeholder.com/100';
			}

            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(userInfo));

			setIsAuthenticated(true);
			setUser(userInfo);

			if(userInfo.isAdmin) {
				navigate('/ManagerPage');
				return;
			} 
			navigate('/UserHomePage');
		} catch (error) {
			throw error;
		}
	};

	// Function to log out the user
	const logout = () => {
		logoutService();
		setIsAuthenticated(false);
		setUser(null);
		navigate('/login');
	};

	return (
		<AuthContext.Provider value={{ isAuthenticated, user, login, logout, loading }}>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = () => useContext(AuthContext);

export default AuthContext;
