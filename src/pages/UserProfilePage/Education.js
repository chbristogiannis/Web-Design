import React from 'react';

const Education = ({ education }) => (
    <div className="personal-info-container">
        <h3 className="title">Εκπαίδευση</h3>
        <div className="box-container personal-details-box">
            {education.length === 0 
                ? (<p>Δεν υπάρχουν καταχωρημένα στοιχεία</p>) 
                : (<div className="show-items">
                    {education.map((ed, index) => (
                        <div key={index} className="bubble-container">
                            <p>{ed.institution}</p>
                            <p>{ed.degree}</p>
                            <p>{ed.startYear} - {ed.endYear}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    </div>
);

export default Education;
