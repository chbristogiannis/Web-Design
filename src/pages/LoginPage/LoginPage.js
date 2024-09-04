/* src/LoginPage.js */
import React, { useState, useContext } from 'react';
import AuthContext from '../../context/AuthContext';  // Import the Auth context
import './LoginPage.css';

function LoginPage() {
	const { login } = useContext(AuthContext);  // Access the login function from context
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState(null);

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			await login(email, password);  // Call login function from context
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
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							required
						/>
					</div>
					<div className="form-group">
						<label>Password:</label>
						<input
							type="password"
							name="password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
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

