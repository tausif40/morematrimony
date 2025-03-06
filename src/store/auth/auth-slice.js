import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import apiClient from '../../lib/apiClient';
import { toast } from 'react-hot-toast';
import { encryptData, decryptData } from '../../lib/encryption';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

const refreshToken = Cookies.get('refresh_token');

// Register User
export const registerUser = createAsyncThunk('auth/registerUser', async (userData, thunkAPI) => {
	// const encryptedUserData = encryptData(userData);
	const encryptedUserData = userData;

	console.log(userData);
	try {
		const response = await apiClient.post('/auth/signUp', userData);
		// const decryptedData = decryptData(response.data.encryptedData)
		// return decryptedData;
		console.log(response);
		if (response?.status === 201 || response?.status === 200) return response.data;

	} catch (error) {
		console.log(error);
		return thunkAPI.rejectWithValue(error.response.data);
	}
});

// Login User
export const loginUser = createAsyncThunk('auth/loginUser', async (credentials, thunkAPI) => {
	// const encryptedUserData = encryptData(credentials);{ encryptedData: encryptedUserData }
	try {
		const response = await apiClient.post('/auth/logIn', credentials);
		// const decryptedData = decryptData(response.data.encryptedData)
		// window.location.reload(false);
		return response.data;
	} catch (error) {
		console.log(error);
		return thunkAPI.rejectWithValue(error.response.data);
	}
});

// Login User
export const changePassword = createAsyncThunk('auth/changePassword', async (password, thunkAPI) => {
	try {
		const response = await apiClient.post('/auth/change-password', password);
		return response.data;
	} catch (error) {
		console.log(error);
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
	},
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
