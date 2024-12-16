// src/redux/authSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { get_auth, login } from "../api/EndPoints";

// Thunk for checking auth
export const checkAuth = createAsyncThunk(
  "auth/checkAuth",
  async (_, thunkAPI) => {
    try {
      await get_auth();
      return true;
    } catch (error) {
      console.error("Error checking auth:", error);
      return thunkAPI.rejectWithValue(false);
    }
  }
);

// Thunk for login
export const authLogin = createAsyncThunk(
  "auth/authLogin",
  async ({ username, password }, thunkAPI) => {
    try {
      const data = await login(username, password);
      if (data.success) {
        return username;
      } else {
        return thunkAPI.rejectWithValue("Invalid login credentials");
      }
    } catch (error) {
      console.error("Error logging in:", error);
      return thunkAPI.rejectWithValue("An error occurred during login");
    }
  }
);

// Slice definition
const authSlice = createSlice({
  name: "auth",
  initialState: {
    isAuthenticated: false,
    loading: false,
    username: "",
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.isAuthenticated = false;
      state.username = "";
    },
  },
  extraReducers: (builder) => {
    builder
      // Handle checkAuth
      .addCase(checkAuth.pending, (state) => {
        state.loading = true;
      })
      .addCase(checkAuth.fulfilled, (state) => {
        state.isAuthenticated = true;
        state.loading = false;
      })
      .addCase(checkAuth.rejected, (state) => {
        state.isAuthenticated = false;
        state.loading = false;
      })

      // Handle authLogin
      .addCase(authLogin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(authLogin.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.username = action.payload;
        state.loading = false;
      })
      .addCase(authLogin.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
