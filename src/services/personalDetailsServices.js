import axiosInstance from '../utils/axiosInstance';

const addExperienceService = async (experience) => {
    try {
        const response = await axiosInstance.post('/userInfo/experience', experience);
        return response.data;
    } catch (error) {
        console.error(error);
        return null;
    }
}

const getExperienceService = async () => {
    try {
        const response = await axiosInstance.get('/userInfo/experience');
        return response.data;
    } catch (error) {
        console.error(error);
        return null;
    }
}

const updateExperienceService = async (experience) => {
    try {
        const response = await axiosInstance.put('/userInfo/experience', experience);
        return response.data;
    } catch (error) {
        console.error(error);
        return null;
    }
}

const deleteExperienceService = async (id) => {
    try {
        console.log(id);
        const response = await axiosInstance.delete('/userInfo/experience', {
            data: { id }
        });
        return response.data;
    } catch (error) {
        console.error(error);
        return null;
    }
}

export { addExperienceService, getExperienceService , updateExperienceService, deleteExperienceService };