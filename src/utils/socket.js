import { io } from "socket.io-client";

// const SOCKET_URL = "http://your-backend-url"; // Replace with your backend URL
const BASE_URL = process.env.REACT_APP_API_URL;

export const socket = io(BASE_URL, {
	withCredentials: true,
	autoConnect: false, // Prevent auto connection
});
