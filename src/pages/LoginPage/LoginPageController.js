import AuthContext from '../../context/AuthContext';  // Import the Auth context
import { useNavigate } from 'react-router-dom';  // Import the useNavigate hook
import { useState, useContext } from 'react';

const LoginPageController = () => {
    const navigate = useNavigate();  // Use the useNavigate hook to navigate to different pages

    const { login } = useContext(AuthContext);  // Access the login function from context
	const [formData, setFormData] = useState({
		email: '',
		password: '',
	});

	const [error, setError] = useState(null);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData({ ...formData, [name]: value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			await login(formData.email, formData.password);  // Call login function from context
		} catch (error) {
			setError('Login failed. Please try again.');
		}
	};

	const goToRegisterPage = () => {
        navigate('/register');  // Use the navigate function to redirect to the register page
    };

    return { formData, error, handleChange, handleSubmit, goToRegisterPage };  // Return the necessary variables and functions
}

export default LoginPageController;