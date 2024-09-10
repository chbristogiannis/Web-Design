import axiosInstance from '../utils/axiosInstance';

const fetchNotifications = async () => {
    try {
        const response = await axiosInstance.get('/notifications');
        return response.data;
    } catch (error) {
        throw error;
    }
};

const deleteNotification = async (id) => {
    try {
        const response = await axiosInstance.delete(`/notifications/${id}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export { fetchNotifications, deleteNotification };