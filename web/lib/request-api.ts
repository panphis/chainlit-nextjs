"use client";

import axios from "axios";
import { BASE_PATH } from "./constants";
import { HttpStatus } from "./enum";


export const fetchApi = axios.create({
  baseURL: BASE_PATH,
  headers: {
    "Content-Type": "application/json",
  },
});

fetchApi.interceptors.request.use(
  async (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

fetchApi.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const { status } = error.response;
    if (status === HttpStatus.UNAUTHORIZED) {
      if (typeof window !== "undefined") {
        const basePath = BASE_PATH ? `${BASE_PATH}/login` : "/login";
        window.location.href = basePath;
      }
      return Promise.reject(error);
    }
    return Promise.reject(error);
  }
);
