// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import apiClient from '../../api/apiClient';
// import { getQueryParams } from '../../utils/utils';

// export const getMatchProfile = createAsyncThunk('data/getMatchProfile', async (_, { rejectWithValue }) => {
// 	try {
// 		const response = await apiClient.get(`/user/matched-profile`);
// 		return response.data;
// 	} catch (error) {
// 		console.log(error);
// 		return rejectWithValue(error.response?.data || 'Failed to fetch matchProfile');
// 	}
// });

// export const matchProfileFilter = createAsyncThunk('data/getMatchProfile', async (filterData, { rejectWithValue }) => {

// 	try {
// 		const response = await apiClient.get(`/user/auth?${getQueryParams(filterData)}`);
// 		return response.data;
// 	} catch (error) {
// 		console.log(error);
// 		return rejectWithValue(error.response?.data || 'Failed to fetch matchProfile');
// 	}
// });


// const matchProfile = createSlice({
// 	name: 'data',
// 	initialState: {
// 		matchProfile: { data: [], loading: false, error: null }
// 	},
// 	reducers: {},
// 	extraReducers: (builder) => {
// 		builder
// 			.addCase(getMatchProfile.pending, (state) => {
// 				state.matchProfile.loading = true
// 				state.matchProfile.error = true
// 			})
// 			.addCase(getMatchProfile.fulfilled, (state, action) => {
// 				// console.log(action);
// 				state.matchProfile.data = action.payload;
// 				state.matchProfile.loading = false;
// 			})
// 			.addCase(getMatchProfile.rejected, (state, action) => {
// 				state.matchProfile.loading = false;
// 				state.matchProfile.error = action.payload || action.error.message;
// 			})

// 			.addCase(matchProfileFilter.pending, (state) => {
// 				state.matchProfile.loading = true
// 				state.matchProfile.error = true
// 			})
// 			.addCase(matchProfileFilter.fulfilled, (state, action) => {
// 				// console.log(action);
// 				state.matchProfile.data = action.payload;
// 				state.matchProfile.loading = false;
// 			})
// 			.addCase(matchProfileFilter.rejected, (state, action) => {
// 				state.matchProfile.loading = false;
// 				state.matchProfile.error = action.payload || action.error.message;
// 			})
// 	}
// })

// export default matchProfile.reducer;

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import apiClient from '../../api/apiClient';
import { getQueryParams } from '../../utils/utils';

// Fetch all match profiles
export const getMatchProfile = createAsyncThunk('data/getMatchProfile', async (_, { rejectWithValue }) => {
	// console.log("url - ", `/user/matched-profile`);
	try {
		const response = await apiClient.get(`/user/matched-profile`);
		// console.log("response - ", response.data);
		return response.data;
	} catch (error) {
		console.log(error);
		return rejectWithValue(error.response?.data || 'Failed to fetch matchProfile');
	}
});

// Fetch filtered match profiles
export const matchProfileFilter = createAsyncThunk('data/matchProfileFilter', async (filterData, { rejectWithValue }) => {
	// console.log(filterData);
	try {
		const queryParams = getQueryParams(filterData);
		// console.log(`/user/auth?${queryParams}`);
		const response = await apiClient.get(`/user/auth?${queryParams}`);
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
