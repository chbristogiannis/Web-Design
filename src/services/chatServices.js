import axiosInstance from '../utils/axiosInstance';

const fetchChats = async () => {
    try {
        const response = await axiosInstance.get('/chat/');

        return response.data;
    } catch (error) {
        if (error.response) {
            console.error(error.response.data);
        }
        return null;
    }
};

const fetchChatMessages = async (chatId) => {
    try {
        const response = await axiosInstance.get(`/chat/${chatId}/messages`);

        return response.data;
    } catch (error) {
        if (error.response) {
            console.error(error.response.data);
        }
        return null;
    }
}

const createChat = async (friendId) => {
    try {
        const response = await axiosInstance.post('/chat/', {
            friendId
        });

        return response.data;
    } catch (error) {
        if (error.response) {
            console.error(error.response.data);
        }
        return null;
    }
}

const createMessage = async (chatId, content) => {
    try {
        const response = await axiosInstance.post(`/chat/${chatId}/messages`, {
            content
        });

        return response.data;
    } catch (error) {
        if (error.response) {
            console.error(error.response.data);
        }
        return null;
    }
}

export { fetchChats, fetchChatMessages, createMessage, createChat };