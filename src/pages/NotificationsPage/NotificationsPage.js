// src/NotificationsPage.js
import React, { useState, useEffect } from 'react';
import Navbar from '../../components/NavBar/NavBar';
import { useNavigate } from 'react-router-dom';
import Spinner from '../../components/Spinner/Spinner';


import { fetchNotifications, deleteNotification } from '../../services/notificationsServices';
import './NotificationsPage.css';

import FriendRequests from './FriendRequests';
import Interactions from './Interactions';

function NotificationsPage() {
	const [interactions, setInteractions] = useState([]);
	const [friendRequests, setFriendRequests] = useState([]);
	const [loading, setLoading] = useState(true);

	const navigate = useNavigate();
	const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit', hour12: false };

	useEffect(() => {
		const getNotifications = async () => {
			try {
				const notifications = await fetchNotifications();

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
		navigate(`/UserProfilePage/${userId}`);
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
					{loading 
					? 	<Spinner /> 
					:	<FriendRequests 
							friendRequests={friendRequests} 
							loading={loading} 
							handleDeleteNotification={handleDeleteNotification} 
							handleViewProfile={handleViewProfile}
						/>
					}
				</div>
			</div>

			<div className="notification-section">
				<h3>Ειδοποιήσεις ενδιαφέροντος και σχολίων</h3>
				<div className="box-container notification-container">
					{loading 
					? 	<Spinner/> 
					:	<Interactions 
							interactions={interactions} 
							handleDeleteNotification={handleDeleteNotification} 
							handleViewProfile={handleViewProfile} 
							loading={loading}
						/>
					}
				</div>
			</div>
		</div>
	);
}

export default NotificationsPage;
