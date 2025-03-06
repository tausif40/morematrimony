import io from "socket.io-client";

const BASE_URL = process.env.REACT_APP_API_URL;
// const BASE_URL = "ws://api.morematrimony.com";

const socket = io(BASE_URL, {
	withCredentials: true,
	transports: [ "websocket", "polling" ]
});

export default socket;