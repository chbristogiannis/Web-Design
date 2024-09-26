import React, { useEffect, useState } from 'react';
import './ListingsList.css';
import { applyToListing, fetchListingApplicants, markListingAsSeen } from '../../services/listingServices';
import ListingsApplicants from '../ListingsApplicants/ListingsApplicants';
import ListingItem from './ListingItem'; // Import the new ListingItem component

const ListingsList = ({ updatedListings, user, showMyListings }) => {
    const [filteredListings, setFilteredListings] = useState([]);
    const [applicants, setApplicants] = useState([]);
    const [showApplications, setShowApplications] = useState(false);
    const [seenListings, setSeenListings] = useState(new Set()); // Track seen listings

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
            setApplicants(response);
            setShowApplications(true);
        };

        try {
            viewApplications();
        } catch (error) {
            console.error('Error fetching applicants', error);
        }
    };

    const handleBack = () => {
        setShowApplications(false);
    };

    const handleListingSeen = async (listingId) => {
        // Check if the listing is already marked as seen
        if (!seenListings.has(listingId)) {
            try {
                await markListingAsSeen(listingId); // Backend call to mark as seen
                setSeenListings((prev) => new Set(prev).add(listingId)); // Add to the seen set
            } catch (error) {
                console.error('Error marking listing as seen', error);
            }
        }
    };

    return (
        <div className="listings-list">
            <h3>Αγγελίες</h3>

            {showApplications ? (
                <ListingsApplicants applicants={applicants} handleBack={handleBack} />
            ) : (
                <ul className='listings-ul'>
                    {filteredListings.length > 0 ? (
                        filteredListings.map((listing) => (
                            <ListingItem
                                key={listing.id}
                                listing={listing}
                                user={user}
                                onListingSeen={handleListingSeen}
                                handleApply={handleApply}
                                handleViewApplications={handleViewApplications}
                            />
                        ))
                    ) : (
                        <p>Δεν υπάρχουν Αγγελίες</p>
                    )}
                </ul>
            )}
        </div>
    );
};

export default ListingsList;
