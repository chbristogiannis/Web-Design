// src/NetworkPage.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

import Navbar from '../../components/NavBar/NavBar';

import { search as searchService , fetchConnectedProfessionals as connectedProfessionalsService} from '../../services/networkServices';

import './NetworkPage.css';

import Search from './Search';
import ConnectedProfessionals from './ConnectedProfessionals';

function NetworkPage() {
	const {user, isAuthenticated, loading: authLoading} = useAuth();

	const navigate = useNavigate();

	const handleProfessionalClick = (id) => {
		const navigateLink = `/UserProfilePage/${id}`;
		navigate(navigateLink);
	};

	return (
		<div className="network-page">
			<Navbar />
			<Search handleProfessionalClick={handleProfessionalClick} />
			<ConnectedProfessionals isAuthenticated={isAuthenticated} authLoading={authLoading} handleProfessionalClick={handleProfessionalClick} />
		</div>
	);
}

export default NetworkPage;

