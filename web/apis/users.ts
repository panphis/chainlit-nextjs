import { fetchApi } from "@/lib/request-api";
import { AxiosResponse } from "axios";
import { GoogleAuthUrlResponse, UserWithTokenResponse } from "../types";


export async function getApiGoogleAuthUrl(): Promise<AxiosResponse<GoogleAuthUrlResponse>> {
  return fetchApi.get<GoogleAuthUrlResponse>("/api/google/authorize");
}

export async function getApiGoogleUserInfo(code: string): Promise<AxiosResponse<UserWithTokenResponse>> {
  return fetchApi.get<UserWithTokenResponse>("/api/google/auth", {
    params: {
      code,
    },
  });
}
