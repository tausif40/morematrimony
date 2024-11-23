import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const storedToken = Cookies.get('token');
const baseUrl = process.env.REACT_APP_API_URL;

export const submitFormData = createAsyncThunk("form/submitFormData",
  async ({ endpoint, data }, { rejectWithValue }) => {
    try {
      const response = await axios.post(endpoint, data);
      return response.data; // Return data for successful submission
    } catch (error) {
      return rejectWithValue(error.response?.data || "Submission failed");
    }
  }
);

const updateUserProfile = createSlice({
  name: "form",
  initialState: {
    status: "idle", // idle | loading | succeeded | failed
    error: null,
    data: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(submitFormData.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(submitFormData.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(submitFormData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default updateUserProfile.reducer;
