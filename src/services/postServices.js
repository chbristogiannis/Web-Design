import axiosInstance from '../utils/axiosInstance';

const getPosts = async () => {
    try {
        const response = await axiosInstance.get('post/suggestedPosts');

        return response.data;
    } catch (error) {
        throw error;
    }
};

const createPost = async (content) => {
    try {
        const formDataObj = new FormData();

        formDataObj.append('text', content.text);

        if (content.file) {
            formDataObj.append('file', content.file);
        }

        const response = await axiosInstance.post('post/createPost', formDataObj, {
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        });

        return response.data; // Return the response data
    } catch (error) {
        return null;
    }
};

const likePost = async (postId) => {
    try {
        if (!postId) {
            throw new Error('Invalid postId');
        }

        const response = await axiosInstance.post(`post/${postId}/likePost` );

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

const commentPost = async (postId, commentText) => {
    try {
        if (!postId || !commentText) {
            throw new Error('Invalid postId or commentText');
        }

        const response = await axiosInstance.post(`post/${postId}/comment`, {
            text: commentText,
        });

        return response.data;
    } catch (error) {
        console.error('Error:', error.message);

        return null;
    }
}

const getPostComments = async (postId) => {
    try {
        if (!postId) {
            throw new Error('Invalid postId');
        }

        const response = await axiosInstance.get(`post/${postId}/getPostsComments`);

        return response.data;
    } catch (error) {
        console.error('Error:', error.message);

        return null;
    }
};

export { getPosts, createPost, likePost, commentPost, getPostComments };