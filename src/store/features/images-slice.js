import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import apiClient from '../../api/apiClient';
import { getUserDetails } from './userDetails-slice';
import toast from 'react-hot-toast';

export const uploadImages = createAsyncThunk('data/uploadImages', async (_, { rejectWithValue, dispatch }) => {
	// try {
	// 	const response = await apiClient.post(`/gallery`, {
	// 		headers: {
	// 			'Content-Type': 'multipart/form-data',
	// 		},
	// 	});
	// 	dispatch(getProfileImages());
	// 	return response.data;
	// } catch (error) {
	// 	return rejectWithValue(error.response?.data || 'Failed to upload images');
	// }
});

export const uploadDpImage = createAsyncThunk('data/uploadDpImages', async (userData, { rejectWithValue, dispatch }) => {
	const loadingToast = toast.loading('Updating.....');
	try {
		const { userId, url } = userData;
		const response = await apiClient.patch(`/user/profile-image/${userId}`, { profileImage: url });
		toast.success('Update successful!', { id: loadingToast });
		dispatch(getUserDetails());
		return response.data;
	} catch (error) {
		toast.error(error?.response?.data?.message || 'Upload failed', { id: loadingToast });
		return rejectWithValue(error.response?.data || 'Failed to update profile images');
	}
});

const userUploadImages = createSlice({
	name: 'data',
	initialState: {
		allUploadImages: { images: [], loading: false, error: null, },
		DpImage: { image: [], loading: false, error: null },
	},
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(uploadImages.pending, (state) => {
				state.allUploadImages.loading = true
				state.allUploadImages.error = true
			})
			.addCase(uploadImages.fulfilled, (state, action) => {
				state.allUploadImages.images = action.payload;
				state.allUploadImages.loading = false;
			})
			.addCase(uploadImages.rejected, (state, action) => {
				state.allUploadImages.loading = false;
				state.allUploadImages.error = action.payload || action.error.message;
			})

			.addCase(uploadDpImage.pending, (state) => {
				state.DpImage.loading = true
				state.DpImage.error = true
			})
			.addCase(uploadDpImage.fulfilled, (state, action) => {
				state.DpImage.image = action.payload;
				state.DpImage.loading = false;
			})
			.addCase(uploadDpImage.rejected, (state, action) => {
				state.DpImage.loading = false;
				state.DpImage.error = action.payload || action.error.message;
			})
	}
})

export default userUploadImages.reducer;