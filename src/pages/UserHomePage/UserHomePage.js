// src/UserHomePage.js
import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

import AutoResizingTextArea from '../../components/AutoResizingTextArea/AutoResizingTextArea';  // Adjust the import path
import Navbar from '../../components/NavBar/NavBar';  // Adjust the import path
import DeleteButton from '../../components/Delete-Button';
import Spinner from '../../components/Spinner/Spinner'; // Import the Spinner component

import { createPost , getPosts, likePost, commentPost, getPostComments, removeLike as removeLikeService } from '../../services/postServices';

import './UserHomePage.css';

import blankPage from '../../assets/blank-page.png';

function HomePage() {
	const {user, isAuthenticated, loading: authLoading} = useAuth();
	const navigate = useNavigate();

	const fileInputRef = useRef(null);
	const commentsContainerRef = useRef(null);

	const [text, setText] = useState('');
	const [fileName, setFileName] = useState('');
	const [commentText, setCommentText] = useState('');
	const [commentFocus, setCommentFocus] = useState(-1);
	
	const [posts, setPosts] = useState([]);  // State for storing posts
	const [comments, setComments] = useState([]);  // State for storing comments
	const [loading, setLoading] = useState(true);  // New loading state for fetching posts


	// Fetch posts from API on component mount
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

	useEffect(() => {
        if (commentsContainerRef.current) {
            commentsContainerRef.current.scrollTop = commentsContainerRef.current.scrollHeight;
        }
    }, [comments]);

	const handleChange = (event) => {
    	setText(event.target.value); // Update the value state
	};

	const handleDeleteFile = () => {
		setFileName(''); // Clear the fileName state

		// Reset the file input so the same file can be selected again
		if (fileInputRef.current) {
			fileInputRef.current.value = ''; // Reset the file input value
		}
	};

	const mediaButtonClicked = () => {
		fileInputRef.current.click();
	};

	const handleFileChange = (event) => {
		if ( event.target.files[0]) {
			const file = event.target.files[0]; // Access the selected file
			setFileName(file.name); // Update the file name state
		}
	}

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

	const onSumitButtonClicked = () => {
		const submit = async () => {
			if (!(text === '') || !(fileName === '')) {
				const response = await createPost({text: text, file: fileInputRef.current.files[0]});
				
				if (!response) {
					console.error('Failed to create post');
					alert('Something went wrong while creating the post.');
					return;
				}

				console.log(response);

				setPosts(prevPosts => [
					{
						id: response.id,
						text: text,
						file: response.file,
						fileType: response.fileType,
						firstName: user.firstName,
						lastName: user.lastName,
						photo: user.photo ? user.photo : 'https://via.placeholder.com/100'
					},
					...prevPosts
				]);

				if (fileInputRef.current) {
					fileInputRef.current.value = ''; // Reset the file input value
				}
				setText('');
				setFileName('');
				// refreshPosts();
			}
		}

		submit();
	};

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

	if (authLoading) {
		return <Spinner />;  // Show spinner while loading
	}

	return (
		<div className="homepage-container">
			<Navbar />
			<div className="content-container">
				<aside className="box-container left-sidebar">
					<div className="user-info">
						<div className="user-profile">
							<img
								src={user.photo}
								alt="Profile"
								className="profile-picture"
							/>
							<h3>{user.firstName + ' ' +user.lastName}</h3>
						</div>
						<h3>Προσωπικά Στοιχεία</h3>
						<div className="redirect-button-container">
							<button onClick={() => navigate('/PersonalDetailsPage')}>
								Δείτε το προφίλ σας
							</button>
						</div>
					</div>
					<div className="user-network">
						<h3>Το Δίκτυό σας</h3> 
						<div className="redirect-button-container">
							<button onClick={() => navigate('/NetworkPage')}>
								Δείτε το δίκτυό σας
							</button>
						</div>
					</div>
				</aside>

				<main className="main-content">
					<h2>Το Χρονολόγιο σας</h2>
					<div className="box-container post-container">
						<AutoResizingTextArea
							value={text}
							onChange={handleChange}
							placeholder="Δημιουργήστε ένα νέο άρθρο ..."
							onFocus={(event) => event.target.placeholder = ''}
							onBlur={(event) => event.target.placeholder = 'Δημιουργήστε ένα νέο άρθρο ...'}
						/>
						{fileName ? <div className="filename-container"> 
							<img src={blankPage} alt= ''/> 
							<p> {fileName} </p> 
							<DeleteButton
								label="X"
								onClick={handleDeleteFile}
							/> 
						</div> : null}
						<div className="media-upload">
							<button className="custom-button" onClick={mediaButtonClicked}>
								Πολυμέσα 
							</button>
							<input 
								type="file" 
								name="file" 
								ref={fileInputRef} 
								style={{ display:'none' }} 
								onChange={handleFileChange}
							/>
							<button className="custom-button" onClick={onSumitButtonClicked} > Δημιοσίευση </button>
						</div>
					</div>
					{loading ? <Spinner/> : posts.map((post, index) => (
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
								<div className='comments-container'>
									
									<div className='old-comments-container' ref={commentsContainerRef}>
										{comments
										.filter(comment => comment.postId === post.id)
										.map((comment, index) => (
											<div key={index} className='comment'>
												
												<div className="comment-user-container">
													<img src={comment.photo} alt="Profile" className="micro-profile-picture" />
													{comment.firstName + ' ' + comment.lastName}
												</div>
												{comment.text}
											</div>
										))}
									</div>
									<div className='new-comment-container'>
										<textarea value={commentText} placeholder='Γράψτε ένα νέο σχόλιο ...' onChange={handleCommentChange}/>
										<button onClick={() => handleCommentSubmit(post.id)}>Ανάρτηση</button>
									</div>
								</div> 
								: null
							}
						</div>
					))}
				</main>
			</div>
		</div>
	);
}

export default HomePage;

