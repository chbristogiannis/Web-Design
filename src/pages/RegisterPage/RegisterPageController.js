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

    return { formData, error, handleChange, handleFileChange, handleSubmit, goToLoginPage};
}