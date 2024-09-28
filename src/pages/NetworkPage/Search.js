import React, { useState } from 'react';
import { search as searchService } from '../../services/networkServices';

const Search = ({handleProfessionalClick}) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [noSearchResults, setNoSearchResults] = useState(false);


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


    return (
        <>
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

        </>
    );
}

export default Search;