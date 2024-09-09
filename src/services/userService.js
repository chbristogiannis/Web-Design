import axiosInstance from '../utils/axiosInstance';

const fetchFriendCheck = async (id) => {
    try {
        const response = await axiosInstance.get(`/friends/${id}/friend-check`);
        return response.data;
    } catch (error) {
        console.error(error);
        return null;
    }
};

const fetchUserProfile = async (id) => {
    try {
        const response = await axiosInstance.get(`users/${id}`);
        return response.data;
    } catch (error) {
        console.error(error);
        return null;
    }
};

const sendFriendRequest = async (id) => {
    try {
        const response = await axiosInstance.post('/friends/request', {
            friendId: id
        });
        return response.data;
    } catch (error) {
        console.error(error);
        return null;
    }
};

const fetchSentFriendRequest = async () => {
    try {
        const response = await axiosInstance.get('/friends/request/send');
        return response.data;
    } catch (error) {
        console.error(error);
        return null;
    }
};

const fetchFriendRequests = async () => {
    try {
        const response = await axiosInstance.get('/friends/request');
        return response.data;
    } catch (error) {
        console.error(error);
        return null;
    }
};

const respondToFriendRequest = async (friendId, action) => {
    try {
        const response = await axiosInstance.post('/friends/request/response', {
            friendId: friendId,
            action: action
        });
        return response.data;
    } catch (error) {
        console.error(error);
        return null;
    }
};

const removeFriend = async (friendId) => {
    try {
        const response = await axiosInstance.delete('/friends/', {data: {
            friendId: friendId}
        });

        return response.data;
    } catch (error) {
        console.error(error);
        return null;
    }
};

export { fetchFriendCheck, fetchUserProfile, fetchFriendRequests, fetchSentFriendRequest, sendFriendRequest, respondToFriendRequest, removeFriend };