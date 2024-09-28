
import React from 'react';

const ConversationsList = ({conversations, conversationId, handleSelectConversation}) => {
    return (
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
    );
};

export default ConversationsList;