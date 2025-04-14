import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import apiClient from '../../lib/apiClient';
import { getQueryParams } from '../../utils/utils';
// import getMatchedProfile

export const getUserDetailsById = createAsyncThunk('data/getUserDetailsById', async (ids, { rejectWithValue }) => {
	try {
		const response = await apiClient.get(`/user/user-profile-with-action/${ids?.targetId}/${ids?.userId}`);
		return response.data;
	} catch (error) {
		console.log(error);
		return rejectWithValue(error.response?.data || 'Failed to fetch matchProfile');
	}
});
export const getMatchedProfileGallery = createAsyncThunk('data/getMatchedProfileGallery', async (id, { rejectWithValue }) => {
	try {
		const response = await apiClient.get(`gallery/matchedProfileGallery/${id}`);
		return response.data;
	} catch (error) {
		console.log(error);
		return rejectWithValue(error.response?.data || 'Failed to fetch matchProfile');
	}
});

// Fetch filtered match profiles
export const getMatchedProfile = createAsyncThunk('data/getMatchedProfile', async (filterData, { rejectWithValue }) => {
	try {
		const queryParams = getQueryParams(filterData);
		// console.log(queryParams);
		const response = await apiClient.get(`/user/auth?${queryParams || ''}`);
		return response.data;
	} catch (error) {
		console.log(error);
		return rejectWithValue(error.response?.data || 'Failed to fetch matchProfile');
	}
});

// Slice definition
const matchProfileSlice = createSlice({
	name: 'data',
	initialState: {
		matchedProfile: { data: [], loading: false, error: null },
		matchedProfileGallery: { data: [], loading: false, error: null },
		userDetailsById: { data: [], loading: false, error: null },
		filter: { page: 1, limit: '', totalUsers: '' }
	},
	reducers: {
		setFilter(state, action) {
			state.filter.limit = action.payload.limit;
			state.filter.page = action.payload.page;
			state.filter.totalUsers = action.payload.totalUsers;
			getMatchedProfile(state.filter);
		}
	},
	extraReducers: (builder) => {
		// console.log("filters - ", matchProfileSlice.filters);
		builder
			// matchProfileFilter
			.addCase(getMatchedProfile.pending, (state) => {
				// state.matchedProfile.loading = true;
				state.matchedProfile.error = null;
			})
			.addCase(getMatchedProfile.fulfilled, (state, action) => {
				state.matchedProfile.data = action.payload;
				state.matchedProfile.loading = false;
			})
			.addCase(getMatchedProfile.rejected, (state, action) => {
				state.matchedProfile.loading = false;
				state.matchedProfile.error = action.payload || action.error.message;
			})
			// getMatchedProfileGallery
			.addCase(getMatchedProfileGallery.pending, (state) => {
				state.matchedProfileGallery.loading = true;
				state.matchedProfileGallery.error = null;
			})
			.addCase(getMatchedProfileGallery.fulfilled, (state, action) => {
				state.matchedProfileGallery.data = action.payload;
				state.matchedProfileGallery.loading = false;
			})
			.addCase(getMatchedProfileGallery.rejected, (state, action) => {
				state.matchedProfileGallery.loading = false;
				state.matchedProfileGallery.error = action.payload || action.error.message;
			})
			// getUserDetailsById
			.addCase(getUserDetailsById.pending, (state) => {
				state.userDetailsById.loading = true;
				state.userDetailsById.error = null;
			})
			.addCase(getUserDetailsById.fulfilled, (state, action) => {
				state.userDetailsById.data = action.payload;
				state.userDetailsById.loading = false;
			})
			.addCase(getUserDetailsById.rejected, (state, action) => {
				state.userDetailsById.loading = false;
				state.userDetailsById.error = action.payload || action.error.message;
			})
	},
});

export const { setFilter } = matchProfileSlice.actions;
export default matchProfileSlice.reducer;
