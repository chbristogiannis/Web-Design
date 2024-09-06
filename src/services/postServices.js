import axiosInstance from '../utils/axiosInstance';

const getPosts = async () => {
    try {
        const response = await axiosInstance.get('post/getSuggestedPosts');

        return response.data;
    } catch (error) {
        throw error;
    }
};

const createPost = async (content) => {
    try {
        const response = await axiosInstance.post('post/createPost', {
            creatorUserId: localStorage.getItem('userId'),
            text: content.text,
            file: content.file,
        });

        return response.data;
    } catch (error) {
        throw error;
    }
};

const likePost = async (postId) => {
    try {
        const response = await axiosInstance.post('post/like', {
            postId: postId,
        });

        return response.data;
    } catch (error) {
        throw error;
    }
};

export { getPosts, createPost, likePost };