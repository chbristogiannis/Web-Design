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
        const response = await axiosInstance.delete('/userInfo/experience', {
            data: { id }
        });
        return response.data;
    } catch (error) {
        console.error(error);
        return null;
    }
}

const addEducationService = async (education) => {
    try {
        const response = await axiosInstance.post('/userInfo/education', education);
        return response.data;
    } catch (error) {
        console.error(error);
        return null;
    }
}

const getEducationService = async () => {
    try {
        const response = await axiosInstance.get('/userInfo/education');
        return response.data;
    } catch (error) {
        console.error(error);
        return null;
    }
}

const updateEducationService = async (education) => {
    try {
        const response = await axiosInstance.put('/userInfo/education', education);
        return response.data;
    } catch (error) {
        console.error(error);
        return null;
    }
}

const deleteEducationService = async (id) => {
    try {
        const response = await axiosInstance.delete('/userInfo/education', {
            data: { id }
        });
        return response.data;
    } catch (error) {
        console.error(error);
        return null;
    }
}

const addSkillService = async (skill) => {
    try {
        const response = await axiosInstance.post('/userInfo/skills', skill);
        return response.data;
    } catch (error) {
        console.error(error);
        return null;
    }
}

const getSkillService = async () => {
    try {
        const response = await axiosInstance.get('/userInfo/skills');
        return response.data;
    } catch (error) {
        console.error(error);
        return null;
    }
}

const updateSkillService = async (id) => {
    try {
        const response = await axiosInstance.put('/userInfo/skills', id);
        return response.data;
    } catch (error) {
        console.error(error);
        return null;
    }
}

const deleteSkillService = async (id) => {
    try {
        const response = await axiosInstance.delete('/userInfo/skills', {
            data: { id }
        });
        return response.data;
    } catch (error) {
        console.error(error);
        return null;
    }
}

export { 
    addExperienceService, 
    getExperienceService , 
    updateExperienceService, 
    deleteExperienceService,
    addEducationService,
    getEducationService,
    updateEducationService,
    deleteEducationService,
    addSkillService,
    getSkillService,
    updateSkillService,
    deleteSkillService
};