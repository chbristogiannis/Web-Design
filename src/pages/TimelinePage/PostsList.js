import React, { useState, useEffect, useRef } from 'react';

import Spinner from '../../components/Spinner/Spinner'; // Import the Spinner component

import {  getPosts, likePost, getPostComments, removeLike as removeLikeService } from '../../services/postServices';

import Comments from './Comments';

const PostList = ({user, posts, setPosts}) => {

	// const [commentText, setCommentText] = useState('');
	const [commentFocus, setCommentFocus] = useState(-1);
	const [comments, setComments] = useState([]);  // State for storing comments
    const [loading, setLoading] = useState(true);  // New loading state for fetching posts


    useEffect(() => {
		const fetchPosts = async () => {
				setLoading(true);  // Start loading
				const response = await getPosts();
				const mappedResponse = response.map(post => {
					let { id, text, file, fileType, firstName, lastName, photo, likedByUser } = post;
					if (photo === null) {
						photo = 'https://via.placeholder.com/100';
					}
					return { id, text, file, fileType, firstName, lastName, photo, likedByUser };
				});
				await setPosts(mappedResponse);  // Update state with posts
				setLoading(false);  // Stop loading
			};

		fetchPosts();
	}, []);

    const handleCommentClick = (postId) => {
		// Close the comments if they are already open
		if (commentFocus === postId) {
			setCommentFocus(-1);
			return;
		}

		//Ensure that the comments are fetched only once
		if (comments.length > 0 && comments[0].postId === postId) {
			setCommentFocus(postId);
			return;
		}

		// Fetch comments for the post
		const fetchComments = async (postId) => {
			const response = await getPostComments(postId);
			if (!response) {
				console.error('Failed to fetch comments');
				alert('Something went wrong while fetching the comments.');
				return;
			}

			const formattedComments = response.map(comment => {
				const { id, text, postId, User } = comment;

				let { firstName, lastName, photo } = User || {};
				if (photo === null) {
					photo = 'https://via.placeholder.com/100';
				}

				return {
					id,
					text,
					postId,
					firstName,
					lastName,
					photo: photo
				};
			});
		
			setComments(formattedComments);
		}

		fetchComments(postId);

		setCommentFocus(postId);
	}

	const handleLike = (postId) => {
		const addLike = async (postId) => {
			try {
				if (!postId) {
					throw new Error('Invalid postId');
				}

				const response = await likePost(postId);
				if (!response) {
					console.error('Failed to like post');
					alert('Something went wrong while liking the post.');
				}

				// Add like from the post on the front end
				setPosts(prevPosts => prevPosts.map(post => {
					if (post.id === postId) {
						return {
							...post,
							likedByUser: true
						};
					}
					return post;
				}));

				return response.data;
			} catch (error) {
				if (error.response) {
					console.error('Error:', error.response);
				} else {
					console.error('Error:', error.message);
				}

				return null;  // Return null to prevent the app from crashing
			}
		}

		addLike(postId);
	};

	const handleRemoveLike = (postId) => {
		const removeLike = async (postId) => {
			try {
				if (!postId) {
					throw new Error('Invalid postId');
				}

				const response = await removeLikeService(postId);
				if (!response) {
					console.error('Failed to remove like from post');
					alert('Something went wrong while removing the like from the post.');
				}

				// Remove like from the post on the front end
				setPosts(prevPosts => prevPosts.map(post => {
					if (post.id === postId) {
						return {
							...post,
							likedByUser: false
						};
					}
					return post;
				}));

				return response.data;
			} catch (error) {
				if (error.response) {
					console.error('Error:', error.response);
				} else {
					console.error('Error:', error.message);
				}

				return null;  // Return null to prevent the app from crashing
			}
		};

		removeLike(postId);
	};

    return (
        <>
        { loading 
            ? <Spinner/> 
            : posts.map((post, index) => (
                <div key={index} className="box-container post-container">
                    <div className="post-user-container">
                        <img src={post.photo} alt="Profile" className="mini-profile-picture" />
                        <h3>{post.firstName + ' ' + post.lastName}</h3>
                    </div>
                    <div className="post-body">
                        <p>{post.text}</p>
                        {post.fileType === 'image' && <img src={post.file} alt="Post media" style={{
                            maxWidth: '100%',
                            height: 'auto',
                            marginTop: '10px'
                        }}/>}
                        {post.fileType === 'video' && (
                            <video controls style={{
                                    maxWidth: '100%',
                                    height: 'auto',
                                    marginTop: '10px'
                                }}>
                                <source src={post.file} type={post.file.type}/>
                                Your browser does not support the video tag.
                            </video>
                        )}
                        {post.fileType === 'audio' && (
                        <audio controls style={{
                                width: '100%',
                                maxWidth: '100%',
                                marginTop: '10px'
                            }}>
                            <source src={post.file} type={post.file.type} />
                            Your browser does not support the audio element.
                        </audio>
                        )}
                    </div>
                    <div className="post-actions">
                        { post.likedByUser ? <button className="custom-button" onClick={() => handleRemoveLike(post.id)}>Αφαίρεση Ενδιαφέροντος</button> :
                        <button className="like-button" onClick={() => handleLike(post.id)}>Ενδιαφέρον</button>}
                        <button className="like-button" 
                            onClick={() => handleCommentClick(post.id)}>Σχόλια</button>
                    </div>
                    { commentFocus === post.id ? 
                        <Comments comments={comments} postId={post.id} user={user} setComments={setComments}/>
                        : null
                    }
                </div>
            )
        )} 
        </>
    );
};

export default PostList;