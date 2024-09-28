import React, { useState, useEffect } from 'react';
import { createListing } from '../../services/listingServices';
import AutoResizingTextArea from '../../components/AutoResizingTextArea/AutoResizingTextArea';

import './ListingsForm.css';

const ListingsForm = ({ onAddListing }) => {
    const [listing, setListing] = useState({
                title: '',
                description: '',
                company: '',
                location: '',
                salary: ''
    });

    const handleSubmit = async (e) => {
		e.preventDefault();

        const response = await createListing(listing);

        if (response) {
            alert('Job posted successfully!');

            if (onAddListing) {
                onAddListing(response); // Add the new listing to the array in the parent component
            }

            setListing({
                title: '',
                description: '',
                company: '',
                location: '',
                salary: ''
            });
        }
	};

    return (
        <div className="job-form box-container">
            <h3>Δημιουργία νέας αγγελίας</h3>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Θέση:</label>
                    <input
                        type="text"
                        value={listing.title}
                        onChange={(e) => setListing  ({ ...listing  , title: e.target.value })}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Περιγραφή:</label>
                    <AutoResizingTextArea value={listing.description} onChange={(e) => setListing  ({ ...listing  , description: e.target.value })} placeholder={''} required style={{maxHeight:'none', outline:'none'}}/>
                </div>
                <div className="form-group">
                    <label>Εταιρία:</label>
                    <input
                        type="text"
                        value={listing.company}
                        onChange={(e) => setListing  ({ ...listing  , company: e.target.value })}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Τοποθεσία:</label>
                    <input
                        type="text"
                        value={listing.location}
                        onChange={(e) => setListing  ({ ...listing  , location: e.target.value })}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Αμοιβή:</label>
                    <input
                        type='number'
                        value={listing.salary}
                        onChange={(e) => setListing  ({ ...listing  , salary: e.target.value })}
                        required
                    />
                </div>

                <div className="button-container">
                    <button type="submit" className='custom-button'>Δημοσίευση Αγγελίας</button>
                </div>
            </form>
        </div>
    );

};

export default ListingsForm;