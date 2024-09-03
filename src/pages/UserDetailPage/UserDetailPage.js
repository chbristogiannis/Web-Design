// UserDetailPage.js
import React from 'react';
import { useParams } from 'react-router-dom';
import '../SettingsPage/SettingsPage.css';

const UserDetailPage = () => {
  const { id } = useParams();
  const user = {
    id,
    name: id === '1' ? 'John Doe' : id === '2' ? 'Jane Smith' : 'George Johnson',
    bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    posts: ['Article 1', 'Article 2'],
    experience: ['Job 1', 'Job 2'],
    comments: ['Comment on Article 1', 'Comment on Article 2'],
    network: ['Connected Professional 1', 'Connected Professional 2']
  };

  return (
    <div className="user-detail-page">
      <h2>User Details</h2>
      <p><strong>Name:</strong> {user.name}</p>
      <p><strong>Bio:</strong> {user.bio}</p>
      <h3>Posts</h3>
      <ul>
        {user.posts.map((post, index) => (
          <li key={index}>{post}</li>
        ))}
      </ul>
      <h3>Professional Experience</h3>
      <ul>
        {user.experience.map((job, index) => (
          <li key={index}>{job}</li>
        ))}
      </ul>
      <h3>Comments</h3>
      <ul>
        {user.comments.map((comment, index) => (
          <li key={index}>{comment}</li>
        ))}
      </ul>
      <h3>Network</h3>
      <ul>
        {user.network.map((connection, index) => (
          <li key={index}>{connection}</li>
        ))}
      </ul>
    </div>
  );
};

export default UserDetailPage;
