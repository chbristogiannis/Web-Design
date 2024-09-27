import axiosInstance from '../utils/axiosInstance';

const getAllUsers = async () => {
    try {
        const response = await axiosInstance.get('/users');
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.message);
    }
};

const getUserById = async (id) => {
    try {
        const response = await axiosInstance.get(`/users/${id}`);
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.message);
    }
};

const getUsersDataXML = async (selectedUsers) => {
    try {
        const response = await axiosInstance.post('/users/xml', { 
            usersId: selectedUsers 
        }, {
            headers: {
                'Accept': 'application/xml'  // Ensure the backend knows you're expecting XML
            },
            responseType: 'text'  // Force axios to return the response as plain text (XML)
        });

        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(response.data, 'application/xml');

        return xmlDoc;
    } catch (error) {
        throw new Error(error.response.data.message);
    }
};

const getUsersDataJSON = async (selectedUsers) => {
    try {
        const response = await axiosInstance.post('/users/json', { 
            usersId: selectedUsers 
        });
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.message);
    }
};

const createDummyData = async () => {
    try {
        const response = await axiosInstance.post('/post/dummy');
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.message);
    }
}

export { getAllUsers, getUserById, getUsersDataXML, getUsersDataJSON, createDummyData };