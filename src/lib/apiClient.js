import axios from 'axios';
import Cookies from 'js-cookie';

const getToken = () => Cookies.get('access_token') || sessionStorage.getItem('AT');
const BASE_URL = process.env.REACT_APP_API_URL;

BASE_URL === undefined && console.log('Base url not found');


const apiClient = axios.create({
	baseURL: BASE_URL,
	timeout: 30000,
	headers: {
		'Content-Type': 'application/json',
	},
});
// 'Content-Type': 'multipart/form-data',

apiClient.interceptors.request.use((config) => {
	const token = getToken();
	if (token) {
		config.headers.Authorization = `Bearer ${token}`;
	}
	return config;
});

export default apiClient;