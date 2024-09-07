import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:8181', // Set your API base URL here
    timeout: 10000,                           // Set a default timeout (optional)
    headers: {
        'Content-Type': 'application/json',     // Set common headers here
    }
});

axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response && error.response.status === 401 || error.response.status === 403) {
            // Token is expired or invalid, logout the user
            localStorage.removeItem('token');
            const currentUrl = window.location.pathname;
            if (currentUrl !== '/login') {
                // Redirect to login page if the user is not already there
                const navigate = useNavigate();
                navigate('/login');
            }
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;
