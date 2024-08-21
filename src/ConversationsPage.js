// src/ConversationsPage.js
import React, { useState, useEffect } from 'react';
import './ConversationsPage.css';

function ConversationsPage() {
  const [conversations, setConversations] = useState([]);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    // Simulate fetching the list of conversations
    const fetchConversations = async () => {
      const mockConversations = [
        { id: 1, professionalName: 'Dr. Smith' },
        { id: 2, professionalName: 'Dr. Johnson' },
        { id: 3, professionalName: 'Dr. Williams' },
      ];
      setConversations(mockConversations);
    };

    fetchConversations();
  }, []);

  const handleSelectConversation = async (conversationId) => {
    setSelectedConversation(conversationId);

    // Simulate fetching messages for the selected conversation
    const mockMessages = {
      1: [
        { id: 1, sender: 'self', text: 'Hello Dr. Smith!', timestamp: '2023-08-20 10:15 AM' },
        { id: 2, sender: 'other', text: 'Hi! How can I assist you today?', timestamp: '2023-08-20 10:17 AM' },
      ],
      2: [
        { id: 3, sender: 'self', text: 'Good morning, Dr. Johnson!', timestamp: '2023-08-19 9:30 AM' },
        { id: 4, sender: 'other', text: 'Good morning! Hope you are doing well.', timestamp: '2023-08-19 9:35 AM' },
      ],
      3: [
        { id: 5, sender: 'self', text: 'Hi Dr. Williams, I have a question about my prescription.', timestamp: '2023-08-18 3:45 PM' },
        { id: 6, sender: 'other', text: 'Of course, what would you like to know?', timestamp: '2023-08-18 3:50 PM' },
      ],
    };

    setMessages(mockMessages[conversationId] || []);

    // Set the last message as the default value in the textbox
    const lastMessage = mockMessages[conversationId] ? mockMessages[conversationId][mockMessages[conversationId].length - 1].text : '';
    setNewMessage(lastMessage);
  };

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      // Simulate sending a new message
      const newMessageObject = {
        id: messages.length + 1,
        sender: 'self',
        text: newMessage,
        timestamp: new Date().toLocaleString(),
      };

      // Add the new message to the list
      setMessages([...messages, newMessageObject]);
      setNewMessage('');
    }
  };

  return (
    <div className="conversations-page">
      <nav className="top-navbar">
        <ul>
          <li><a href="/UserHomePage">Αρχική Σελίδα</a></li>
          <li><a href="/NetworkPage">Δίκτυο</a></li>
          <li><a href="/JobListingsPage">Αγγελίες</a></li>
          <li><a href="/ConversationsPage">Συζητήσεις</a></li>
          <li><a href="/NotificationsPage">Ειδοποιήσεις</a></li>
          <li><a href="/PersonalDetailsPage">Προσωπικά Στοιχεία</a></li>
          <li><a href="/SettingsPage">Ρυθμίσεις</a></li>
        </ul>
      </nav>
      <div className="conversation-section">
        <div className="conversations-list">
          <h3>Your Conversations</h3>
          <ul>
            {conversations.map((conversation) => (
              <li
                key={conversation.id}
                onClick={() => handleSelectConversation(conversation.id)}
                className={conversation.id === selectedConversation ? 'active' : ''}
              >
                {conversation.professionalName}
              </li>
            ))}
          </ul>
        </div>

        <div className="messages-section">
          <h3>Messages</h3>
          {selectedConversation ? (
            <div className="messages-list">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`message-item ${message.sender === 'self' ? 'self' : 'other'}`}
                >
                  <p>{message.text}</p>
                  <span>{message.timestamp}</span>
                </div>
              ))}
            </div>
          ) : (
            <p>Select a conversation to view messages</p>
          )}

          {selectedConversation && (
            <div className="message-input">
              <textarea
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type your message..."
              />
              <button onClick={handleSendMessage}>Send</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ConversationsPage;
