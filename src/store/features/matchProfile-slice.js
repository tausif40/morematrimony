import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import apiClient from '../../api/apiClient';
import { getQueryParams } from '../../utils/utils';

// Fetch all match profiles
export const getMatchProfile = createAsyncThunk('data/getMatchProfile', async (_, { rejectWithValue }) => {
	// console.log("url - ", `/user/matched-profile`);
	try {
		const response = await apiClient.get(`/user/matched-profile`);
		console.log("getMatchProfile - ", response.data);
		return response.data;
	} catch (error) {
		console.log(error);
		return rejectWithValue(error.response?.data || 'Failed to fetch matchProfile');
	}
});

export const getUserDetailsById = createAsyncThunk('data/getUserDetailsById', async (id, { rejectWithValue }) => {
	try {
		const response = await apiClient.get(`/user/matched-profile/${id}`);
		// console.log("getUserDetailsById - ", response.data);
		return response.data;
	} catch (error) {
		console.log(error);
		return rejectWithValue(error.response?.data || 'Failed to fetch matchProfile');
	}
});
export const matchedProfileGallery = createAsyncThunk('data/getUserDetailsById', async (id, { rejectWithValue }) => {
	try {
		const response = await apiClient.get(`gallery/matchedProfileGallery${id}`);
		return response.data;
	} catch (error) {
		console.log(error);
		return rejectWithValue(error.response?.data || 'Failed to fetch matchProfile');
	}
});

// Fetch filtered match profiles
export const matchProfileFilter = createAsyncThunk('data/matchProfileFilter', async (filterData, { rejectWithValue }) => {
	console.log(filterData);
	try {
		const queryParams = getQueryParams(filterData);
		// console.log(`/user/auth?${queryParams}`);
		const response = await apiClient.get(`/user/auth?${queryParams}`);
		console.log("matchProfileFilter - ", response.data);
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
		matchProfile: { data: [], loading: false, error: null },
		userDetailsById: { data: [], loading: false, error: null },
		filters: {}, // Store the currently applied filters
	},
	reducers: {
		setFilters: (state, action) => {
			state.filters = action.payload; // Update filters
		},
		resetFilters: (state) => {
			state.filters = {}; // Reset filters to default
		},
	},
	extraReducers: (builder) => {
		console.log("filters - ", matchProfileSlice.filters);
		builder
			.addCase(getMatchProfile.pending, (state) => {
				state.matchProfile.loading = true;
				state.matchProfile.error = null;
			})
			.addCase(getMatchProfile.fulfilled, (state, action) => {
				state.matchProfile.data = action.payload;
				state.matchProfile.loading = false;
			})
			.addCase(getMatchProfile.rejected, (state, action) => {
				state.matchProfile.loading = false;
				state.matchProfile.error = action.payload || action.error.message;
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
			// matchProfileFilter
			.addCase(matchProfileFilter.pending, (state) => {
				// state.matchProfile.loading = true;
				state.matchProfile.error = null;
			})
			.addCase(matchProfileFilter.fulfilled, (state, action) => {
				state.matchProfile.data = action.payload;
				state.matchProfile.loading = false;
			})
			.addCase(matchProfileFilter.rejected, (state, action) => {
				state.matchProfile.loading = false;
				state.matchProfile.error = action.payload || action.error.message;
			});
	},
});

// Export actions and reducer
export const { setFilters, resetFilters } = matchProfileSlice.actions;
export default matchProfileSlice.reducer;
