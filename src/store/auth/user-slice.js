import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Base URL for API requests (can be set using environment variables)
const BASE_URL = process.env.REACT_APP_API_URL;
// Token retrieval from cookies (optional if needed)
const getToken = () => {
	const match = document.cookie.match(new RegExp('(^| )access_token=([^;]+)'));
	return match ? match[ 2 ] : null;
};

// Async Thunks for Register, Login, and Logout
export const registerUser = createAsyncThunk(
	'user/register',
	async (userData, { rejectWithValue }) => {
		try {
			const response = await axios.post(`${BASE_URL}/auth/signUp`, userData);
			return response.data;
		} catch (error) {
			return rejectWithValue(error.response?.data || 'Registration failed');
		}
	}
);

export const loginUser = createAsyncThunk(
	'user/login',
	async (credentials, { rejectWithValue }) => {
		try {
			const response = await axios.post(`${BASE_URL}/auth/logIn`, credentials);
			document.cookie = `access_token=${response.data.token}; path=/`;
			return response.data;
		} catch (error) {
			return rejectWithValue(error.response?.data || 'Login failed');
		}
	}
);

export const logoutUser = createAsyncThunk('user/logout', async (_, { rejectWithValue }) => {
	try {
		document.cookie = 'access_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
		return true;
	} catch (error) {
		return rejectWithValue('Logout failed');
	}
});

// User Slice
const userSlice = createSlice({
	name: 'user',
	initialState: {
		user: null,
		token: null,
		loading: false,
		error: null,
	},
	reducers: {},
	extraReducers: (builder) => {
		builder
			// Register
			.addCase(registerUser.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(registerUser.fulfilled, (state, action) => {
				state.loading = false;
				state.user = action.payload.user;
				state.token = action.payload.token;
			})
			.addCase(registerUser.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload;
			})
			// Login
			.addCase(loginUser.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(loginUser.fulfilled, (state, action) => {
				state.loading = false;
				state.user = action.payload.user;
				state.token = action.payload.token;
			})
			.addCase(loginUser.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload;
			})
			// Logout
			.addCase(logoutUser.pending, (state) => {
				state.loading = true;
			})
			.addCase(logoutUser.fulfilled, (state) => {
				state.loading = false;
				state.user = null;
				state.token = null;
			})
			.addCase(logoutUser.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload;
			});
	},
});

// Export Actions and Reducer
export const { resetError } = userSlice.actions;
export default userSlice.reducer;
