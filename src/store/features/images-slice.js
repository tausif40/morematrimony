import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import apiClient from '../../lib/apiClient';
import { getUserDetails, getProfileImages } from './userDetails-slice';
import toast from 'react-hot-toast';

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

export const uploadImages = createAsyncThunk(
	'data/uploadImages',
	async ({ formData, file }, { rejectWithValue, dispatch }) => {
		const loadingToast = toast.loading('Uploading image...');
		try {
			const response = await apiClient.post('/gallery', formData, {
				headers: {
					'Content-Type': 'multipart/form-data',
				},
				onUploadProgress: (progressEvent) => {
					const percentage = Math.round(
						(progressEvent.loaded * 100) / progressEvent.total
					);
					console.log(`Upload progress: ${percentage}%`);
				},
			});

			toast.success('Image uploaded successfully!', { id: loadingToast });
			dispatch(getProfileImages());

			// Generate a preview URL for the uploaded image
			const imageUrl = URL.createObjectURL(file);

			return { imageUrl, ...response.data };
		} catch (error) {
			toast.error(
				error?.response?.data?.message || 'Failed to upload image',
				{ id: loadingToast }
			);
			return rejectWithValue(error.response?.data || 'Failed to upload image');
		}
	}
);

export const deleteImage = createAsyncThunk('data/deleteImage', async (imageId, { rejectWithValue, dispatch }) => {
	const loadingToast = toast.loading('deleting....');
	try {
		// const { userId, url } = userData;
		console.log(imageId);
		const response = await apiClient.delete(`/gallery/${imageId}`);
		response && toast.success('Delete successful!', { id: loadingToast });
		dispatch(getProfileImages());
		console.log(response.data);
		return response.data;
	} catch (error) {
		toast.error(error?.response?.data?.message || 'Delete failed', { id: loadingToast });
		return rejectWithValue(error.response?.data || 'Failed to delete profile images');
	}
});

const userUploadImages = createSlice({
	name: 'data',
	initialState: {
		allUploadImages: { images: [], loading: false, error: null, },
		deleteImage: { data: [], loading: false, error: null, },
		DpImage: { image: [], loading: false, error: null },
	},
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(uploadImages.pending, (state) => {
				state.allUploadImages.loading = true
				state.allUploadImages.error = null
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
				state.DpImage.error = null
			})
			.addCase(uploadDpImage.fulfilled, (state, action) => {
				state.DpImage.loading = false;
				state.DpImage.error = null
				state.DpImage.image = action.payload;
			})
			.addCase(uploadDpImage.rejected, (state, action) => {
				state.DpImage.loading = false;
				state.DpImage.error = action.payload || action.error.message;
			})
	}
})

export default userUploadImages.reducer;