import React from 'react';
import { useNavigate } from 'react-router-dom';

const SideProfile = ({user}) => {
    const navigate = useNavigate();

    return (
        <aside className="box-container left-sidebar">
            <div className="user-info">
                <div className="user-profile">
                    <img
                        src={user.photo}
                        alt="Profile"
                        className="profile-picture"
                    />
                    <h3>{user.firstName + ' ' +user.lastName}</h3>
                </div>
                <h3>Προσωπικά Στοιχεία</h3>
                <div className="redirect-button-container">
                    <button onClick={() => navigate('/PersonalDetailsPage')}>
                        Δείτε το προφίλ σας
                    </button>
                </div>
            </div>
            <div className="user-network">
                <h3>Το Δίκτυό σας</h3> 
                <div className="redirect-button-container">
                    <button onClick={() => navigate('/NetworkPage')}>
                        Δείτε το δίκτυό σας
                    </button>
                </div>
            </div>
        </aside>
    )
};

export default SideProfile;