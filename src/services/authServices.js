import axiosInstance from '../utils/axiosInstance';

const login = async (email, password) => {
	try {
		const response = await axiosInstance.post('/auth/login', {
			email: email,
			password: password,
		});

		const token = response.data.token;

		localStorage.setItem('token', token);

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