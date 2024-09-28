// src/TimelinePage.js
import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

import Navbar from '../../components/NavBar/NavBar';  // Adjust the import path
import Spinner from '../../components/Spinner/Spinner'; // Import the Spinner component

import {  getPosts, likePost, commentPost, getPostComments, removeLike as removeLikeService } from '../../services/postServices';

import SideProfile from './SideProfile';
import PostCreation from './PostCreation';
import PostList from './PostsList';

import './TimelinePage.css';


function TimelinePage() {
	const {user, isAuthenticated, loading: authLoading} = useAuth();
	
	const [posts, setPosts] = useState([]);  // State for storing posts

	if (authLoading) {
		return <Spinner />;  // Show spinner while loading
	}

	return (
		<div className="homepage-container">
			<Navbar />
			<div className="content-container">
				<SideProfile user={user} />
				<main className="main-content">
					<h2>Το Χρονολόγιο σας</h2>
					<PostCreation user={user} setPosts={setPosts} />
					<PostList user={user} posts={posts} setPosts={setPosts}/>
				</main>
			</div>
		</div>
	);
}

export default TimelinePage;

