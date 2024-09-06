// src/UserHomePage.js
import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';  // Adjust the import path
import { useNavigate } from 'react-router-dom';

import AutoResizingTextArea from '../../components/AutoResizingTextArea';  // Adjust the import path
import Navbar from '../../components/NavBar';  // Adjust the import path
import DeleteButton from '../../components/Delete-Button';

import { createPost , getPosts, likePost } from '../../services/postServices';

import './UserHomePage.css';


import blankPage from '../../assets/blank-page.png';


function HomePage() {
	const {user, isAuthenticated, loading} = useAuth();

	const fileInputRef = useRef(null);
	const textInputRef = useRef(null);

	const [text, setText] = useState('');
	const [fileName, setFileName] = useState('');
	const navigate = useNavigate();

	const handleChange = (event) => {
    	setText(event.target.value); // Update the value state
	};

	const handleDeleteFile = () => {
		setFileName(''); // Clear the fileName state

		// Reset the file input so the same file can be selected again
		if (fileInputRef.current) {
			fileInputRef.current.value = ''; // Reset the file input value
		}
	}; 

	const mediaButtonClicked = () => {
		fileInputRef.current.click();
	};

	const handleFileChange = (event) => {
		if ( event.target.files[0]) {
			const file = event.target.files[0]; // Access the selected file
			setFileName(file.name); // Update the file name state
			console.log(file.name);
		}
	}

	const onSumitButtonClicked = () => {
		if (!(text === '') || !(fileName === '')) {
			setText('');
			setFileName('');

			if (fileInputRef.current) {
				fileInputRef.current.value = ''; // Reset the file input value
			}

			createPost({text: text, file: fileName});
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
							value={text}
							onChange={handleChange}
							placeholder="Δημιουργήστε ένα νέο άρθρο ..."
							onFocus={(event) => event.target.placeholder = ''}
							onBlur={(event) => event.target.placeholder = 'Δημιουργήστε ένα νέο άρθρο ...'}
						/>
						{fileName ? <div className="filename-container"> 
							<img src={blankPage} alt= ''/> 
							<p> {fileName} </p> 
							<DeleteButton
								label="X"
								onClick={handleDeleteFile}
							/> 
						</div> : null}
						<div className="media-upload">
							<button className="custom-button" onClick={mediaButtonClicked}>
								Πολυμέσα 
							</button>
							<input 
								type="file" 
								name="file" 
								ref={fileInputRef} 
								style={{ display:'none' }} 
								onChange={handleFileChange}
							/>
							<button className="custom-button" onClick={onSumitButtonClicked} > Δημιοσίευση </button>
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

