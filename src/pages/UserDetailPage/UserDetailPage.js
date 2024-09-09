// UserDetailPage.js
import React, {useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import {fetchFriendCheck,  fetchUserProfile, fetchFriendRequests, fetchSentFriendRequest, sendFriendRequest, respondToFriendRequest, removeFriend } from '../../services/userService';

import './UserDetailPage.css';

import Navbar from '../../components/NavBar/NavBar';

const UserDetailPage = () => {
	const { id } = useParams();
	const [user, setUser] = useState(null);
	const [skills, setSkills] = useState([]);
	const [education, setEducation] = useState([]);
	const [experience, setExperience] = useState([]);

	const [isFriend, setIsFriend] = useState(false);
	const [friendRequestSent, setFriendRequestSent] = useState(false);
	const [friendRequestReceived, setFriendRequestReceived] = useState(false);

	useEffect(() => {
		const getUser = async () => {
			const response = await fetchUserProfile(id);
			if (!response) {
				return;
			}
			
			const {firstName, lastName, photo } = response.user;
			if (!id || !firstName || !lastName) {
				return;
			}
			const profilePhoto = photo !== null ? photo : "https://via.placeholder.com/100";
			setUser({firstName, lastName, photo: profilePhoto });

			const mappedSkills = response.skills.map(sk => {
				const {skill} = sk;
				return {skill};
			});
			setSkills(mappedSkills);

			const mappedEducation = response.education.map(ed => {
				let {institution, degree, startYear, endYear} = ed;
				endYear = endYear || 'Σήμερα';
				return {institution, degree, startYear, endYear};
			})
			setEducation(mappedEducation);

			const mappedExperience = response.experience.map(exp => {
				let {company, role, startYear, endYear} = exp;
				endYear = endYear || 'Σήμερα';
				return {company, role, startYear, endYear};
			});
			setExperience(mappedExperience);;
		}

		const checkIfFriend = async () => {
			const response = await fetchFriendCheck(id);
			if (!response) {
				return;
			}

			if (response.isFriend) {
				setIsFriend(true);
				return;
			}
			setIsFriend(false);
		}

		const getFriendRequestsReceived = async () => {
			const response = await fetchFriendRequests();
			if (!response) {
				return;
			}

			const friendRequest = response.find(req => parseInt(req.userId) == id);
			if (friendRequest) {
				setFriendRequestReceived(true);
			}
		}

		const getFriendRequestsSent = async () => {
			const response = await fetchSentFriendRequest();
			if (!response) {
				return;
			}

			const friendRequest = response.find(req => req.friendId == id);
			if (friendRequest) {
				setFriendRequestSent(true);
			}
		}

		const getRequiredData = async () => {
			try {
				await getUser();
				await checkIfFriend();
				await getFriendRequestsReceived();
				await getFriendRequestsSent();

			} catch (error) {
				console.error(error);
			}
		}

		getRequiredData();
	}, [id]);

	const handleFriendRequest = async () => {
		try {
			const response = await sendFriendRequest(id);
			if (!response) {
				return;
			}
			setFriendRequestSent(true);
		} catch (error) {
			console.error(error);
		}
	};

	const handleFriendRequestResponse = async (action) => {
		try {
			await respondToFriendRequest(id, action);
			if (!action) {
				return;
			}

			setFriendRequestReceived(false);
			if (action) { 
				setIsFriend(true);
			}
		} catch (error) {
			console.error(error);
		}
	};

	const handleFriendRequestAccept = () => {
		handleFriendRequestResponse("accept");
	};
	const handleFriendRequestDecline = () => {
		handleFriendRequestResponse("reject");
	}

	const handleRemoveFriend = () => {
		try {
			removeFriend(id);
			setIsFriend(false);
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<div className="user-detail-page">
			<Navbar/>
			{user && (
				<div className='container'>
					<div className='profile'>
						<div className='box-container'>
							<img src={user.photo} alt='profile' className='profile-image'/>
							<div className='profile-name'>{user.firstName} {user.lastName}</div>
						</div>
						{(!isFriend && !friendRequestSent && !friendRequestReceived)&& 
							<button onClick={handleFriendRequest} className='custom-button'> Αίτημα φιλίας</button>}
						<div>
							{(!isFriend && friendRequestReceived) && "Έχετε λάβει αίτημα φιλίας"}
						</div>
						<div style={{
							display: 'flex',
							gap: '.5rem',
						}}>
							{(!isFriend && friendRequestReceived) && 
								<button onClick={handleFriendRequestAccept} className='green-button'> Αποδοχή</button>}
							{(!isFriend && friendRequestReceived) && 
								<button onClick={handleFriendRequestDecline} className='delete-button'> Απόρρυψη</button>}
						</div>
						{(!isFriend && friendRequestSent)  && 
							<button disabled className='custom-button'> Έχει γίνει αίτημα </button>}
						{isFriend && 
							<button onClick={handleRemoveFriend} className='delete-button'> Διαγραφή Επαγγελματία</button>}
					</div>
					<div className="personal-info-container">
						<h3 className='title'>Δεξιότητες</h3>
						<div className="box-container personal-details-box">
							{ skills.length === 0 && <p>Δεν υπάρχουν καταχωρημένα στοιχεία</p>}
							<div className='show-items'>
								{skills.map((skill, index) => (
									<p key={index} className='bubble-container'>{skill.skill}</p>
								))}
							</div>
						</div>
						<h3>Εκπαίδευση</h3>
						<div className="box-container personal-details-box">
							{ education.length === 0 && <p>Δεν υπάρχουν καταχωρημένα στοιχεία</p>}
							<div className='show-items'>
								{education.map((ed, index) => (
									<div key={ed.id} className='bubble-container'>
										<p>{ed.institution}</p>
										<p>{ed.degree}</p>
										<p>{ed.startYear}-{ed.endYear ? ed.endYear : 'Σήμερα'}</p>
									</div>
								))}
							</div>
							</div>
						{/* </div> */}
						<h3 className='title'>Εμπειρία</h3>
						<div className='box-container personal-details-box'>
							{ experience.length === 0 && <p>Δεν υπάρχουν καταχωρημένα στοιχεία</p>}
							<div className='show-items'>
								{experience.map((exp, index) => (
									<div key={index} className='bubble-container'>
										<p className='company'>{exp.company}</p>
										<p className='role'>{exp.role}</p>
										<p className='years'>{exp.startYear} - {exp.endYear}</p>
									</div>
								))}
							</div>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default UserDetailPage;
