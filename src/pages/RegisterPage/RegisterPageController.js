import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../utils/axiosInstance';

export const RegisterController = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
        phoneNumber: '',
        profilePicture: null,
    });
    const [error, setError] = useState('');

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData({ ...formData, [name]: value });
	};

	const handleFileChange = (e) => {
		setFormData({ ...formData, profilePicture: e.target.files[0] });
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

			// const registerResponse = await fetch('/auth/register', {
			// 	method: 'POST',
			// 	body: formDataObj,
			// });

            console.log(formData.phoneNumber);

            const response = await axiosInstance.post('/auth/register', {
                firstName: formData.firstName,
                lastName: formData.lastName,
                email: formData.email,
                password: formData.password,
                phoneNumber: formData.phoneNumber,
                profilePicture: formData.profilePicture,
            });

            if (response.status === 201) {
                navigate('/login');
            } else {
                setError('Registration failed. Please try again.');
            }
			// if (registerResponse.ok) {
			// 	// Redirect to login or welcome page
            //     navigate('/login');
			// } else {
			// 	setError('Registration failed. Please try again.');
			// }
		} catch (err) {
		    setError('An error occurred. Please try again.');
		}
	};

    return { formData, error, handleChange, handleFileChange, handleSubmit };
}