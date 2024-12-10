import axios from 'axios';
import { API_URL } from '../utils/constants';

export const postBehaviorData = async (data) => {
    try {
        const response = await axios.post(`${API_URL}/api/behavior-data/`, data);
        return response.data;
    } catch (error) {
        console.error('Error posting behavior data', error);
        throw error;
    }
};
