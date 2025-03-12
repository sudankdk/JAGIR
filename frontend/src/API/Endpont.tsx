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
        const token = localStorage.getItem("accessToken");
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
      api.interceptors.request.eject(requestInterceptors);
      api.interceptors.response.eject(responseInterceptors);
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

export const register = async (
  username: string,
  password: string,
  email: string,
  role: string
) => {
  try {
    console.log("hello");
    const response = await api.post("/register/", {
      username,
      password,
      email,
      role,
    });
    return response;
  } catch (error) {
    console.log("registration error", error);
    throw error;
  }
};

export const allJobs = async () => {
  try {
    // const token = localStorage.getItem("accessToken");

    const response = await api.get("/job/");

    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const savedJobs = async () => {
  try {
    const token = localStorage.getItem("accessToken");
    if (token) {
      const response = await api.get("/saved/jobs/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    }
  } catch (error) {
    console.log(error);
  }
};

export const Search_by_location_name = async (
  jobname: string,
  location: string
) => {
  try {
    console.log(location, jobname);
    const response = await api.get(`/search/job/${jobname}/${location}/`);
    console.log(response);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const applyJob = async (id: string, cv: File) => {
  try {
    const token = localStorage.getItem("accessToken");
    console.log(token);
    if (token) {
      const formData = new FormData();
      formData.append("cv", cv);
      const response = await api.post(`/job/apply/${id}/`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(response);
      return response.data;
    }
  } catch (error) {
    console.log("error in applying to job: ", error);
  }
};


export const userInfo= async()=>{
  const token = localStorage.getItem("accessToken");

  try {
    if(token){
      const response = await api.get("/user/",{
        headers: {
          Authorization: `Bearer ${token}`,
        }});
    return response.data
    }
    
  } catch (error) {
    console.log(error)
  }
}

export default useAxiosInterceptors;

// path('search/job/location/<str:location>/',search_job_by_location,name="search-job-location"),
// path('search/job/<str:jobname>/',search_job_by_jobname,name="search-job-jobname"),
// path('search/job/<str:jobname>/<str:location>/',Search_by_location_name,name="search-location-name"),
