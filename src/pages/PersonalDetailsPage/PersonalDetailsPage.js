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
                <h2>Επαγγελματική εμπειρία:</h2>
                <Experience />
                <h2>Εκπαίδευση: </h2>
                <Education />
                <h2>Δεξιότητες</h2>
                <Skill/>
            </div>
        </div>
    );
};

export default PersonalDetailsPage;
