import React, { useState } from 'react';

import { changePassword as changePasswordService} from '../services/settingsService';

const ChangePassword = () => {
    const [password, setPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
    const [formError, setFormError] = useState('');
    const [formSuccess, setFormSuccess] = useState('');

    const resetForm = () => {
        setPassword('');
        setNewPassword('');
        setConfirmNewPassword('');
        setFormError('');
    }

    const handleSubmit = async () => {
        if (!password || !newPassword || !confirmNewPassword) {
            setFormError('Συμπληρώστε όλα τα πεδία.');
            return;
        }
        setFormError('');

        if (newPassword !== confirmNewPassword) {
            setFormError('Ο νέος κωδικός δεν ταιριάζει με την επιβεβαίωση.');
            return;
        }
        setFormError('');

        if (newPassword.length < 4 || newPassword.length > 32) {
            setFormError('Ο κωδικός πρέπει να είναι από 4 έως 32 χαρακτήρες.');
            return;
        }
        setFormError('');

        try {
            const requestData = {
                oldPassword: password,
                newPassword
            }
            await changePasswordService(requestData);

            setFormSuccess('Ο κωδικός άλλαξε επιτυχώς.');
            resetForm();
        } catch (error) {
            if (error.status === 401) {
                setFormError("Λάθος κωδικός.");
            }
        }
    }

    return (
        <div className="box-container settings-form-container">
            {formSuccess && <p className="success-message">{formSuccess}</p>}
            {formError && <p className="error-message">{formError}</p>}
            <div className="form-group">
                <span>Τρέχων κωδικός:</span>
                <input
                    name="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            <div className="form-group">
                <span>Νέος κωδικός:</span>
                <input
                    name="newPassword"
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                />
            </div>
            <div className="form-group">
                <span>Επιβεβαίωση νέου κωδικού:</span>
                <input
                    name="confirmNewPassword"
                    type="password"
                    value={confirmNewPassword}
                    onChange={(e) => setConfirmNewPassword(e.target.value)}
                />
            </div>
            <button onClick={handleSubmit} className='custom-button'>Αλλαγή κωδικού</button>
        </div>
    )
};

export default ChangePassword;