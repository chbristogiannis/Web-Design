import axiosInstance from '../utils/axiosInstance';
import { User } from '../models/User';

const login = async (email, password) => {
	try {
		const response = await axiosInstance.post('/auth/login', {
			email: email,
			password: password,
		});

		// Set the token in localStorage
		const token = response.data.token;
		localStorage.setItem('token', token);

		// Set the use in localStorage
		const userInfo = response.data.userInfo;
		console.log("userInfo: ", userInfo);
		const user = new User(
			userInfo.firstName,
			userInfo.lastName,
			userInfo.hasPhoto,
			userInfo.photo,
		);
		console.log("user: ", user);
		localStorage.setItem('user', JSON.stringify(user));

		return response.data;
	} catch (error) {
		throw error;
	}
};

const logout = () => {
	// Remove the token from localStorage
	localStorage.removeItem('token');
}

export { login, logout };