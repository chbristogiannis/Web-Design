import React from 'react';

const Experience = ({ experience }) => (
    <div className="personal-info-container">
        <h3 className="title">Εμπειρία</h3>
        <div className="box-container personal-details-box">
            {experience.length === 0 
                ? (<p>Δεν υπάρχουν καταχωρημένα στοιχεία</p>) 
                : (<div className="show-items">
                    {experience.map((exp, index) => (
                        <div key={index} className="bubble-container">
                            <p className="company">{exp.company}</p>
                            <p className="role">{exp.role}</p>
                            <p className="years">{exp.startYear} - {exp.endYear}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    </div>
);

export default Experience;
