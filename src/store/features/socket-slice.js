import { createSlice } from "@reduxjs/toolkit";
import { getNotification } from "./notification-slice";

const socketSlice = createSlice({
	name: "socket",
	initialState: {
		isConnected: false,
		notifications: '',
		messages: [],
	},
	reducers: {
		setConnected: (state, action) => {
			state.isConnected = action.payload;
		},
		setNotification: (state, action) => {
			console.log("action - ", action);
			state.notifications = action.payload;
			getNotification();
			// state.notifications.new = action.payload.new;
		},
		addMessage: (state, action) => {
			state.messages.push(action.payload);
		},
	},
});

export const { setConnected, addMessage, setNotification } = socketSlice.actions;
export default socketSlice.reducer;