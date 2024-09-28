import React, { useState } from 'react';

import { changeEmail as changeEmailService} from '../../services/settingsService';

const ChangeEmail = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [formError, setFormError] = useState('');
    const [formSuccess, setFormSuccess] = useState('');

    const resetForm = () => {
        setEmail('');
        setPassword('');
        setFormError('');
    }

    const handleSubmit = async () => {
        if (!(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email))) {
            setFormError('Εισαγάγετε μια έγκυρη διεύθυνση email.');
            return;
        }

        if (!email || !password) {
            setFormError('Συμπληρώστε όλα τα πεδία.');
            return;
        }

        try {
            const requestData = {
                email,
                password
            }
            await changeEmailService(requestData);

            setFormSuccess('Η διεύθυνση email άλλαξε επιτυχώς.');
            resetForm();
        } catch (error) {
            if (error.status === 401) {
                setFormError("Λάθος κωδικός.");
            } else if (error.status === 409) {
                setFormError("Το email χρησιμοποιείται ήδη.");
            }
        }
    };

    return (
        <div className="box-container settings-form-container">
			{formSuccess && <p className="success-message">{formSuccess}</p>}
			{formError && <p className="error-message">{formError}</p>}
			<div className="form-group">
				<span>Νέα διεύθυνση email:</span>
				<input
					name="email"
					type="email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
				/>
			</div>
			<div className="form-group">
				<span>Κωδικός:</span>
				<input
					type="password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
				/>
			</div>
			<button type="submit" onClick={handleSubmit} className='custom-button'>Αλλαγή email</button>
        </div>
    )

};

export default ChangeEmail;