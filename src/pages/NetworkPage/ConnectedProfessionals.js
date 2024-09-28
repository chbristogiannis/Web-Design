import React, { useEffect, useState } from 'react';
import {fetchConnectedProfessionals as connectedProfessionalsService} from '../../services/networkServices';


const ConnectedProfessionals = ({isAuthenticated , authLoading, handleProfessionalClick}) => {
	const [connectedProfessionals, setConnectedProfessionals] = useState([]);
	const [noConnectedProfessionals, setNoConnectedProfessionals] = useState(false);
	const [noSearchResults, setNoSearchResults] = useState(false);

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

    return (
        <div className="connected-professionals">
            <h3>Συνδεδεμένοι με εσάς επαγγελματίες:</h3>
            { noConnectedProfessionals 
            ?   <p>Δεν υπάρχουν συνδεδεμένοι επαγγελματίες</p> 
            :   <div className="professionals-grid">
                    {connectedProfessionals.map((professional) => (
                        <div key={professional.id} className="box-container professional-card" onClick={() => handleProfessionalClick(professional.id)}>
                            {professional.photo ? <img src={professional.photo} alt={'Profile'} /> : <img src={'https://via.placeholder.com/100'} alt={'Profile'} />}
                            <h4>{professional.firstName} {professional.lastName}</h4>
                            {professional.role ? <p>{professional.role}</p> : <p>-</p>}
                            {professional.company ? <p>{professional.company}</p> : <p>-</p>}
                        </div>
                    ))}
                </div>
            }
		</div>
    );
};

export default ConnectedProfessionals;