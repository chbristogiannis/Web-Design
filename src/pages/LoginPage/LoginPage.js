/* src/LoginPage.js */
import './LoginPage.css';
import LoginPageController from './LoginPageController';

function LoginPage() {

	const { formData, error, handleChange, handleSubmit, goToRegisterPage } = LoginPageController();

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

