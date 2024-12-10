import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import apiClient from '../../api/apiClient';
import { toast } from 'react-hot-toast';
import { encryptData, decryptData } from '../../utils/encryption';

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
	} catch (error) {
		console.log(error);
		toast.error((error.response.data.message || error.message || "Registration failed."), { id: loadingToast })
		return thunkAPI.rejectWithValue(error.response.data);
	}
});

// Login User
export const loginUser = createAsyncThunk('auth/loginUser', async (credentials, thunkAPI) => {
	const encryptedUserData = encryptData(credentials);
	// console.log(credentials);
	// console.log(encryptedUserData);
	const loadingToast = toast.loading('Logging.....');
	try {
		const response = await apiClient.post('/auth/logIn', { encryptedData: encryptedUserData });
		toast.success(("Login successful!"), { id: loadingToast })
		// console.log("Login res - ", response);
		const decryptedData = decryptData(response.data.encryptedData)
		return decryptedData;
	} catch (error) {
		toast.error((error.response.data.message || error.message || "Login failed."), { id: loadingToast })
		return thunkAPI.rejectWithValue(error.response.data);
	}
});

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
			});
	},
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
