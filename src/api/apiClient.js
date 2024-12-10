import axios from 'axios';
import Cookies from 'js-cookie';

const getToken = () => Cookies.get('access_token');
const BASE_URL = process.env.REACT_APP_API_URL;

BASE_URL == undefined && console.log('Base url not found');


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


// const apiClient = axios.create({
// 	baseURL: process.env.NEXT_PUBLIC_API_URL,
// 	withCredentials: true,
// 	timeout: 30000,
// 	headers: {},
// });

// apiClient.interceptors.request.use((config) => {
// 	const token = () => Cookies.get('access_token');
// 	console.log("access_token - ", token)
// 	if (token) {
// 		config.headers = {
// 			...config.headers,
// 			Authorization: `Bearer ${token}`,
// 		};
// 	}

// 	config.headers = {
// 		...config.headers,
// 	};
// 	return config;
// });

// apiClient.interceptors.response.use(
// 	(response) => {
// 		return response;
// 	},
// 	(error) => {
// 		if (error.response.status === 401) {
// 			window.location.href = "/auth/signup";
// 		}
// 		return Promise.reject(error.response.data);
// 	},
// );

// export default apiClient;