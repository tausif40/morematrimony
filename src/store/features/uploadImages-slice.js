import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import apiClient from '../../api/apiClient';


export const uploadImages = createAsyncThunk('data/uploadImages', async (_, { rejectWithValue }) => {
	try {
		const response = await apiClient.get(`/gallery`);
		console.log(response.data);
		return response.data;
	} catch (error) {
		console.log(error);
		return rejectWithValue(error.response?.data || 'Failed to fetch images');
	}
});

const userUploadImages = createSlice({
	name: 'data',
	initialState: {
		images: [],
		loading: false,
		error: null
	},
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(uploadImages.pending, (state) => {
				state.loading = true
				state.error = true
			})
			.addCase(uploadImages.fulfilled, (state, action) => {
				state.images = action.payload;
				state.loading = false;
			})
			.addCase(uploadImages.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload || action.error.message;
			})
	}
})

export default userUploadImages.reducer;