// /services/authService.js

import axios from 'axios';

const API_URL = 'http://restohub-api.us-east-2.elasticbeanstalk.com';// TODO: move this to environment file instead of hardcoding

export const login = async (email, password) => {
    try {
        const response = await axios.post(
            `${API_URL}/login`,
            { email, password },
            { headers: { 'Content-Type': 'application/json' } }
        );

        if (response.status === 200) {
            return {
                success: true,
                data: response.data,
            };
        };
        console.log(response.data) //remove

    } catch (error) {

        console.log(error);
        console.error(error);
        return {
            success: false,
            error: error.response?.data.message || 'Authentication failed. Please check your credentials.',
        };
    }
};
