import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import apiClient from '../../api/apiClient';

export const setUserAction = createAsyncThunk('action/setUserAction', async (data, { rejectWithValue }) => {
	try {
		const response = await apiClient.post(`/social-action`, data);
		console.log({ activityType: data.activityType, data: response.data });
		// getUserAction(data.activityType);
		return response.data;
	} catch (error) {
		console.log(error);
		return rejectWithValue(error?.response?.data || 'Failed to send request');
	}
});
export const getUserAction = createAsyncThunk('action/getUserAction', async (activityType, { rejectWithValue }) => {
	try {
		const response = await apiClient.get(`/social-action/query?activityType=${activityType}`);
		// console.log("getUserAction response - ", { activityType, data: response.data });
		return { activityType, data: response.data };
	} catch (error) {
		console.log(error);
		return rejectWithValue(error?.response?.data || 'Failed to send request');
	}
});
export const getReceivedInterest = createAsyncThunk('action/getReceivedInterest', async (userId, { rejectWithValue }) => {
	try {
		const response = await apiClient.get(`/social-action/received-interest-profiles?userId=${userId}`);
		console.log("getReceivedInterest ", response.data);
		return response.data;
	} catch (error) {
		console.log(error);
		return rejectWithValue(error?.response?.data || 'Failed to send request');
	}
});
export const acceptSkipInterest = createAsyncThunk('action/acceptSkipInterest', async (data, { rejectWithValue }) => {
	try {
		console.log("send data - ", data);
		const response = await apiClient.post(`/social-action/accept-skip-profiles`, data);
		// console.log("getUserAction response - ", response.data);
		return response.data;
	} catch (error) {
		console.log(error);
		return rejectWithValue(error?.response?.data || 'Failed to send request');
	}
});
export const getAccepter = createAsyncThunk('action/getAccepter', async (id, { rejectWithValue }) => {
	try {
		const response = await apiClient.get(`/social-action/accepter-profiles?userId=${id}`);
		// console.log("getUserAction response - ", response.data);
		return response.data;
	} catch (error) {
		console.log(error);
		return rejectWithValue(error?.response?.data || 'Failed to send getAccepter');
	}
});
export const getViewedYou = createAsyncThunk('action/getViewedYou', async (userId, { rejectWithValue }) => {
	try {
		const response = await apiClient.get(`/social-action/viewed-you?userId=${userId}`);
		// console.log("getUserAction response - ", { activityType, data: response.data });
		return response.data;
	} catch (error) {
		console.log(error);
		return rejectWithValue(error?.response?.data || 'Failed to send request');
	}
});

// Slice definition
const userAction = createSlice({
	name: 'action',
	initialState: {
		send_interest: { data: [], loading: true, error: null },
		shortlist: { data: [], loading: true, error: null },
		receivedInterest: { data: [], loading: false, error: null },
		viewed: { data: [], loading: true, error: null },
		viewedYou: { data: [], loading: false, error: null },
		accept: { data: [], loading: false, error: null },
		accepter: { data: [], loading: false, error: null },
		skip: { data: [], loading: false, error: null },
	},
	reducers: {},
	extraReducers: (builder) => {
		builder
			// Handle getUserAction
			.addCase(getUserAction.pending, (state, action) => {
				const { activityType } = action.meta.arg;
				// console.log(action);
				if (state[ activityType ]) {
					state[ activityType ].loading = true;
					state[ activityType ].error = null;
				}
			})
			.addCase(getUserAction.fulfilled, (state, action) => {
				const { activityType, data } = action.payload;
				// console.log(action.payload);
				if (state[ activityType ]) {
					state[ activityType ].data = data;
					state[ activityType ].loading = false;
				}
			})
			.addCase(getUserAction.rejected, (state, action) => {
				const { activityType } = action.meta.arg;
				if (state[ activityType ]) {
					state[ activityType ].loading = false;
					state[ activityType ].error = action.payload || action.error.message;
				}
			})

			.addCase(getReceivedInterest.pending, (state) => {
				state.receivedInterest.loading = true
				state.receivedInterest.error = true
			})
			.addCase(getReceivedInterest.fulfilled, (state, action) => {
				state.receivedInterest.data = action.payload;
				state.receivedInterest.loading = false;
			})
			.addCase(getReceivedInterest.rejected, (state, action) => {
				state.receivedInterest.loading = false;
				state.receivedInterest.error = action.payload || action.error.message;
			})

			.addCase(getViewedYou.pending, (state) => {
				state.viewedYou.loading = true
				state.viewedYou.error = true
			})
			.addCase(getViewedYou.fulfilled, (state, action) => {
				state.viewedYou.data = action.payload;
				state.viewedYou.loading = false;
			})
			.addCase(getViewedYou.rejected, (state, action) => {
				state.viewedYou.loading = false;
				state.viewedYou.error = action.payload || action.error.message;
			})
			// accepter
			.addCase(getAccepter.pending, (state) => {
				state.accepter.loading = true
				state.accepter.error = true
			})
			.addCase(getAccepter.fulfilled, (state, action) => {
				state.accepter.data = action.payload;
				state.accepter.loading = false;
			})
			.addCase(getAccepter.rejected, (state, action) => {
				state.accepter.loading = false;
				state.accepter.error = action.payload || action.error.message;
			})
	},
});

export default userAction.reducer;
