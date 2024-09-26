import React, { useEffect } from 'react';
import useVisibilityObserver from '../../hooks/useVisibilityObserver';

const ListingItem = ({ listing, user, onListingSeen, handleApply, handleViewApplications }) => {
    const [ref, isVisible] = useVisibilityObserver({
        threshold: 0.5, // Adjust this value to control when the listing is considered visible
    });

    useEffect(() => {
        if (isVisible) {
            onListingSeen(listing.id);
        }
    }, [isVisible, listing.id, onListingSeen]);

    return (
        <div ref={ref} className='listing-container box-container'>
            <div className='creator-details'>
                <img src={listing.User.photo} alt='creator' className='micro-profile-picture' />
                <span>{listing.User.firstName} {listing.User.lastName}</span>
            </div>

            <li>
                <h2>{listing.title}</h2>
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
            {listing.User.id === user.id ? (
                <div className='apply-button'>
                    <button className='custom-button' onClick={() => { handleViewApplications(listing.id); }}>Προβολή αιτήσεων</button>
                </div>
            ) : (
                <div className='apply-button'>
                    <button className='custom-button' onClick={() => { handleApply(listing.id); }}>Αίτηση</button>
                </div>
            )}
        </div>
    );
};

export default ListingItem;
