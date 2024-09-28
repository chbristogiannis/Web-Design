import React, { useState, useEffect, useRef } from 'react';
import { commentPost } from '../../services/postServices';

const Comments = ({user, postId, comments, setComments}) => {
	const [commentText, setCommentText] = useState('');
	const commentsContainerRef = useRef(null);


	useEffect(() => {
        if (commentsContainerRef.current) {
            commentsContainerRef.current.scrollTop = commentsContainerRef.current.scrollHeight;
        }
    }, [comments]);

	const handleCommentChange = (event) => {
		setCommentText(event.target.value); // Update the value state
	};

	const handleCommentSubmit = (postId) => {
		const submit = async (postId) => {
			if (commentText === '') {
				return;
			}
			const response = await commentPost(postId, commentText);
			if (!response) {
				console.error('Failed to create comment');
				alert('Something went wrong while creating the comment.');
				return;
			}

			setComments(prevComments => [
                ...prevComments,
                {
                    id: response.id,
                    postId: postId,
                    text: commentText,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    photo: user.photo ? user.photo : 'https://via.placeholder.com/100'
                }
            ]);

			setCommentText('');
		}

		submit(postId);
	};

    return (
    <div className='comments-container'>
        <div className='old-comments-container' ref={commentsContainerRef}>
            {comments
            .filter(comment => comment.postId === postId)
            .map((comment, index) => (
                <div key={index} className='comment'>
                    
                    <div className="comment-user-container">
                        <img src={comment.photo} alt="Profile" className="micro-profile-picture" />
                        {comment.firstName + ' ' + comment.lastName}
                    </div>
                    <span>{comment.text}</span>
                </div>
            ))}
        </div>
        <div className='new-comment-container'>
            <textarea value={commentText} placeholder='Γράψτε ένα νέο σχόλιο ...' onChange={handleCommentChange}/>
            <button onClick={() => handleCommentSubmit(postId)}>Ανάρτηση</button>
        </div>
    </div>
    );
};

export default Comments;