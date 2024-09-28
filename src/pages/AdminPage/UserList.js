import React from 'react';
import { useNavigate } from 'react-router-dom';


const UserList = ({users, selectedUsers, setSelectedUsers}) => {
    const navigate = useNavigate();

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


    return (
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
    );
};

export default UserList;