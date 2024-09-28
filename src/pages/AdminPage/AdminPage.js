// AdminPage.js
import React, { useState, useEffect, useContext} from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../../context/AuthContext';
import './AdminPage.css'


import { getAllUsers, createDummyData } from '../../services/adminServices';

import XMLButton from './XMLButton';
import JSONButton from './JSONButton';
import Spinner from '../../components/Spinner/Spinner';
import UserList from './UserList';

const AdminPage = () => {
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

	const handleCreateDummyData = () => {
		const fetchDummyData = async () => {
			try {
				setLoading(true);
				await createDummyData(); // Assuming this function makes the request

				// Refresh the user list after creating dummy data
				const data = await getAllUsers();
				setUsers(data);
				setLoading(false);
			} catch (error) {
				console.error('Error creating dummy data:', error);
			}
		};
		fetchDummyData();
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
			<div className='top-buttons'>
				<button onClick={handleCreateDummyData} className='custom-button' >Δημιουργία dummy Data</button>
				<button onClick={handleDisconnect} className='delete-button' >Αποσύνδεση</button>
			</div>
			<div className="export-buttons">
				<JSONButton selectedUsers={selectedUsers} />
				<XMLButton selectedUsers={selectedUsers} />
			</div>
			<UserList users={users} selectedUsers={selectedUsers} setSelectedUsers={setSelectedUsers} />
			
		</div>
	);
};

export default AdminPage;
