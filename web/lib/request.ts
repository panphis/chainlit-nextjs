"use server";

import axios from "axios";
import { NEXT_PUBLIC_API_URL } from "./constants";
import { auth } from "@/auth";

export const request = axios.create({
  baseURL: NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

request.interceptors.request.use(
  async (config) => {
    const session = await auth();
    if (session) {
      const userId = session?.user?.id
      // todo 
      // add token to headers for backend authentication
      config.headers['X-User-ID'] = userId;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// response interceptor
request.interceptors.response.use(
  (response) => response,
  (error) => {
    return Promise.reject(error);
  }
);
