import React from 'react';
import { useNavigate } from 'react-router-dom';

const FriendRequests = ({ friendRequests, loading, handleDeleteNotification, handleViewProfile }) => {

    return (
        <div>
            {friendRequests.length > 0 ? (
                <ul>
                {friendRequests.map((request) => (
                    <li key={request.notificationId}>
                        { request.profilePicture 
                            ? <img src={request.profilePicture} alt='profile' className='mini-profile-picture' onClick={() => handleViewProfile(request.userId)} style={{cursor:"pointer"}}/> 
                            : <img src='https://via.placeholder.com/100' alt='profile' className='mini-profile-picture'  onClick={() => handleViewProfile(request.userId)} style={{cursor:"pointer"}}/> }
                        <p className='notification-text'>{request.firstName} {request.lastName} σας έχει στείλει ένα αίτημα σύνδεσης </p>
                        <span className='date-span'>{request.createdAt}</span>
                        <button className="custom-button"  onClick={() => handleViewProfile(request.userId)} >Προβολή Προφίλ</button>
                        <button className='delete-button' onClick={() => handleDeleteNotification(request)}>x</button>
                    </li>
                ))}
                </ul>
            ) : (
                !loading &&
                <p className='notification-text'>Δεν έχετε αιτήματα σύνδεσης</p>
            )}
        </div>
    )
}

export default FriendRequests;