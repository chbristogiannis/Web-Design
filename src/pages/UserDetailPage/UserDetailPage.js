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
							<div className='user-name'>{user.firstName} {user.lastName}</div>
						</div>
						{(!isFriend && !friendRequestSent && !friendRequestReceived)&& 
							<button onClick={handleFriendRequest}> add as friend </button>}
						{(!isFriend && friendRequestReceived) && 
							<button onClick={handleFriendRequestAccept}> accept friend request</button>}
						{(!isFriend && friendRequestReceived) && 
							<button onClick={handleFriendRequestDecline}> decline friend request</button>}
						{(!isFriend && friendRequestSent)  && 
							<button disabled> friend request already sent</button>}
						{isFriend && 
							<button onClick={handleRemoveFriend}> remove friend</button>}
					</div>
					<div className="personal-info-container">
						{/* <div className='skills'> */}
							<div className='box-container'>
								<div className='title'>Δεξιότητες</div>
								{skills.map((skill, index) => (
									<div key={index} className='skill'>{skill.skill}</div>
								))}
							</div>
						{/* </div> */}
						{/* <div className='education'> */}
							<div className='box-container'>
								<div className='title'>Εκπαίδευση</div>
								{education.map((ed, index) => (
									<div key={index} className='education-item'>
										<div className='institution'>{ed.institution}</div>
										<div className='degree'>{ed.degree}</div>
										<div className='years'>{ed.startYear} - {ed.endYear}</div>
									</div>
								))}
							</div>
							{/* <div className="box-container personal-details-box">
								<h3>Εκπαίδευση</h3>
								<div className='show-items'>
									{education.map((ed, index) => (
										<div key={ed.id} className='bubble-container'>
											<p>{ed.institution}</p>
											<p>{ed.degree}</p>
											<p>{ed.startYear}-{ed.endYear ? ed.endYear : 'Σήμερα'}</p>
										</div>
									))}
								</div>
							</div> */}
						{/* </div> */}
						{/* <div className='experience'> */}
							<div className='box-container'>
								<div className='title'>Εμπειρία</div>
								{experience.map((exp, index) => (
									<div key={index} className='experience-item'>
										<div className='company'>{exp.company}</div>
										<div className='role'>{exp.role}</div>
										<div className='years'>{exp.startYear} - {exp.endYear}</div>
									</div>
								))}
							</div>
						{/* </div> */}
					</div>
				</div>
			)}
		</div>
	);
};

export default UserDetailPage;
