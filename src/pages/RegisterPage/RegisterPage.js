/* src/RegisterPage.js */
import React, { useState } from 'react';
import './RegisterPage.css';
import { RegisterController } from './RegisterPageController';

function RegisterPage() {
	const { formData, error, handleChange, handleFileChange, handleSubmit, goToLoginPage} = RegisterController();

	return (
		<div className="register-page"> 
		<div className="box-container">
			<h2>Sign Up</h2>
			{error && <p className="error-message">{error}</p>}
			<form onSubmit={handleSubmit} className="register-form">
				<div className="form-group">
					<label>First Name:</label>
					<input type="text" name="firstName" value={formData.firstName} onChange={handleChange} required />
				</div>
				<div className="form-group">
					<label>Last Name:</label>
					<input type="text" name="lastName" value={formData.lastName} onChange={handleChange} required />
				</div>
				<div className="form-group">
					<label>Email:</label>
					<input type="email" name="email" value={formData.email} onChange={handleChange} required />
				</div>
				<div className="form-group">
					<label>Phone Number:</label>
					<input type="tel" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} required />
				</div>
				<div className="form-group">
					<label>Password:</label>
					<input type="password" name="password" value={formData.password} onChange={handleChange} required />
				</div>
				<div className="form-group">
					<label>Confirm Password:</label>
					<input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} required />
				</div>
				<div className="form-group">
					<label>Profile Picture:</label>
					<input type="file" name="profilePicture" onChange={handleFileChange} accept="image/*" />
				</div>
				<button type="submit">Register</button>
			</form>
			<div className="redirect-button-container">
				<button onClick={goToLoginPage}>
					Already have an account?
				</button>
			</div>
		</div>
		</div>
	);
};

export default RegisterPage;
