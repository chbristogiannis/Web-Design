import React from 'react';
import './ListingsApplicants.css';

const ListingsApplicants = ({ applicants, handleBack }) => {
    return (
        <div className="overlay">
            <div className="listings-applicants modal-content">
                <button className="delete-button" onClick={handleBack}>x</button>
                <h3>Αιτούντες</h3>
                <ul className='applacants-list'>
                    {applicants.length > 0 ? (
                        applicants.map((applicant) => (
                            <div key={applicant.id} className="applicant-container box-container">
                                <div className="applicant-details">
                                    {applicant.photo ? (
                                        <img
                                            src={applicant.photo}
                                            alt="applicant"
                                            className="mini-profile-picture"
                                        />
                                    ) : (
                                        <img
                                            src="https://via.placeholder.com/100"
                                            alt="applicant"
                                            className="mini-profile-picture"
                                        />
                                    )}
                                    <span>{applicant.firstName} {applicant.lastName}</span>
                                </div>
                                <div className='contact-info'>
                                    <span>email: {applicant.email}</span>
                                    <span>tel: {applicant.phoneNumber}</span>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>No applicants</p>
                    )}
                </ul>
            </div>
        </div>
    );
};

export default ListingsApplicants;
