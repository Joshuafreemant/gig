import axios from 'axios';
export const apiInstance = axios.create({
	// Configuration
	baseURL: process.env.REACT_APP_API_URL,
    withCredentials: true,
	headers: {
		Accept: 'application/json',
	},
});