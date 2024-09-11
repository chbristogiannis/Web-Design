// src/components/ListingsList/ListingsList.js
import React, {useEffect, useState} from 'react';
import './ListingsList.css';

import { applyToListing, fetchListingApplicants } from '../../services/listingServices';

import ListingsApplicants from '../ListingsApplicants/ListingsApplicants';

const ListingsList = ({ updatedListings , user, showMyListings}) => {
    const [filteredListings, setFilteredListings] = useState([]);
    const [applicants, setApplicants] = useState([]);
    const [showApplications, setShowApplications] = useState(false);

    useEffect(() => {
        // Filter out listings created by our user
        if (showMyListings) {
            const filteredListings = updatedListings.filter((listing) => listing.User.id === user.id);
            setFilteredListings(filteredListings);
            return;
        }
        const filteredListings = updatedListings.filter((listing) => listing.User.id !== user.id);
        setFilteredListings(filteredListings);

    }, [updatedListings, showMyListings]);

    const handleApply = (listingId) => {
        const apply = async () => {
            await applyToListing(listingId);
        };

        try {
            apply();
        } catch (error) {
            console.error('Error applying to listing', error);
        }
    };

    const handleViewApplications = (listingId) => {
        const viewApplications = async () => {
            const response = await fetchListingApplicants(listingId);
            if (!response) {
                return;
            }
            // console.log(response);
            setApplicants(response);
            setShowApplications(true);
        };

        try {
            viewApplications();
        } catch (error) {
            console.error('Error fetching applicants', error);
        }
    }

    const handleBack = () => {
        setShowApplications(false);
    };

    return (
        <div className="listings-list">
            <h3>Αγγελίες</h3>

            {showApplications 
            ? (<ListingsApplicants applicants={applicants} handleBack={handleBack}/>) 
            : <ul className='listings-ul'>
                {filteredListings.length > 0 ? (
                    filteredListings.map((listing) => (
                        <div key={listing.id} className='listing-container box-container'> 
                            <div className='creator-details'>
                                <img src={listing.User.photo} alt='creator' className='micro-profile-picture'/>
                                <span>{listing.User.firstName} {listing.User.lastName}</span>
                            </div>
                            
                            <li key={listing.id}>
                                <h2>{listing.title} </h2> <p></p>
                                <div className='listing-details'>
                                    <span>Εταιρία:</span>
                                    <p>{listing.company}</p>
                                </div>
                                <div className='listing-details'>
                                    <span>Περιγραφή:</span>
                                    <p>{listing.description}</p>
                                </div>
                                <div className='listing-details'>
                                    <span>Τοποθεσία:</span>
                                    <p>{listing.location}</p>
                                </div>
                                <div className='listing-details'>
                                    <span>Αμοιβή:</span>
                                    <p>{listing.salary}</p>
                                </div>
                            </li>
                            {
                                listing.User.id === user.id ? (
                                    <div className='apply-button'>
                                        <button className='custom-button' onClick={()=> {handleViewApplications(listing.id)}}>Προβολή αιτήσεων</button>
                                    </div>
                                ) : (
                                    <div className='apply-button'>
                                        <button className='custom-button' onClick={()=> {handleApply(listing.id)}}>Αίτηση</button>
                                    </div>
                                )
                            }
                        </div>
                    ))
                ) : (
                    <p>No job listings available.</p>
                )}
            </ul>
            }
        </div>
    );
};

export default ListingsList;
