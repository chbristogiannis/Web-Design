import axiosInstance from '../utils/axiosInstance';

const changePassword = async (data) => {
    try {
        const response = await axiosInstance.put('/users/change-password', data);
        return response.data;
    } catch (error) {
        return Promise.reject(error);
    }
};

const changeEmail = async (data) => {
    try {
        const response = await axiosInstance.put('/users/change-email', data);
        return response.data;
    } catch (error) {
        return Promise.reject(error);
    }
};

export { changePassword, changeEmail };