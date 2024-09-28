import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import { useAuth } from '../../context/AuthContext';

import Navbar from '../../components/NavBar/NavBar';
import ConversationsList from './ConversationsList';
import Conversation from './Conversation';

import { fetchChats, fetchChatMessages } from '../../services/chatServices';

import './ConversationsPage.css';


function ConversationsPage() {
	const [conversations, setConversations] = useState([]);

	const {user} = useAuth();

	const [friendUser, setFriendUser] = useState('');
	
	const [messages, setMessages] = useState([]);
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
		const navigateToSelectedConversation = async () => { 
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

		await navigateToSelectedConversation();
	};

	return (
		<div className="conversations-page">
			<Navbar />
			<div className="conversation-section">
				<ConversationsList
					conversations={conversations}
					conversationId={conversationId}
					handleSelectConversation={handleSelectConversation}
				/>
				<Conversation
					messages={messages}
					setMessages={setMessages}
					conversations={conversations}
					conversationId={conversationId}
					friendUser={friendUser}
					setFriendUser={setFriendUser}
					user={user}
					handleSelectConversation={handleSelectConversation}
				/>
			</div>
		</div>
	);
}

export default ConversationsPage;
