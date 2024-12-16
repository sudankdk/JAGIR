import axios from "axios";
import { SERVER_URL } from "../Constants/Constants";

const api = axios.create({
  baseURL: SERVER_URL,
  withCredentials: true,
});

const ENDPOINTS = {
  LOGIN: "/token/",
  REFRESH: "/token/refresh/",
  REGISTER: "/register/",
  USER_PROFILE: (username) => `/user_data/${username}`,
};

// Token refresh interceptor
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        await refresh_token();
        return api(originalRequest);
      } catch (refreshError) {
        console.error(
          "Token refresh failed:",
          refreshError.response?.data || refreshError.message
        );
        window.location.href = "/login";
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

// Login
export const login = async (username, password) => {
  try {
    const response = await api.post(ENDPOINTS.LOGIN, { username, password });
    console.log("Login success:", response.data);
    const data = response.data;

    if (response.data.success === true) {
      localStorage.setItem("accessToken", data.access_token);
      localStorage.setItem("username", username);
    }
    return response.data;
    
  } catch (error) {
    console.error("Login failed:", error.response?.data || error.message);
    throw error;
  }
};

// Token Refresh
const refresh_token = async () => {
  try {
    const response = await api.post(ENDPOINTS.REFRESH);
    console.log("Token refreshed:", response.data);
    return response.data;
  } catch (error) {
    console.error(
      "Token refresh error:",
      error.response?.data || error.message
    );
    throw error;
  }
};

// Register
export const register = async (
  username,
  email,
  firstName,
  lastName,
  password,
  role
) => {
  try {
    const response = await api.post(ENDPOINTS.REGISTER, {
      username,
      email,
      first_name: firstName,
      last_name: lastName,
      password,
      role,
    });
    console.log("Registration successful:", response.data);
    return response.data;
  } catch (error) {
    console.error(
      "Registration failed:",
      error.response?.data || error.message
    );
    throw error;
  }
};

// Get User Profile
export const get_user_profile_data = async (username) => {
  try {
    const token = localStorage.getItem("accessToken");
    const response = await api.get(ENDPOINTS.USER_PROFILE(username),{
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("User profile fetched:", response.data);
    return response.data;
  } catch (error) {
    console.error(
      "Failed to fetch user profile:",
      error.response?.data || error.message
    );
    throw error;
  }
};

export const get_auth = async () => {
  try {
    const response = await api.get(`/authenticated/`);

    return response.data;
  } catch (error) {
    console.error("Failed auth:", error);
    throw error;
  }
};
