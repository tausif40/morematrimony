import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import apiClient from '../../api/apiClient';

export const setUserAction = createAsyncThunk('action', async (data, { rejectWithValue }) => {
	try {
		const response = await apiClient.post(`/social-action`, data);
		return response.data;
	} catch (error) {
		console.log(error);
		return rejectWithValue(error.response?.data || 'Failed to send request');
	}
});

// Slice definition
const userAction = createSlice({
	name: 'action',
	initialState: {
		sendInterest: { data: [], loading: false, error: null },
		shortlist: { data: [], loading: false, error: null },
		viewed: { data: [], loading: false, error: null },
	},
	reducers: {},
	extraReducers: (builder) => {
		builder
			// sendInterest
			.addCase(setUserAction.pending, (state) => {
				state.sendInterest.loading = true;
				state.sendInterest.error = null;
			})
			.addCase(setUserAction.fulfilled, (state, action) => {
				state.sendInterest.data = action.payload;
				state.sendInterest.loading = false;
			})
			.addCase(setUserAction.rejected, (state, action) => {
				state.sendInterest.loading = false;
				state.sendInterest.error = action.payload || action.error.message;
			})
	},
});

export default userAction.reducer;
