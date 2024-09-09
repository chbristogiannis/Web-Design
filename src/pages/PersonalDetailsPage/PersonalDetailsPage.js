// src/PersonalDetailsPage.js
import React from 'react';
import './PersonalDetailsPage.css';
import Navbar from '../../components/NavBar/NavBar';
import Experience from '../../components/ExperienceContainer/ExperienceContainer';  // Adjust path as needed

const PersonalDetailsPage = () => {
    return (
        <div className="personal-details-page">
            <Navbar />
            <div className="personal-details">
                <h2>Επαγγελματική εμπειρία:</h2>
                <Experience />
                <div className="box-container">
                    <h4>Εκπαίδευση</h4>
                </div>
                <div className="box-container">
                    <h4>Δεξιότητες</h4>
                </div>
            </div>
        </div>
    );
};

export default PersonalDetailsPage;
