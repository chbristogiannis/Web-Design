/* src/RegisterPage.js */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../utils/axiosInstance';

import './RegisterPage.css';

function RegisterPage() {
	const navigate = useNavigate();

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
        phoneNumber: '',
        photo: '',
    });
    const [error, setError] = useState('');

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData({ ...formData, [name]: value });
	};

	const handleFileChange = (e) => {
		setFormData({ ...formData, photo: e.target.files[0] });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		// Basic validation
		if (formData.password !== formData.confirmPassword) {
			setError('Passwords do not match.');
            return;
        }

		try {
			// Proceed with registration
			const formDataObj = new FormData();
			Object.keys(formData).forEach((key) => {
				formDataObj.append(key, formData[key]);
			});

            if (formData.profilePicture) {
                formDataObj.append('photo', formData.profilePicture);
            }

            const response = await axiosInstance.post('/auth/register', formDataObj, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            if (response.status === 201) {
                navigate('/login');
            } else {
                setError('Registration failed. Please try again.');
            }
		} catch (err) {
			setError('An error occurred. Please try again.');
		}
	};

    const goToLoginPage = () => {
        navigate('/login');
    };

	return (
		<div className="register-page"> 
		<div className="box-container form-container">
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
					<input type="file" name="photo" onChange={handleFileChange} accept="image/*" />
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
