// AdminPage.js
import React, { useState, useEffect, useContext} from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../../context/AuthContext';
import './AdminPage.css'



import { getAllUsers, getUserById, getUsersDataXML, getUsersDataJSON, createDummyData } from '../../services/adminServices';

import Spinner from '../../components/Spinner/Spinner';

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

				// Create a Blob from the JSON data
				const jsonBlob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });

				// Create a temporary anchor element
				const downloadLink = document.createElement("a");

				// Create a URL for the blob
				const url = URL.createObjectURL(jsonBlob);
				downloadLink.href = url;

				// Set the download attribute with the desired file name
				downloadLink.download = "users_data.json";

				// Programmatically click the link to trigger the download
				downloadLink.click();

				// Clean up the URL after download
				URL.revokeObjectURL(url);
			} catch (error) {
				console.error(error);
			}
		};

		fetchJSON();
	}

	const convertToXML = () => {
    const fetchXML = async () => {
        try {
            const xmlData = await getUsersDataXML(selectedUsers);

            // Check if xmlData is an XMLDocument, and serialize it if needed
            let xmlString;
            if (xmlData instanceof XMLDocument) {
                const serializer = new XMLSerializer();
                xmlString = serializer.serializeToString(xmlData);
            } else {
                xmlString = xmlData; // Assume it is already a string
            }

            // Create a Blob from the XML string
            const xmlBlob = new Blob([xmlString], { type: "application/xml" });

            // Create a temporary anchor element
            const downloadLink = document.createElement("a");

            // Create a URL for the blob
            const url = URL.createObjectURL(xmlBlob);
            downloadLink.href = url;

            // Set the download attribute with the desired file name
            downloadLink.download = "users_data.xml";

            // Programmatically click the link to trigger the download
            downloadLink.click();

            // Clean up the URL after download
            URL.revokeObjectURL(url);
        } catch (error) {
            console.error('Error fetching XML data:', error);
        }
		};
		fetchXML();
	};


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
	}

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
				<button onClick={() => exportToJSON()} className='custom-button'>Export JSON</button>
				<button onClick={() => convertToXML()} className='custom-button'>Export XML</button>
			</div>
			<div className='list-container'>
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
			</div>
			
		</div>
	);
};

export default AdminPage;
