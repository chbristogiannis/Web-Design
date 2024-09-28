import React, { useEffect, useState } from 'react';
import AutoResizingTextArea from "../../components/AutoResizingTextArea/AutoResizingTextArea";
import { createMessage } from "../../services/chatServices";

import { useNavigate } from 'react-router-dom';

const Conversation = ({messages, setMessages, conversations, conversationId, friendUser, setFriendUser, user, handleSelectConversation }) => {
	const [newMessage, setNewMessage] = useState('');

    const navigate = useNavigate();

	const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit', hour12: false };

	useEffect(() => {
		if (conversations) {
			if (!conversationId) {
				setFriendUser('');
				return;
			}
			handleSelectConversation(parseInt(conversationId, 10));
		} else {
			setFriendUser('');
		}
	}, [conversationId]); // Depend on conversationId to load messages when URL changes

    const handleSendMessage = async () => {
		if (newMessage.trim()) {
			try {
				const newMessageObject = await createMessage(conversationId, newMessage);
				if (!newMessageObject) {
					return;
				}

				const mappedMessageObject = {
					id: newMessageObject.id,
					userId: newMessageObject.userId,
					content: newMessageObject.content,
					updatedAt: new Date(newMessageObject.updatedAt).toLocaleString('el-GR', options)
				};

				setMessages([...messages, mappedMessageObject]);

			} catch (error) {
				console.error(error);
			}

			setNewMessage('');
		}
	};

    return (
        <div className="messages-section">
            <h3>{friendUser && (friendUser.userFirstName + ' ' + friendUser.userLastName)}</h3>

            {conversationId ? (
                <div className="messages-list">
                {messages.map((message) => (
                    <div
                        key={message.id}
                        className={`message-item ${message.userId === user.id ? 'self' : 'other'} box-container`}
                        >
                        {(message.userId === user.id && user.photo) && (<img src={user.photo} alt="profPicture" className='micro-profile-picture'/>)}
                        {(message.userId === user.id && !user.photo) && (<img src={'https://via.placeholder.com/100'} alt="profPicture" className='micro-profile-picture'/>)}
                        {(message.userId !== user.id && friendUser.userPhoto) && (<img src={friendUser.userPhoto} alt="profPicture" className='micro-profile-picture'/>)}
                        {(message.userId !== user.id && !friendUser.userPhoto) && (<img src={'https://via.placeholder.com/100'} alt="profPicture" className='micro-profile-picture'/>)}
                        <div className='message'> 
                            <p>{message.content}</p>
                            <span>{message.updatedAt}</span>
                        </div>
                    </div>
                ))}
                </div>
            ) : (
                <p style= {{
                    fontSize: '1.5rem',
                    color: 'var(--secondary-text-color)',
                    height: '100%',
                    textAlign: 'center',
                }}>Διαλέξτε συζήτηση</p> // Shown when no conversation is selected
            )}

            {conversationId && ( 
                <div className="message-input">
                    <AutoResizingTextArea
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        placeholder="Aa"
                        onFocus={(event) => event.target.placeholder = ''}
                        onBlur={(event) => event.target.placeholder = 'Aa'}
                        style={{
                            padding: '0.5rem',
                            height: 'auto',
                            maxHeight: '7rem',
                        }}
                    />
                    <button onClick={handleSendMessage} className='custom-button' style= {{
                        maxHeight: '3rem',
                    }}>Αποστολή</button>
                </div>
            )}
        </div>
    );
};

export default Conversation;