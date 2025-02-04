import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import apiClient from '../../api/apiClient';
import { getQueryParams } from '../../utils/utils';

export const getUserDetailsById = createAsyncThunk('data/getUserDetailsById', async (ids, { rejectWithValue }) => {
	try {
		const response = await apiClient.get(`/user/user-profile-with-action/${ids?.targetId}/${ids?.userId}`);
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
		userDetailsById: { data: [], loading: false, error: null },
		filters: {},
		noOfFilter: 0,
		page: 1,
	},
	reducers: {
		setFilterApplied(state, action) {
			state.filters = action.payload;
		},
		setPage(state, action) {
			state.page = action.payload;
		},
		setNoOfFilter(state, action) {
			state.noOfFilter = action.payload;
		},
	},
	extraReducers: (builder) => {
		console.log("filters - ", matchProfileSlice.filters);
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

export const { setPage, setNoOfFilter, setFilterApplied } = matchProfileSlice.actions;
export default matchProfileSlice.reducer;
