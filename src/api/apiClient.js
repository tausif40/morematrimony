import axios from 'axios';
import Cookies from 'js-cookie';

const getToken = () => Cookies.get('access_token');
const BASE_URL = process.env.REACT_APP_API_URL;

const apiClient = axios.create({
	baseURL: BASE_URL,
	headers: {
		'Content-Type': 'application/json',
	},
});


apiClient.interceptors.request.use((config) => {
	const token = getToken();
	if (token) {
		config.headers.Authorization = `Bearer ${token}`;
	}
	return config;
});

export default apiClient;
