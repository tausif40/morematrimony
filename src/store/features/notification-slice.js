import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import apiClient from '../../lib/apiClient';

export const getNotification = createAsyncThunk('noti/getNotification', async (userId, { rejectWithValue }) => {
	try {
		const response = await apiClient.get(`/notification?userId=${userId}`);
		return response.data;
	} catch (error) {
		// console.log(error);
		return rejectWithValue(error.response?.data || 'Failed to fetch notification');
	}
});

const notificationSlice = createSlice({
	name: 'noti',
	initialState: {
		notification: { data: [], loading: false, error: null },
	},
	reducers: {},
	extraReducers: (builder) => {
		builder
			// get Notification
			.addCase(getNotification.pending, (state) => {
				state.notification.loading = true
				state.notification.error = true
			})
			.addCase(getNotification.fulfilled, (state, action) => {
				state.notification.data = action.payload;
				state.notification.loading = false;
			})
			.addCase(getNotification.rejected, (state, action) => {
				state.notification.loading = false;
				state.notification.error = action.payload || action.error.message;
			})
	}
})

export default notificationSlice.reducer;