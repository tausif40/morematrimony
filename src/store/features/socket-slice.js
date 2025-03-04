import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import apiClient from '../../api/apiClient';

export const connectSocket = createAsyncThunk('socket/connectSocket', async (_, { rejectWithValue }) => {
	try {
		const response = await apiClient.get(``);
		// console.log(response.data);
		return response.data;
	} catch (error) {
		console.log(error);
		return rejectWithValue(error.response?.data || 'Failed to connect Socket');
	}
});
const socketSlice = createSlice({
	name: "socket",
	initialState: {
		messages: [],
		isConnected: false,
	},
	reducers: {
		addMessage: (state, action) => {
			state.messages.push(action.payload);
		},
		setConnected: (state, action) => {
			state.isConnected = action.payload;
		},
	},
});

export const { addMessage, setConnected } = socketSlice.actions;
export default socketSlice.reducer;
