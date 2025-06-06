import { useEffect } from "react";
import { useDispatch } from "react-redux";
import socket from "../../lib/socket";
import { addMessage, setConnected, setNotification } from "../../store/features/socket-slice";

const SocketProvider = ({ children }) => {
	const dispatch = useDispatch();

	useEffect(() => {
		// Connection event
		socket.on("connect", () => {
			// console.log("id-", id);
			dispatch(setConnected(true));
			console.log("Connected to WebSocket");
		});

		// Disconnection event
		socket.on("disconnect", () => {
			dispatch(setConnected(false));
			console.log("Disconnected from WebSocket");
		});

		// Listen for messages
		socket.on("socialActionUpdate", (data) => {

			console.log("social Action Update: ", data);
		});

		socket.on("newNotification", (data) => {
			dispatch(setNotification(data));
			console.log("new Notification: ", data);
			// dispatch(setNotification(data));
		});

		return () => {
			socket.off("connect");
			socket.off("disconnect");
			socket.off("message");
		};
	}, [ dispatch ]);

	return children;
};

export default SocketProvider;
