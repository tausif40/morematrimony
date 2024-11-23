import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const url = process.env.REACT_APP_API_URL;

export const registerUser = createAsyncThunk("registerUser", async (data, { rejectWithValue }) => {
	try {
		const response = await axios.post(`${url}/auth/signUp`, data)
		console.log(response);
		if (response.status == 201) {
			console.log('register success');
			return response.data;
		}
	} catch (error) {
		// console.log(error);
		return rejectWithValue(error)
	}
})
console.dir(registerUser);

const initialState = {
	currentUser: undefined,
	loading: false,
	error: null,
};

export const RegisterUser = createSlice({
	name: "registerUser",
	initialState,
	extraReducers: (builder) => {
		builder
			.addCase(registerUser.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(registerUser.fulfilled, (state, action) => {
				state.loading = false;
				state.currentUser = action.payload
			})
			.addCase(registerUser.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload
			})
	}
})

export default registerUser.reducer;