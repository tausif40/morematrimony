import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import apiClient from '../../api/apiClient';
import { toast } from 'react-hot-toast';
import { encryptData, decryptData } from '../../utils/encryption';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

const refreshToken = Cookies.get('refresh_token');

// Register User
export const registerUser = createAsyncThunk('auth/registerUser', async (userData, thunkAPI) => {
	const encryptedUserData = encryptData(userData);
	const loadingToast = toast.loading('Registering.....');
	try {
		const response = await apiClient.post('/auth/signUp', { encryptedData: encryptedUserData });
		toast.success(("Registration successful!"), { id: loadingToast })
		console.log(response);
		const decryptedData = decryptData(response.data.encryptedData)
		return decryptedData;
		// return response.data;
	} catch (error) {
		console.log(error); 
		toast.error((error.response.data.message || error.message || "Registration failed."), { id: loadingToast })
		return thunkAPI.rejectWithValue(error.response.data);
	}
});

// Login User
export const loginUser = createAsyncThunk('auth/loginUser', async (credentials, thunkAPI) => {
	const encryptedUserData = encryptData(credentials);
	const loadingToast = toast.loading('Logging.....');
	try {
		const response = await apiClient.post('/auth/logIn', { encryptedData: encryptedUserData });
		toast.success(("Login successful!"), { id: loadingToast })
		const decryptedData = decryptData(response.data.encryptedData)
		// window.location.reload(false);
		return decryptedData;
	} catch (error) {
		toast.error((error.response.data.message || error.message || "Login failed."), { id: loadingToast })
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
				state.token = action.payload.tokens.access.token;
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
				state.user = action.payload.user;
				state.token = action.payload.tokens.access.token;
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
			});
	},
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
