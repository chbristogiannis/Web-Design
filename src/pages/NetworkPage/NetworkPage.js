// src/NetworkPage.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

import Navbar from '../../components/NavBar/NavBar';

import { search as searchService , fetchConnectedProfessionals as connectedProfessionalsService} from '../../services/networkServices';

import './NetworkPage.css';

function NetworkPage() {
	const {user, isAuthenticated, loading: authLoading} = useAuth();

	const [searchTerm, setSearchTerm] = useState('');
	const [connectedProfessionals, setConnectedProfessionals] = useState([]);
	const [searchResults, setSearchResults] = useState([]);
	const [noConnectedProfessionals, setNoConnectedProfessionals] = useState(false);
	const [noSearchResults, setNoSearchResults] = useState(false);

	const navigate = useNavigate();

	useEffect(() => {
		const fetchConnectedProfessionals = async() => {
			const professionals = await connectedProfessionalsService();
			if (!professionals || professionals.length === 0) {
				setNoConnectedProfessionals(true);
				return;
			}
			setNoConnectedProfessionals(false);
			setConnectedProfessionals(professionals);
		};

		if (isAuthenticated && !authLoading) {
			fetchConnectedProfessionals();
		}
	}, []);

	const handleSearch = (e) => {
		const search = async () => {
			if (!searchTerm || searchTerm.length === 0) {
				setSearchResults([]);
				setSearchTerm('');
				return;
			}

			const results = await searchService(searchTerm);
			if (!results) {
				return;
			}

			if (results.length === 0) {
				setNoSearchResults(true);
				setSearchResults([]);
				setSearchTerm('');
				return;
			}

			setNoSearchResults(false);
			setSearchResults(results);
			setSearchTerm('');
		}
		search();
	};

	const handleProfessionalClick = (id) => {
		// console.log('clicked', id);
		const navigateLink = `/UserDetailPage/${id}`;
		navigate(navigateLink);
		// window.location.href = `/professional/${id}`;
	};

	return (
		<div className="network-page">
			<Navbar />
			<div className="search-bar">
			<input
				type="text"
				value={searchTerm}
				onChange={(e) => setSearchTerm(e.target.value)}
				placeholder="Αναζητήστε επαγγελματίες..."
			/>
			<button onClick={handleSearch}>Αναζήτηση</button>
			</div>
			{searchResults.length > 0 && (
				<div className="box-container search-container">
					<div className='top-bar'>
						<div className='title'>Κορυφαία αποτελέσματα:</div>
						<div className='close' onClick={() => setSearchResults([])}>Κλείσιμο</div>
					</div>
					{searchResults.map((professional) => (
						<li key={professional.id} onClick={() => handleProfessionalClick(professional.id)}>
							{professional.photo ? (
								<img src={professional.photo} alt="profile" className="micro-profile-picture" />
							) : (
								<img src={'https://via.placeholder.com/100'} alt="profile" className="micro-profile-picture" />
							)}
							<span className="professional-name">
								{professional.firstName} {professional.lastName} {professional.role} {professional.company}
							</span>
						</li>
					))}
				</div>
			)}

			{noSearchResults && (
				<div className="box-container search-container">
					<div className='top-bar'>
						<div className='title'></div>
						<div className='close' onClick={() => setNoSearchResults(false)}>Κλείσιμο</div>
					</div>
					<p style={{
						color: 'var(--primary-text-color)',
						fontSize: '1.2rem',
						fontStyle: 'italic',
						textAlign: 'center',
					}}  >Δεν βρέθηκαν αποτελέσματα</p>
				</div>
			)}

			<div className="connected-professionals">
				<h3>Συνδεδεμένοι με εσάς επαγγελματίες:</h3>
				<div className="professionals-grid">
					{connectedProfessionals.map((professional) => (
						<div key={professional.id} className="box-container professional-card" onClick={() => handleProfessionalClick(professional.id)}>
							{professional.photo ? <img src={professional.photo} alt={'Profile'} /> : <img src={'https://via.placeholder.com/100'} alt={'Profile'} />}
							<h4>{professional.firstName} {professional.lastName}</h4>
							{professional.role ? <p>{professional.role}</p> : <p>-</p>}
							{professional.company ? <p>{professional.company}</p> : <p>-</p>}
						</div>
					))}
				</div>
			</div>
		</div>
	);
}

export default NetworkPage;

