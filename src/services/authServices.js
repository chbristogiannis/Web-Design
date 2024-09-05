import axiosInstance from '../utils/axiosInstance';
import { User } from '../models/User';

const login = async (email, password) => {
	try {
		const response = await axiosInstance.post('/auth/login', {
			email: email,
			password: password,
		});

		return response.data;
	} catch (error) {
		throw error;
	}
};

const logout = () => {
	// Remove the token from localStorage
	localStorage.removeItem('token');
	localStorage.removeItem('user');
}

export { login, logout };