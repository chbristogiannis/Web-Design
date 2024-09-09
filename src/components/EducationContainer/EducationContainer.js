import React, { useState, useEffect } from 'react';
import {
    addEducationService,
    getEducationService,
    updateEducationService,
    deleteEducationService 
} from '../../services/personalDetailsServices';

const Education = () => {
    const [educations, setEducations] = useState([]);
    const [form, setForm] = useState({
        institution: '',
        degree: '',
        startYear: '',
        endYear: '',
        isPrivate: false
    });
    const [formAlert, setFormAlert] = useState(false);
    const [updateId, setUpdateId] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const [formTitle, setFormTitle] = useState('Φόρμα Δημιουργίας');

    useEffect(() => {
        const fetchEducations = async () => {
            try {
                const data = await getEducationService();
                if (data) {
                    setEducations(data.map(edu => ({
                        id: edu.id,
                        institution: edu.institution,
                        degree: edu.degree,
                        startYear: edu.startYear,
                        endYear: edu.endYear || '',
                        isPrivate: edu.isPrivate
                    })));
                }
            } catch (error) {
                console.error("Error fetching educations:", error);
            }
        };

        fetchEducations();
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
            institution: '',
            degree: '',
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
        const { institution, degree, startYear, endYear, isPrivate } = form;
        if (!institution || !degree || !startYear) {
            setFormAlert(true);
            return;
        }

        try {
            const data = updateId ? 
                await updateEducationService({id: updateId, institution, degree, startYear, endYear, isPrivate}) :
                await addEducationService({institution, degree, startYear, endYear: endYear || null , isPrivate});

            if (data) {
                setEducations(prevEducations => {
                    if (updateId) {
                        return prevEducations.map(edu => edu.id === updateId ? data : edu);
                    } else {
                        return [...prevEducations, data];
                    }
                });
                resetForm();
            }
        } catch (error) {
            console.error("Error submitting education form:", error);
        }
    };

    const handleDelete = async () => {
        try {
            const data = await deleteEducationService(updateId);
            if (data) {
                setEducations(prevEducations => prevEducations.filter(edu => edu.id !== updateId));
                resetForm();
            }
        } catch (error) {
            console.error("Error deleting education:", error);
        }
    };

    const handleEdit = (id) => {
        const education = educations.find(edu => edu.id === id);
        if (education) {
            setForm({
                institution: education.institution,
                degree: education.degree,
                startYear: education.startYear,
                endYear: education.endYear,
                isPrivate: education.isPrivate
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
                        {['institution', 'degree', 'startYear'].map(field => (
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
                    {educations.map(edu => (
                        <div key={edu.id} className='bubble-container' onClick={() => handleEdit(edu.id)}>
                            <p>{edu.institution}</p>
                            <p>{edu.degree}</p>
                            <p>{edu.startYear}-{edu.endYear ? edu.endYear : 'Σήμερα'}</p>
                        </div>
                    ))}
                    <button className='bubble-button' onClick={handleAdd}>+</button>
                </div>
            )}
        </div>
    );
};

export default Education;