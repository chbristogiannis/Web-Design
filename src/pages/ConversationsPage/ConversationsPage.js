import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import { useAuth } from '../../context/AuthContext';

import AutoResizingTextArea from '../../components/AutoResizingTextArea/AutoResizingTextArea';  // Adjust the import path

import { fetchChats, fetchChatMessages, createMessage } from '../../services/chatServices';

import './ConversationsPage.css';

import Navbar from '../../components/NavBar/NavBar';

function ConversationsPage() {
	const [conversations, setConversations] = useState([]);

	const {user} = useAuth();

	const [friendUser, setFriendUser] = useState('');
	
	const [messages, setMessages] = useState([]);
	const [newMessage, setNewMessage] = useState('');
	const { conversationId } = useParams(); // Get conversationId from URL
	const navigate = useNavigate(); // Use for navigation
	
	const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit', hour12: false };
	useEffect(() => {
		const fetchConversations = async () => {
			try {
				const chats = await fetchChats();
				if (!chats) {
					return;
				}

				// Process and keep only relevant friend information
				const enhancedConversations = chats.map((chat) => {
					// Determine who the "friend" is by checking who is NOT the current user
					chat.updatedAt = new Date(chat.updatedAt).toLocaleString('el-GR', options);

					const isUser1 = chat.user1Id === user.id;

					const friend = !isUser1
					? { 
						id: chat.user1Id,
						userFirstName: chat.user1FirstName,
						userLastName: chat.user1LastName,
						userPhoto: chat.user1Photo 
						}
					: { 
						id: chat.user2Id,
						userFirstName: chat.user2FirstName,
						userLastName: chat.user2LastName,
						userPhoto: chat.user2Photo 
						};

					// Return conversation with only relevant data
					return {
						id: chat.id, // Keep the chat id
						friend, // Store the friend object
						lastMessage: chat.lastMessage, // Keep last message or relevant data
						updatedAt: chat.updatedAt // Keep updated timestamp
					};
				});

				// Set the enhanced conversations without redundant user info
				setConversations(enhancedConversations);
			} catch (error) {
				console.error(error);
			}
		};

		fetchConversations();
		
	}, []);


	const handleSelectConversation = async (conversationId) => {
		// Navigate to the selected conversation's page

		const tempname = async () => { 
			setMessages([]);
			navigate(`/ConversationsPage/${conversationId}`);

			try {
				if (conversations.length === 0) {
					navigate(`/ConversationsPage`);
					return;
				}
				const friend = conversations.find((conversation) => conversation.id === conversationId).friend;
				setFriendUser(friend);

				const messages = await fetchChatMessages(conversationId);
				const mappedMessages = messages.map((message) => {
					return {
						id: message.id,
						userId: message.userId,
						content: message.content,
						updatedAt: new Date(message.updatedAt).toLocaleString('el-GR', options)
					};
				});

				if (!mappedMessages) {
					return;
				}
				setMessages(mappedMessages);
			} catch (error) {
				console.error(error);
			}
		};

		await tempname();
	};

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
		<div className="conversations-page">
			<Navbar />
			<div className="conversation-section">
				<div className="conversations-list">
					<h3>Οι συζητήσεις σας:</h3>
					<ul>
						{conversations.map((conversation) => (
							<li
								key={conversation.id}
								onClick={() => handleSelectConversation(conversation.id)}
								className={conversation.id === parseInt(conversationId, 10) ? 'active' : ''}
							>
								{ conversation.friend.userPhoto 
								? <img src={conversation.friend.userPhoto} alt="profile" className='micro-profile-picture'/>
								: <img src='https://via.placeholder.com/100' alt="profile" className='micro-profile-picture'/> 
								}
								<div className='list-item'>
									<p>{conversation.friend.userFirstName} {conversation.friend.userLastName}</p>
									<span>{conversation.updatedAt}</span>
								</div>
							</li>
						))}
					</ul>
					{conversations.length === 0 && (<span>Δεν υπάρχουν συνομιλίες</span>)}
				</div>

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
			</div>
		</div>
	);
}

export default ConversationsPage;
