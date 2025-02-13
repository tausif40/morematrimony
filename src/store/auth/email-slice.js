import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import apiClient from '../../api/apiClient';

// verify otp
export const verifyEmailOTP = createAsyncThunk('email/verifyEmailOTP', async (data, thunkAPI) => {
	console.log(data);
	try {
		const response = await apiClient.post('/auth/verify-otp', data);
		console.log(response.data);
		return response.data;
	} catch (error) {
		return thunkAPI.rejectWithValue(error.response.data);
	}
});
// resend Email
export const resendEmailOTP = createAsyncThunk('email/resendEmailOTP', async (data, thunkAPI) => {
	try {
		const response = await apiClient.post('/auth/resend-email-otp', data);
		console.log(response.data);
		return response.data;
	} catch (error) {
		return thunkAPI.rejectWithValue(error.response.data);
	}
});

const emailSlice = createSlice({
	name: 'email',
	initialState: {
		verifyEmail: { data: [], loading: false, error: null, },
		resendEmail: { data: [], loading: false, error: null, },
	},
	reducers: {},
	extraReducers: (builder) => {
		builder
			// verifyEmailOTP
			.addCase(verifyEmailOTP.pending, (state) => {
				state.verifyEmail.loading = true;
				state.verifyEmail.error = null;
			})
			.addCase(verifyEmailOTP.fulfilled, (state, action) => {
				state.verifyEmail.loading = false;
				state.verifyEmail.error = null;
				state.verifyEmail.data = action.payload;
			})
			.addCase(verifyEmailOTP.rejected, (state, action) => {
				state.verifyEmail.loading = false;
				state.verifyEmail.error = action.payload || 'Failed to verify email';
			})
			// resendEmailOTP
			.addCase(resendEmailOTP.pending, (state) => {
				state.resendEmail.loading = true;
				state.resendEmail.error = null;
			})
			.addCase(resendEmailOTP.fulfilled, (state, action) => {
				state.resendEmail.loading = false;
				state.resendEmail.error = null;
				state.resendEmail.data = action.payload;
			})
			.addCase(resendEmailOTP.rejected, (state, action) => {
				state.resendEmail.loading = false;
				state.resendEmail.error = action.payload || 'Failed to verify email';
			})

	},
});

export default emailSlice.reducer;
