import axios from 'axios';
export const apiInstance = axios.create({
	// Configuration
	baseURL: 'http://localhost:8000/api/',
    withCredentials: true,
	headers: {
		Accept: 'application/json',
	},
});