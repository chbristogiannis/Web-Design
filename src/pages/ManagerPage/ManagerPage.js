// ManagerPage.js
import React, { useState, useEffect, useContext} from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../../context/AuthContext';
import './ManagerPage.css'



import { getAllUsers, getUserById, getUsersDataXML, getUsersDataJSON } from '../../services/adminServices';

import Spinner from '../../components/Spinner/Spinner';

const UserListPage = () => {
	const [users, setUsers] = useState([]);
	const [selectedUsers, setSelectedUsers] = useState([]);
	const [loading, setLoading] = useState(false);

    const { logout } = useContext(AuthContext);

	
	const navigate = useNavigate();

	useEffect(() => {
		setLoading(true);
		const fetchUsers = async () => {
			try {
				const data = await getAllUsers();
				setUsers(data);
				setLoading(false);
			} catch (error) {
				console.error(error);
			}
		};

		fetchUsers();
	}, []);

	const handleUserClick = (id) => {
		navigate(`/AdminUserPage/${id}`);
	};

	const handleSelectUser = (id) => {
		setSelectedUsers(prevState =>
			prevState.includes(id)
				? prevState.filter(userId => userId !== id)
				: [...prevState, id]
		);
	};

	const exportToJSON = () => {
		const fetchJSON = async () => {
			try {
				const data = await getUsersDataJSON(selectedUsers);
				console.log('JSON response:', data);
				return data;
			} catch (error) {
				console.error(error);
			}
		};

		fetchJSON();
	}

	const convertToXML = () => {
		const fetchXML = async () => {
			try {
				const response = await getUsersDataXML(selectedUsers); // Assuming this function makes the request
				console.log('XML response:', response); // Optional: Log the response for debugging
				// const xmlString = await response.text(); // Get the XML response as a string
				// console.log('Raw XML:', xmlString); // Optional: Log the raw XML string for debugging

				// // Parse the XML string to a DOM object
				// const parser = new DOMParser();
				// const xmlDoc = parser.parseFromString(xmlString, 'application/xml');

				// // Example: Extract and log user information
				// const users = xmlDoc.getElementsByTagName('user');
				// for (let i = 0; i < users.length; i++) {
				// 	const id = users[i].getElementsByTagName('id')[0].textContent;
				// 	const firstName = users[i].getElementsByTagName('firstName')[0].textContent;
				// 	const lastName = users[i].getElementsByTagName('lastName')[0].textContent;
				// 	console.log(`User ${id}: ${firstName} ${lastName}`);
				// }

				// // You can now render this data to your UI or process it as needed
				// // Example: Display user names in a list
				// const userList = document.getElementById('userList');
				// userList.innerHTML = ''; // Clear any existing data
				// for (let i = 0; i < users.length; i++) {
				// 	const firstName = users[i].getElementsByTagName('firstName')[0].textContent;
				// 	const lastName = users[i].getElementsByTagName('lastName')[0].textContent;
				// 	const listItem = document.createElement('li');
				// 	listItem.textContent = `${firstName} ${lastName}`;
				// 	userList.appendChild(listItem);
				// }
			} catch (error) {
			console.error('Error fetching XML data:', error);
			}};
		fetchXML();
	};

	const handleDisconnect = async () => {
		await logout();
    	navigate('/');  // Use the navigate function to redirect to the login
	};

	if (loading) {
		return <Spinner />;
	}

	return (
		<div className="user-list-page">
			<h2>Λίστα όλων των χρηστών:</h2>
			<ul className="user-list">
				{users.map(user => (
				<li key={user.id} className="user-item box-container">
					<input
						type="checkbox"
						checked={selectedUsers.includes(user.id)}
						onChange={() => handleSelectUser(user.id)}
					/>
					<span onClick={() => handleUserClick(user.id)}> id: {user.id} | {user.firstName} | {user.lastName}</span>
				</li>
				))}
			</ul>
			<div className="export-buttons">
				<button onClick={() => exportToJSON()} className='custom-button'>Export JSON</button>
				<button onClick={() => convertToXML()} className='custom-button'>Export XML</button>
			</div>
			<button onClick={handleDisconnect} className='delete-button' style={{marginTop: "1rem"}}>Αποσύνδεση</button>
		</div>
	);
};

export default UserListPage;
