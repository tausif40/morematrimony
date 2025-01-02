import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import apiClient from '../../api/apiClient';

export const getMatchProfile = createAsyncThunk('data/getMatchProfile', async (_, { rejectWithValue }) => {
	try {
		const response = await apiClient.get(`/user/matched-profile`);
		return response.data;
	} catch (error) {
		console.log(error);
		return rejectWithValue(error.response?.data || 'Failed to fetch matchProfile');
	}
});

export const matchProfileFilter = createAsyncThunk('data/getMatchProfile', async (_, { rejectWithValue }) => {
	try {
		const response = await apiClient.get(`/user/matched-profile`);
		return response.data;
	} catch (error) {
		console.log(error);
		return rejectWithValue(error.response?.data || 'Failed to fetch matchProfile');
	}
});


const matchProfile = createSlice({
	name: 'data',
	initialState: {
		matchProfile: { data: [], loading: false, error: null }
	},
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(getMatchProfile.pending, (state) => {
				state.matchProfile.loading = true
				state.matchProfile.error = true
			})
			.addCase(getMatchProfile.fulfilled, (state, action) => {
				// console.log(action);
				state.matchProfile.data = action.payload;
				state.matchProfile.loading = false;
			})
			.addCase(getMatchProfile.rejected, (state, action) => {
				state.matchProfile.loading = false;
				state.matchProfile.error = action.payload || action.error.message;
			})
	}
})

export default matchProfile.reducer;