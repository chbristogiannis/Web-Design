// ManagerPage.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ManagerPage.css'

const UserListPage = () => {
  const [users, setUsers] = useState([
    { id: 1, name: 'John Doe' },
    { id: 2, name: 'Jane Smith' },
    { id: 3, name: 'George Johnson' }
  ]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const navigate = useNavigate();

  const handleUserClick = (id) => {
    navigate(`/user/${id}`);
  };

  const handleExport = (format) => {
    const selectedData = users.filter(user => selectedUsers.includes(user.id));
    
    if (format === 'json') {
      const jsonData = JSON.stringify(selectedData);
      console.log(jsonData); // Replace with your download logic
    } else if (format === 'xml') {
      const xmlData = convertToXML(selectedData);
      console.log(xmlData); // Replace with your download logic
    }
  };

  const handleSelectUser = (id) => {
    setSelectedUsers(prevState =>
      prevState.includes(id)
        ? prevState.filter(userId => userId !== id)
        : [...prevState, id]
    );
  };

  const convertToXML = (data) => {
    let xml = '<users>';
    data.forEach(user => {
      xml += `<user><id>${user.id}</id><name>${user.name}</name></user>`;
    });
    xml += '</users>';
    return xml;
  };

  return (
    <div className="user-list-page">
      <h2>User Management</h2>
      <ul className="user-list">
        {users.map(user => (
          <li key={user.id} className="user-item">
            <input
              type="checkbox"
              checked={selectedUsers.includes(user.id)}
              onChange={() => handleSelectUser(user.id)}
            />
            <span onClick={() => handleUserClick(user.id)}>{user.name}</span>
          </li>
        ))}
      </ul>
      <div className="export-buttons">
        <button onClick={() => handleExport('json')}>Export JSON</button>
        <button onClick={() => handleExport('xml')}>Export XML</button>
      </div>
    </div>
  );
};

export default UserListPage;
