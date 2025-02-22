import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import apiClient from '../../api/apiClient';

export const getPlan = createAsyncThunk('plan/getNotification', async (_, { rejectWithValue }) => {
	try {
		const response = await apiClient.get(`/plan/active`);
		// console.log(response.data);
		return response.data;
	} catch (error) {
		console.log(error);
		return rejectWithValue(error.response?.data || 'Failed to fetch notification');
	}
});

const planSlice = createSlice({
	name: 'plan',
	initialState: {
		plans: { data: [], loading: false, error: null },
	},
	reducers: {},
	extraReducers: (builder) => {
		builder
			// get Notification
			.addCase(getPlan.pending, (state) => {
				state.plans.loading = true
				state.plans.error = true
			})
			.addCase(getPlan.fulfilled, (state, action) => {
				state.plans.data = action.payload;
				state.plans.loading = false;
			})
			.addCase(getPlan.rejected, (state, action) => {
				state.plans.loading = false;
				state.plans.error = action.payload || action.error.message;
			})
	}
})

export default planSlice.reducer;