import React from 'react';

const Skills = ({ skills }) => (
    <div className="personal-info-container">
        <h3 className="title">Δεξιότητες</h3>
        <div className="box-container personal-details-box">
            {skills.length === 0 
                ? (<p>Δεν υπάρχουν καταχωρημένα στοιχεία</p>) 
                : (<div className="show-items">
                    {skills.map((skill, index) => (
                        <p key={index} className="bubble-container">{skill.skill}</p>
                    ))}
                </div>
            )}
        </div>
    </div>
);

export default Skills;
