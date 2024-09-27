import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getUserById } from '../../services/adminServices';

import './AdminUserPage.css';

import Spinner from '../../components/Spinner/Spinner';

const AdminUserPage = () => {
    const { userId } = useParams(); // Get conversationId from URL
    const navigate = useNavigate(); // Use for navigation


    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);

    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit', hour12: false };
    const [formattedDate, setFormattedDate] = useState('');

    useEffect(() => {
        setLoading(true);
        const fetchUser = async () => {
            try {
                const data = await getUserById(userId);
                setUser(data.user);
                setFormattedDate(new Date(data.user.createdAt).toLocaleString('el-GR', options));

                setLoading(false);
            } catch (error) {
                console.error(error);
            }
        };

        fetchUser();
    }, [userId]);


    if (loading) {
        return <Spinner />;
    }

    if (!user) {
        return <div>User not found</div>;
    }

    return (
        <div className='admin-users-page'>
            <div className='user-detail-box box-container'>
                <div className='profile-name'>
                    { user.phoho ? <img src={user.photo} alt='User avatar' className='profile-picture'/> : <img src="https://via.placeholder.com/100" alt='User avatar' className='profile-picture'/> }
                    <h1>{user.firstName} {user.lastName}</h1>
                </div>
                <div className='user-info'>
                    <label>id:</label><p>{user.id}</p>
                </div>
                <div className='user-info'>
                    <label>firstName:</label><p>{user.firstName}</p>
                </div>
                <div className='user-info'>
                    <label>lastName:</label><p>{user.lastName}</p>
                </div>
                <div className='user-info'>
                    <label>email:</label><p>{user.email}</p>
                </div>
                <div className='user-info'>
                    <label>phoneNumber:</label><p>{user.phoneNumber}</p>
                </div>
                <div className='user-info'>
                    <label>createdAt:</label><p>{formattedDate}</p>
                </div>
            </div>
            <button onClick={() => navigate('/ManagerPage')} className='custom-button'>Back to Users</button>
        </div>
    );
}

export default AdminUserPage;