// /services/authService.js

import axios from 'axios';

export const login = async (email, password) => {
    try {
        const response = await axios.post(
            'http://restohub-api.us-east-2.elasticbeanstalk.com/login', {

                headers: {
                    'Content-Type': 'application/json',
                }
            },
            {
                params: {
                    email: email,
                    password: password
                }
            }
        );

        if (response.status === 200) {
            return {
                success: true,
                data: response.data,
            };
        };
        console.log(response.data) //remove

    } catch (error) {
        console.log(email, password)
        console.log(error);
        console.error(error);
        return {
            success: false,
            error: error.response?.data.message || 'Authentication failed. Please check your credentials.',
        };
    }
};
