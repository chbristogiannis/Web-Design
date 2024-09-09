import axiosInstance from '../utils/axiosInstance';

const search = async (searchTerm) => {
    try {
        const response = await axiosInstance.post('/users/search', {
            input: searchTerm
        });

        return response.data;
    } catch (error) {
        if (error.response) {
            console.error(error.response.data);
        }
        return null;
    }
};

const fetchConnectedProfessionals = async () => {
    try {
        const response = await axiosInstance.get('/friends/');

        return response.data;
    } catch (error) {
        if (error.response) {
            console.error(error.response.data);
        }
        return null;
    }
};

export {search, fetchConnectedProfessionals};