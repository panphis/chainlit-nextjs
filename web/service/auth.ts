import { request } from "@/lib/request";
import type {
  LoginRequest, 
  VerifyUserResponse,
} from "@/types/auth";
import { AxiosResponse } from "axios";

export async function login(
  data: LoginRequest
): Promise<AxiosResponse<VerifyUserResponse>> {
  const response = await request.post<VerifyUserResponse>(
    "/users/verify",
    data
  );
  return response;
}
 