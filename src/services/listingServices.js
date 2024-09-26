import axiosInstance from '../utils/axiosInstance';

const fetchListings = async () => {
    try {
        const response = await axiosInstance.get('/listings/');

        return response.data;
    } catch (error) {
        if (error.response) {
            console.error(error.response.data);
        }
        return null;
    }
};

const createListing = async (listing) => {
    try {
        const response = await axiosInstance.post('/listings/', listing);

        return response.data;
    } catch (error) {
        if (error.response) {
            console.error(error.response.data);
        }
        return null;
    }
}

const applyToListing = async (listingId) => {
    try {
        const response = await axiosInstance.post(`/listings/${listingId}/apply/`);

        return response.data;
    } catch (error) {
        if (error.response) {
            console.error(error.response.data);
        }
        return null;
    }
}

const fetchListingApplicants = async (listingId) => {
    try {
        const response = await axiosInstance.get(`/listings/${listingId}/applicants/`);

        return response.data;
    } catch (error) {
        if (error.response) {
            console.error(error.response.data);
        }
        return null;
    }
}

const markListingAsSeen = async (listingId) => {
    try {
        const response = await axiosInstance.post(`/listings/${listingId}/seen/`);

        return response.data;
    } catch (error) {
        if (error.response) {
            console.error(error.response.data);
        }
        return null;
    }
}

export { fetchListings, createListing, applyToListing, fetchListingApplicants, markListingAsSeen };