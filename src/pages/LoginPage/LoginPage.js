/* src/LoginPage.js */
import { useAuth } from '../../context/AuthContext';  // Import the Auth context
import { useNavigate } from 'react-router-dom';  // Import the useNavigate hook
import { useState } from 'react';

import './LoginPage.css';

function LoginPage() {
	const navigate = useNavigate();  // Use the useNavigate hook to navigate to different pages

    const { login } = useAuth();  // Access the login function from context
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

	return (
		<div className="login-page">  
			<div className="box-container form-container">
				<h2>Login</h2>
				{error && <p className="error-message">{error}</p>}
				<form onSubmit={handleSubmit}>
					<div className="form-group">
						<label>Email:</label>
						<input
							type="email"
							name="email"
							value={formData.email}
							onChange={handleChange}
							required
						/>
					</div>
					<div className="form-group">
						<label>Password:</label>
						<input
							type="password"
							name="password"
							value={formData.password}
							onChange={handleChange}
							required
						/>
					</div>
					<button type="submit">Login</button>
				</form>
				<div className="redirect-button-container">
					<button onClick={goToRegisterPage}>
						Not yet registered?
					</button>
				</div>
			</div>
		</div>
	);
}

export default LoginPage;

