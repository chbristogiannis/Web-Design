// UserProfilePage.js
import React, {useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import { fetchFriendCheck, fetchUserProfile, fetchFriendRequests, fetchSentFriendRequest } from '../../services/userService';
import { useAuth } from '../../context/AuthContext';

import ProfileDetails from './ProfileDetails';
import Skills from './Skills';
import Education from './Education';
import Experience from './Experience';

import './UserProfilePage.css';

import Navbar from '../../components/NavBar/NavBar';

const UserProfilePage = () => {
	const { id } = useParams();
	const [user, setUser] = useState(null);
	const [skills, setSkills] = useState([]);
	const [education, setEducation] = useState([]);
	const [experience, setExperience] = useState([]);

	const [isFriend, setIsFriend] = useState(false);
	const [friendRequestSent, setFriendRequestSent] = useState(false);
	const [friendRequestReceived, setFriendRequestReceived] = useState(false);

	const {user: loggedInUser, isAuthenticated, loading: authLoading} = useAuth();

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

	return (
		<div className="user-detail-page">
			<Navbar/>
			{user && (
				<div className='container'>
					<ProfileDetails
						id={id}
						user={user} 
						isFriend={isFriend} 
						setIsFriend={setIsFriend}
						friendRequestSent={friendRequestSent}
						setFriendRequestSent={setFriendRequestSent}
						friendRequestReceived={friendRequestReceived}
						setFriendRequestReceived={setFriendRequestReceived}
						loggedInUser={loggedInUser}
					/>
					<div className="personal-info-container">
						<Skills skills={skills} />
						<Education education={education} />
						<Experience experience={experience} />
					</div>
				</div>
			)}
		</div>
	);
};

export default UserProfilePage;
