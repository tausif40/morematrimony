import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import apiClient from '../../api/apiClient';

export const getUserDetails = createAsyncThunk('data/getUserDetails', async (_, { rejectWithValue }) => {
	try {
		const response = await apiClient.get(`/user`);
		return response.data;
	} catch (error) {
		console.log(error);
		return rejectWithValue(error.response?.data || 'Failed to fetch UserDetails');
	}
});

export const getProfileImages = createAsyncThunk('data/getProfileImages', async (_, { rejectWithValue }) => {
	try {
		const response = await apiClient.get(`/gallery`);
		return response.data;
	} catch (error) {
		console.log(error);
		return rejectWithValue(error.response?.data || 'Failed to fetch profile images');
	}
});

const userDataSlice = createSlice({
	name: 'data',
	initialState: {
		userDetails: { data: [], loading: false, error: null },
		profileImages: { data: [], loading: false, error: null },
	},
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(getUserDetails.pending, (state) => {
				state.userDetails.loading = true
				state.userDetails.error = true
			})
			.addCase(getUserDetails.fulfilled, (state, action) => {
				state.userDetails.data = action.payload;
				state.userDetails.loading = false;
			})
			.addCase(getUserDetails.rejected, (state, action) => {
				state.userDetails.loading = false;
				state.userDetails.error = action.payload || action.error.message;
			})
			//get images
			.addCase(getProfileImages.pending, (state) => {
				state.profileImages.loading = true
				state.profileImages.error = true
			})
			.addCase(getProfileImages.fulfilled, (state, action) => {
				state.profileImages.data = action.payload;
				state.profileImages.loading = false;
			})
			.addCase(getProfileImages.rejected, (state, action) => {
				state.profileImages.loading = false;
				state.profileImages.error = action.payload || action.error.message;
			})
	}
})

export default userDataSlice.reducer;