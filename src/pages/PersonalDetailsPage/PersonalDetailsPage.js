// src/PersonalDetailsPage.js
import React from 'react';
import './PersonalDetailsPage.css';
import Navbar from '../../components/NavBar/NavBar';
import Experience from '../../components/ExperienceContainer/ExperienceContainer';
import Education from '../../components/EducationContainer/EducationContainer';
import Skill from '../../components/SkillContainer/SkillContainer';


const PersonalDetailsPage = () => {
    return (
        <div className="personal-details-page">
            <Navbar />
            <div className="personal-details">
                <h3>H επαγγελματική μου εμπειρία:</h3>
                <Experience />
                <h3>Η εκπαίδευση μου:</h3>
                <Education />
                <h3>Οι Δεξιότητες μου:</h3>
                <Skill/>
            </div>
        </div>
    );
};

export default PersonalDetailsPage;
