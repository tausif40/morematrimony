import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import apiClient from '../../api/apiClient';
import { toast } from 'react-hot-toast';
import { encryptData, decryptData } from '../../utils/encryption';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

const refreshToken = Cookies.get('refresh_token');

// Register User
export const registerUser = createAsyncThunk('auth/registerUser', async (userData, thunkAPI) => {
	// const encryptedUserData = encryptData(userData);
	const encryptedUserData = userData;
	const loadingToast = toast.loading('Registering.....');
	console.log(userData);
	try {
		const response = await apiClient.post('/auth/signUp', userData);
		toast.success(("Registration successful!"), { id: loadingToast })
		console.log(response);
		// const decryptedData = decryptData(response.data.encryptedData)
		// return decryptedData;
		return response.data;
	} catch (error) {
		console.log(error);
		toast.error((error.response.data.message || error.message || "Registration failed."), { id: loadingToast })
		return thunkAPI.rejectWithValue(error.response.data);
	}
});

// verify Email
export const verifyEmail = createAsyncThunk('auth/verifyEmail', async (data, thunkAPI) => {
	try {
		const response = await apiClient.post('/auth/verify-otp', data);
		return response.data;
	} catch (error) {
		return thunkAPI.rejectWithValue(error.response.data);
	}
});

// Login User
export const loginUser = createAsyncThunk('auth/loginUser', async (credentials, thunkAPI) => {
	// const encryptedUserData = encryptData(credentials);{ encryptedData: encryptedUserData }
	try {
		const response = await apiClient.post('/auth/logIn', credentials);
		console.log(response?.data);
		// const decryptedData = decryptData(response.data.encryptedData)
		// window.location.reload(false);
		return response.data;
	} catch (error) {
		return thunkAPI.rejectWithValue(error.response.data);
	}
});

// LogOut User
export const logOut = createAsyncThunk('auth/logOut', async (_, thunkAPI) => {
	const navigate = useNavigate();
	const loadingToast = toast.loading('wait for LogOut...');
	try {
		const refreshToken = Cookies.get('refresh_token');
		const logoutToken = { refreshToken: refreshToken };
		console.log(logoutToken);
		await apiClient.post('/auth/logout', logoutToken).then((response) => {
			console.log(response);
			toast.success('Logged out successfully.', { id: loadingToast });
			ClearAllCookies();
			navigate('/');
		}).catch((error) => {
			console.log(error);
			toast.error('Failed to log out.', { id: loadingToast });
		});
	} catch (error) {
		console.error('Logout error:', error);
		toast.error(
			error.response?.data?.message || error.message || 'An unexpected error occurred.',
			{ id: loadingToast }
		);
	}
});
function ClearAllCookies() {
	const cookies = Object.keys(Cookies.get());
	cookies.forEach(cookie => {
		Cookies.remove(cookie);
	});
	return null;
}

const authSlice = createSlice({
	name: 'auth',
	initialState: {
		user: null,
		token: null,
		isLoading: false,
		error: null,
		verify: { data: [], loading: false, error: null, },
	},
	reducers: {
		logout: (state) => {
			state.user = null;
			state.token = null;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(registerUser.pending, (state) => {
				state.isLoading = true;
				state.error = null;
			})
			.addCase(registerUser.fulfilled, (state, action) => {
				state.isLoading = false;
				state.user = action.payload.user;
			})
			.addCase(registerUser.rejected, (state, action) => {
				state.isLoading = false;
				state.error = action.payload;
			})
			//login
			.addCase(loginUser.pending, (state) => {
				state.isLoading = true;
				state.error = null;
			})
			.addCase(loginUser.fulfilled, (state, action) => {
				state.isLoading = false;
				state.error = null;
				state.user = action.payload.user;
			})
			.addCase(loginUser.rejected, (state, action) => {
				state.isLoading = false;
				state.error = action.payload;
			})
			//logout 
			.addCase(logOut.fulfilled, (state) => {
				state.user = null;
				state.token = null;
				state.isLoading = false;
				state.error = null;
			})
			.addCase(logOut.rejected, (state, action) => {
				state.isLoading = false;
				// console.log(action.payload);
				state.error = action.payload || 'Failed to log out.';
			})
			.addCase(logOut.pending, (state) => {
				state.isLoading = true;
				state.error = null;
			})

			.addCase(verifyEmail.pending, (state) => {
				state.verify.loading = true;
				state.verify.error = null;
			})
			.addCase(verifyEmail.fulfilled, (action, state) => {
				state.verify.loading = false;
				state.verify.error = null;
				state.verify.data = action.payload;
			})
			.addCase(verifyEmail.rejected, (state, action) => {
				state.verify.loading = false;
				state.verify.error = action.payload || 'Failed to verify email';
			})

	},
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
