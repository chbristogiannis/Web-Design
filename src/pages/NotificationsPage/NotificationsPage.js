// src/NotificationsPage.js
import React, { useState, useEffect } from 'react';
import Navbar from '../../components/NavBar/NavBar';
import { useNavigate } from 'react-router-dom';
import Spinner from '../../components/Spinner/Spinner';


import { fetchNotifications, deleteNotification } from '../../services/notificationsServices';
import './NotificationsPage.css';

function NotificationsPage() {
	const [interactions, setInteractions] = useState([]);
	const [friendRequests, setFriendRequests] = useState([]);
	const [loading, setLoading] = useState(true);

	const navigate = useNavigate();
	const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit', hour12: false };

	useEffect(() => {
		// Simulate fetching connection requests with dummy data
		const getNotifications = async () => {
			try {
				const notifications = await fetchNotifications();
				console.log(notifications.friendRequests);
				console.log(notifications.likesAndComments);

				//map time to readable format
				if (!notifications || !notifications.likesAndComments || !notifications.friendRequests) {
					return;
				}

				if(notifications.likesAndComments.length !== 0 && notifications.likesAndComments[0] !== null) {
					notifications.likesAndComments.forEach(notification => {
						notification.createdAt = new Date(notification.createdAt).toLocaleDateString('el-GR', options);
					});
					setInteractions(notifications.likesAndComments);
				}
				
				if (notifications.friendRequests.length !== 0 && notifications.friendRequests[0] !== null) {
					notifications.friendRequests.forEach(notification => {
						notification.createdAt = new Date(notification.createdAt).toLocaleDateString('el-GR', options);
					});
					setFriendRequests(notifications.friendRequests);
				}
			

				// console.log(interactionNotification);


			} catch (error) {
				console.error(error);
			}
		};

		try {
			getNotifications();
			setLoading(false);
		} catch (error) {
			console.error(error);
		}

	}, []);

	const handleViewProfile = (userId) => {
		console.log('View profile:', userId);
		navigate(`/UserDetailPage/${userId}`);
	}

	const handleDeleteNotification = async (notification) => {
		try {
			await deleteNotification(notification.notificationId);

			if (notification.type === 'like' || notification.type === 'comment') {
				setInteractions(interactions.filter(interaction => interaction.notificationId !== notification.notificationId));
			}
			if (notification.type === 'friendRequest') {
				setFriendRequests(friendRequests.filter(request => request.notificationId !== notification.notificationId));
			}
		} catch (error) {
			console.error(error);
		}
	}

	return (
		<div className="notifications-page">
			<Navbar/>
			
			<div className="notification-section">
				<h3>Αιτήματα σύνδεσης</h3>
				<div className="box-container notification-container">
					{loading ? 
						<Spinner /> :
						<div>
							{friendRequests.length > 0 ? (
								<ul>
								{friendRequests.map((request) => (
									<li key={request.notificationId}>
										{ request.profilePicture ? <img src={request.profilePicture} alt='profile' className='mini-profile-picture' onClick={() => handleViewProfile(request.userId)} style={{cursor:"pointer"}}/> : <img src='https://via.placeholder.com/100' className='mini-profile-picture'  onClick={() => handleViewProfile(request.userId)} style={{cursor:"pointer"}}/> }
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
					}
				</div>
			</div>

			<div className="notification-section">
				<h3>Ειδοποιήσεις ενδιαφέροντος και σχολίων</h3>
				<div className="box-container notification-container">
					{loading 
						? <Spinner/> : 
						<div>
							{interactions.length > 0 ? (
								<ul>
								{interactions.map((interaction) => (
									<li key={interaction.notificationId}>
										{ interaction.profilePicture ? 
											<img src={interaction.profilePicture} alt='profile' className='mini-profile-picture' onClick={() => handleViewProfile(interaction.userId)} style={{cursor:"pointer", width:"fitContent", minWidth:"3rem"}}/> 
											: 
											<img src='https://via.placeholder.com/100' className='mini-profile-picture' onClick={() => handleViewProfile(interaction.userId)} style={{cursor:"pointer", width:"fitContent", minWidth:"3rem"}}/> }
										{interaction.type === 'like' 
											&& <p className='notification-text'>{interaction.firstName} {interaction.lastName} σημείωσε το ενδιαφέρον του σε μία από τις αναρτήσεις σας</p>}
										{interaction.type === 'comment' 
											&& <div style={{flex:"1"}}>
												<p className='notification-text'>{interaction.firstName} {interaction.lastName} σχολίασε σε μία από τις αναρτήσεις σας: </p>
												<p className='comment-container'>{interaction.commentContent}</p>
											</div>
										}
										<span className='date-span'>{interaction.createdAt}</span>
										<button className='delete-button' onClick={() => handleDeleteNotification(interaction)}>x</button>
									</li>
								))}
								</ul>
							) : (
								!loading &&
								<p className='notification-text'>Δεν έχετε κάποια νέα ειδοποίηση</p>
							)}
						</div>
					}
				</div>
			</div>
		</div>
	);
}

export default NotificationsPage;
