// src/components/Experience.js
import React, { useState, useEffect } from 'react';
import { 
    addExperienceService, 
    getExperienceService, 
    updateExperienceService,
    deleteExperienceService
} from '../../services/personalDetailsServices';

const Experience = () => {
    const [experiences, setExperiences] = useState([]);
    const [form, setForm] = useState({
        company: '',
        role: '',
        startYear: '',
        endYear: '',
        isPrivate: false
    });
    const [formAlert, setFormAlert] = useState(false);
    const [updateId, setUpdateId] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const [formTitle, setFormTitle] = useState('Φόρμα Δημιουργίας');

    useEffect(() => {
        const fetchExperiences = async () => {
            try {
                const data = await getExperienceService();
                if (data) {
                    setExperiences(data.map(exp => ({
                        id: exp.id,
                        company: exp.company,
                        role: exp.role,
                        startYear: exp.startYear,
                        endYear: exp.endYear || '',
                        isPrivate: exp.isPrivate
                    })));
                }
            } catch (error) {
                console.error("Error fetching experiences:", error);
            }
        };

        fetchExperiences();
    }, []);

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setForm(prevForm => ({
            ...prevForm,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const resetForm = () => {
        setForm({
            company: '',
            role: '',
            startYear: '',
            endYear: '',
            isPrivate: false
        });
        setFormTitle('Φόρμα Δημιουργίας');
        setUpdateId(null);
        setFormAlert(false);
        setShowForm(false);
    };

    const handleSubmit = async () => {
        const { company, role, startYear, endYear, isPrivate } = form;
        if (!company || !role || !startYear) {
            setFormAlert(true);
            return;
        }
        try {
            const data = updateId ? 
                await updateExperienceService({ id: updateId, company, role, startYear, endYear: endYear || null, isPrivate }) :
                await addExperienceService({ company, role, startYear, endYear: endYear || null, isPrivate });

            if (data) {
                setExperiences(prevExperiences => {
                    if (updateId) {
                        return prevExperiences.map(exp => exp.id === updateId ? data : exp);
                    } else {
                        return [...prevExperiences, data];
                    }
                });
                resetForm();
            }
        } catch (error) {
            console.error("Error submitting experience:", error);
        }
    };

    const handleDelete = async () => {
        try {
            const data = await deleteExperienceService( updateId );
            if (data) {
                setExperiences(prevExperiences => prevExperiences.filter(exp => exp.id !== updateId));
                resetForm();
            }
        } catch (error) {
            console.error("Error deleting experience:", error);
        }
    };

    const handleEdit = (id) => {
        const experience = experiences.find(exp => exp.id === id);
        if (experience) {
            setForm({
                company: experience.company,
                role: experience.role,
                startYear: experience.startYear,
                endYear: experience.endYear || '',
                isPrivate: experience.isPrivate
            });
            setUpdateId(id);
            setFormTitle('Φόρμα Επεξεργασίας');
            setShowForm(true);
        }
    };

    const handleAdd = () => setShowForm(true);

    return (
        <div className="box-container personal-details-box">
            {showForm && (
                <div className='create-new-item'>
                    <div className='form-header'>
                        <span className='form-header-title '>{formTitle}</span>
                        <button type="submit" className='delete-button personal-details-delete-button' onClick={resetForm}>x</button>
                    </div>
                    <div className='personal-info-form'>
                        {['company', 'role', 'startYear'].map(field => (
                            <div className='input-container' key={field}>
                                <span>{field.charAt(0).toUpperCase() + field.slice(1)}*</span>
                                <input
                                    type={field === 'startYear' ? 'number' : 'text'}
                                    name={field}
                                    onChange={handleInputChange}
                                    value={form[field]}
                                    min={1900}
                                    max={new Date().getFullYear()}
                                    step={1}
                                />
                            </div>
                        ))}
                        <div className='input-container'>
                            <span>Ημερομηνία λήξης </span>
                            <input
                                type="number"
                                name="endYear"
                                onChange={handleInputChange}
                                value={form.endYear}
                                min={1900}
                                max={new Date().getFullYear()}
                                step={1}
                            />
                        </div>
                        <div className='input-container'>
                            <span>Ιδιωτική</span>
                            <input
                                type="checkbox"
                                name="isPrivate"
                                onChange={handleInputChange}
                                checked={form.isPrivate}
                                className="custom-checkbox"
                            />
                        </div>
                    </div>
                    {formAlert && <p className='alert'>Συμπληρώστε τα απαραίτητα πεδία (*)</p>}
                    {updateId ? 
                    <div>
                        <button className='custom-button' style={{marginRight:"1rem"}} onClick={handleSubmit}>
                            Ανανέωση
                        </button>
                        <button className='delete-button' onClick={handleDelete}>
                            Διαγραφή
                        </button>
                    </div>
                    :
                    <button className='custom-button' onClick={handleSubmit}>
                        Προσθήκη
                    </button>}
                </div>
            )}
            {!showForm && (
                <div className='show-items'>
                    {experiences.map(exp => (
                        <div key={exp.id} className='bubble-container' onClick={() => handleEdit(exp.id)}>
                            <p>{exp.role}</p>
                            <p>{exp.company}</p>
                            <p>{exp.startYear}-{exp.endYear ? exp.endYear : 'Σήμερα'}</p>
                        </div>
                    ))}
                    <button className='bubble-button' onClick={handleAdd}>+</button>
                </div>
            )}
        </div>
    );
};

export default Experience;
