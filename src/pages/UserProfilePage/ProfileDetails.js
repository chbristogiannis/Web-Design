import React from 'react';
import { sendFriendRequest, respondToFriendRequest, removeFriend } from '../../services/userService';
import { createChat, fetchChats } from '../../services/chatServices';
import { useNavigate } from 'react-router-dom';


const ProfileDetails = ({
    id,
    user,
    isFriend,
    setIsFriend,
    friendRequestSent,
    setFriendRequestSent,
    friendRequestReceived,
    setFriendRequestReceived,
    loggedInUser,
    }) => {

    const navigate = useNavigate();

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

	const handleRemoveFriend = () => {
		try {
			removeFriend(id);
			setIsFriend(false);
		} catch (error) {
			console.error(error);
		}
	};

	const handleCreateChat = async () => {
		try {
			const chats = await fetchChats();
			if (!chats) {
				return;
			}

			const chat = chats.find(chat => chat.userId1 == id) || chats.find(chat => chat.userId2 == id);
			if (chat) {
				navigate(`/ConversationsPage/${chat.id}`);
				return;
			}
			const newChat = await createChat(id);
			navigate(`/ConversationsPage/${newChat.id}`);
		} catch (error) {
			console.error(error);
		}
	}
    
    return (    
        <div className="profile">
            <div className="box-container">
                <img src={user.photo} alt="profile" className="profile-image" />
                <div className="profile-name">
                    {user.firstName} {user.lastName}
                </div>
            </div>
            {parseInt(loggedInUser.id) !== parseInt(user.id) && !isFriend && !friendRequestSent && !friendRequestReceived && (
                <button onClick={handleFriendRequest} className="custom-button">
                    Αίτημα σύνδεσης
                </button>
            )}
            {friendRequestReceived && (
                <div>
                    Έχετε λάβει αίτημα σύνδεσης
                    <div style={{ display: 'flex', gap: '.5rem' }}>
                    <button onClick={() => handleFriendRequestResponse('accept')} className="green-button">
                        Αποδοχή
                    </button>
                    <button onClick={() => handleFriendRequestResponse('reject')} className="delete-button">
                        Απόρρυψη
                    </button>
                    </div>
                </div>
            )}
            {friendRequestSent && <button disabled className="custom-button"> Έχει γίνει αίτημα </button>}
            {isFriend && (
                <>
                    <button onClick={handleRemoveFriend} className="delete-button"> Διαγραφή Επαγγελματία</button>
                    <button onClick={handleCreateChat} className="custom-button"> Δημιουργία συζήτησης</button>
                </>
            )}
        </div>
    );
};

export default ProfileDetails;
