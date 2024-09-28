// src/JobListingsPage.js
import React, { useState, useEffect } from 'react';
import './JobListingsPage.css';
import { fetchListings } from '../../services/listingServices';
import Navbar from '../../components/NavBar/NavBar';
import { useAuth } from '../../context/AuthContext';

import ListingsForm from './ListingsForm';
import ListingsList from './ListingsList';

function JobListingsPage() {
    const { user, isAuthenticated, loading: authLoading } = useAuth();
    const [listings, setListings] = useState([]);
	const [formActive, setFormActive] = useState(false);
	const [showMyListings, setShowMyListings] = useState(false);

    // Fetch listings when the component mounts
    useEffect(() => {
        const fetchAllListings = async () => {
            const fetchedListings = await fetchListings();
			// User photo 

			const mappedListings = fetchedListings.map((listing) => {
				const photo = listing.User.photo
				return {
					...listing,
					User: {
						...listing.User,
						photo: photo ? photo : 'https://via.placeholder.com/100'
					},
				};
			});

            setListings(mappedListings); // Populate listings with data from the API

        };
        fetchAllListings();
    }, []);

    const handleAddListing = (newListing) => {
        // Include user info in the new listing
        const userListing = {
            ...newListing,
            User: {
                id: user.id,
                firstName: user.firstName,
                lastName: user.lastName,
                photo: user.photo ? user.photo : 'https://via.placeholder.com/100',
            },
        };

        // Add the new listing to the listings array
        setListings((prevListings) => [userListing, ...prevListings]);
    };

    return (
        <div className="job-listings-page">
            <Navbar />
			<div className='button-section'>
				<button className={`message-item ${!showMyListings ? 'custom-button' : 'non-active'} `} onClick={() => setShowMyListings(false)}>Αγγελίες</button>
				<button className={`message-item ${showMyListings ? 'custom-button' : 'non-active'} `}  onClick={() => setShowMyListings(true)}>Οι Αγγελίες μου</button>
				<button className={`message-item ${formActive ? 'custom-button' : 'non-active'} `} onClick={() => {setFormActive(!formActive)}}>Δημιουργία νέας αγγελίας</button>
			</div>
			{formActive && <ListingsForm onAddListing={handleAddListing} />}
            <ListingsList updatedListings={listings} user={user} showMyListings={showMyListings} />
        </div>
    );
} 

export default JobListingsPage;
