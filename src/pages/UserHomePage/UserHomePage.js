// src/UserHomePage.js
import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';  // Adjust the import path
import Navbar from '../../components/NavBar';  // Adjust the import path
import { useNavigate } from 'react-router-dom';
import './UserHomePage.css';

function HomePage() {
	const {user, isAuthenticated, loading} = useAuth();
	const navigate = useNavigate();

	useEffect(() => {
			if (loading) {
				// Handle loading state (e.g., show a loader)
			}
		}, [loading]);

	return (
		<div className="homepage-container">
			<Navbar />
			<div className="content-container">
				<aside className="left-sidebar">
					<div className="user-info">
						<div className="user-profile">
							<img
								src={user.photo}
								alt="Profile"
								className="profile-picture"
							/>
							<h3>{user.firstName}</h3>
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

				<main className="main-content">
					<div className="timeline">
						<h3>Το Χρονολόγιο σας</h3>
						<div className="post-creation">
							<textarea placeholder="Δημιουργήστε ένα νέο κείμενο ..."></textarea>
							<div className="media-upload">
								<button>Φωτογραφία</button>
								<button>Βίντεο</button>
								<button>Αρχείο Ήχου</button>
							</div>
							<button className="submit-post">Αναρτήστε</button>
						</div>

						<div className="posts">
							<div className="post">
								<h4>Άρθρο από επαγγελματία</h4>
								<p>Κείμενο του άρθρου...</p>
								<div className="post-actions">
								<button>Σχόλιο</button>
								<button>Ενδιαφέρον</button>
								</div>
							</div>
						</div>
					</div>
				</main>
			</div>
		</div>
	);
}

export default HomePage;

