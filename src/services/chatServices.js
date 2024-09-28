import axiosInstance from '../utils/axiosInstance';

const fetchChats = async () => {
    try {
        const response = await axiosInstance.get('/chats/');

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
        const response = await axiosInstance.get(`/chats/${chatId}/messages`);

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
        const response = await axiosInstance.post('/chats/', {
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
        const response = await axiosInstance.post(`/chats/${chatId}/messages`, {
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