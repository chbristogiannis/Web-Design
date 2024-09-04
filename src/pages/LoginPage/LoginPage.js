/* src/LoginPage.js */
import React, { useState, useContext } from 'react';
import AuthContext from '../../context/AuthContext';  // Import the Auth context
import './LoginPage.css';

function LoginPage() {
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

	return (
		<div className="login-page">  
			<div className="login-container">
				<h2>Login</h2>
				{error && <p className="error-message">{error}</p>}
				<form onSubmit={handleSubmit} className="login-form">
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
			</div>
		</div>
	);
}

export default LoginPage;

