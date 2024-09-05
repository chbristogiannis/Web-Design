// src/UserHomePage.js
import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';  // Adjust the import path
import { useNavigate } from 'react-router-dom';

import AutoResizingTextArea from '../../components/AutoResizingTextArea';  // Adjust the import path
import Navbar from '../../components/NavBar';  // Adjust the import path
import './UserHomePage.css';

function HomePage() {
	const {user, isAuthenticated, loading} = useAuth();
	const [value, setValue] = useState('');
	const textAreaRef = useRef(null);
	const navigate = useNavigate();


	const handleChange = (event) => {
    	setValue(event.target.value); // Update the value state

		if (textAreaRef.current) {
			textAreaRef.current.style.height = 'auto';
			textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`;
		}
	};

	useEffect(() => {
		if (loading) {
			// Handle loading state (e.g., show a loader)
		}
	}, [loading]);


	return (
		<div className="homepage-container">
			<Navbar />
			<div className="content-container">
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

				<main className="main-content">
					<h3>Το Χρονολόγιο σας</h3>
					<div className="box-container post-container">
						<AutoResizingTextArea
							value={value}
							onChange={handleChange}
							placeholder="Δημιουργήστε ένα νέο άρθρο ..."
						/>
						<div className="media-upload">
							<button className="custom-button"> Πολυμέσα </button>
							<button className="custom-button"> Δημιοσίευση </button>
						</div>
					</div>

					<div className="box-container post-container">
						<div className="post-user-container"> 
							<img
								src={user.photo}
								alt="Profile"
								className="mini-profile-picture"
							/>
							<h3>{user.firstName + ' ' + user.lastName}</h3>
						</div>
						<div className="post-body">
							<p>
								Καλημέρα σε όλους! Σήμερα είναι μια όμορφη μέρα.
							</p>
						</div>
						<div className="post-actions">
							<button className="custom-button">Ενδιαφέρον</button>
							<button className="custom-button">Σχόλιο</button>
						</div>
					</div>
				</main>
			</div>
		</div>
	);
}

export default HomePage;

