import axios from 'axios';

const baseURL = 'http://restohub-api.us-east-2.elasticbeanstalk.com/api';

// Create an instance of axios with a base URL
const api = axios.create({
    baseURL: baseURL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Define a function to handle API requests
export const makeApiRequest = async (method, endpoint, data = null, params = null) => {
    try {
        const response = await api.request({
            method: method,
            url: endpoint,
            data: data,
            params: params,
        });

        return response.data;
    } catch (error) {
        console.error('API request failed:', error);
        throw error;
    }
};
