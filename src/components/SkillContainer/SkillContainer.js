import React, {useState, useEffect} from 'react';
import {
    addSkillService,
    getSkillService,
    updateSkillService,
    deleteSkillService
} from '../../services/personalDetailsServices';

const Skill = () => {
    const [skills, setSkills] = useState([]);
    const [form, setForm] = useState({
        skill: '',
        isPrivate: false
    });
    const [formAlert, setFormAlert] = useState(false);
    const [updateId, setUpdateId] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const [formTitle, setFormTitle] = useState('Φόρμα Δημιουργίας');

    useEffect(() => {
        const fetchSkills = async () => {
            try {
                const data = await getSkillService();
                if (data) {
                    setSkills(data.map(skill => ({
                        id: skill.id,
                        skill: skill.skill,
                        isPrivate: skill.isPrivate
                    })));
                }
            } catch (error) {
                console.error("Error fetching skills:", error);
            }
        };

        fetchSkills();
    }, []);

    const handleInputChange = (e) => {
        const {name, value, type, checked} = e.target;
        setForm(prevForm => ({
            ...prevForm,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const resetForm = () => {
        setForm({
            skill: '',
            isPrivate: false
        });
        setFormTitle('Φόρμα Δημιουργίας');
        setUpdateId(null);
        setFormAlert(false);
        setShowForm(false);
    };

    const handleSubmit = async () => {
        const {skill, isPrivate} = form;
        if (!skill) {
            setFormAlert(true);
            return;
        }

        try {
            const data = updateId ?
                await updateSkillService({id: updateId, skill, isPrivate}) : 
                await addSkillService({skill, isPrivate});

            if (data) {
                setSkills(prevSkills => {
                    if (updateId) {
                        return prevSkills.map(skill => skill.id === updateId ? data : skill);
                    }
                    return [...prevSkills, data];
                });
                resetForm();
            }
        } catch (error) {
            console.error("Error adding skill:", error);
        }
    }

    const handleDelete = async () => {
        try {
            const data = await deleteSkillService(updateId);
            if (data) {
                setSkills(prevSkills => prevSkills.filter(skill => skill.id !== updateId));
                resetForm();
            }
        } catch (error) {
            console.error("Error deleting skill:", error);
        }
    }

    const handleEdit = (id) => {
        const skill = skills.find(skill => skill.id === id);
        if (skill) {
            setForm({
                skill: skill.skill,
                isPrivate: skill.isPrivate
            });
            setFormTitle('Φόρμα Επεξεργασίας');
            setUpdateId(id);
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
                        <div className='input-container'>
                            <span>Δεξιότητα</span>
                            <input
                                type="text"
                                name="skill"
                                onChange={handleInputChange}
                                value={form.skill}
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
                    {skills.map(skill => (
                        <div key={skill.id} className='bubble-container' onClick={() => handleEdit(skill.id)}>
                            <p>{skill.skill}</p>
                        </div>
                    ))}
                    <button className='bubble-button' onClick={handleAdd}>+</button>
                </div>
            )}
        </div>
    );
};

export default Skill;