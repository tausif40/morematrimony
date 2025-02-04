import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import apiClient from '../../api/apiClient';

export const getAgentDetails = createAsyncThunk('data/getAgentDetails', async (_, { rejectWithValue }) => {
	try {
		const response = await apiClient.get(`/agent`);
		return response.data;
	} catch (error) {
		console.log(error);
		return rejectWithValue(error.response?.data || 'Failed to fetch UserDetails');
	}
});
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
		// console.log(response.data);
		return response.data;	
	} catch (error) {
		console.log(error);
		return rejectWithValue(error.response?.data || 'Failed to fetch profile images');
	}
});

const userDataSlice = createSlice({
	name: 'data',
	initialState: {
		agentDetails: { data: [], loading: false, error: null },
		userDetails: { data: [], loading: false, error: null },
		userId: null,
		profileImages: { data: [], loading: false, error: null },
		dpImage: { img: null, loading: false, error: null },
	},
	reducers: {},
	extraReducers: (builder) => {
		builder
			// agent details
			.addCase(getAgentDetails.pending, (state) => {
				state.agentDetails.loading = true
				state.agentDetails.error = true
			})
			.addCase(getAgentDetails.fulfilled, (state, action) => {
				state.agentDetails.data = action.payload;
				state.agentDetails.loading = false;
			})
			.addCase(getAgentDetails.rejected, (state, action) => {
				state.agentDetails.loading = false;
				state.agentDetails.error = action.payload || action.error.message;
			})
			// user Details
			.addCase(getUserDetails.pending, (state) => {
				state.userDetails.loading = true
				state.userDetails.error = true
			})
			.addCase(getUserDetails.fulfilled, (state, action) => {
				state.userId = action.payload?.user?._id;
				state.userDetails.data = action.payload;
				state.dpImage.img = action?.payload?.user?.profileImage;
				state.userDetails.loading = false;
			})
			.addCase(getUserDetails.rejected, (state, action) => {
				state.userDetails.loading = false;
				state.userDetails.error = action.payload || action.error.message;
			})
			//get images
			.addCase(getProfileImages.pending, (state) => {
				state.profileImages.data = [];
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