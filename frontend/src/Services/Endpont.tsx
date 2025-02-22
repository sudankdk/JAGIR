import axios from "axios";

import { SERVER_URL } from "./Server";
import { useEffect } from "react";

const BASE_URL = SERVER_URL;

const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

const useAxiosInterceptors = () => {
  useEffect(() => {
    const requestInterceptors = api.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem("token");
        if (token) {
          config.headers.authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    const responseInterceptors = api.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401) {
          window.location.href = "/login";
        }
        return Promise.reject(error);
      }
    );
    return () => {
      axios.interceptors.request.eject(requestInterceptors);
      axios.interceptors.response.eject(responseInterceptors);
    };
  }, []);
};

export const login = async (username: string, password: string) => {
  try {
    const response = await api.post("/login/", { username, password });
    const data = response.data;
    if (data.success === true) {
      localStorage.setItem("accessToken", data.access_token);
      localStorage.setItem("username", username);
    }
    return response.data;
  } catch (error) {
    console.log("Login failed");
    console.log(error);
  }
};

