import { createSlice } from "@reduxjs/toolkit";

const socketSlice = createSlice({
	name: "socket",
	initialState: {
		isConnected: false,
		messages: [],
	},
	reducers: {
		setConnected: (state, action) => {
			state.isConnected = action.payload;
		},
		addMessage: (state, action) => {
			state.messages.push(action.payload);
		},
	},
});

export const { setConnected, addMessage } = socketSlice.actions;
export default socketSlice.reducer;