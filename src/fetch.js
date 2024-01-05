import axios from 'axios';
export const apiInstance = axios.create({
	// Configuration
	baseURL: 'http://localhost:8000/api/',
    withCredentials: true,
	timeout: 8000,
	headers: {
		Accept: 'application/json',
	},
});