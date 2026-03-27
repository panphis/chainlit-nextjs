import { UserInfo } from "./user";
// 认证相关类型定义
export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  access_token: string; // Backend returns this but we don't use it (NextAuth generates its own token)
  token_type: string;
  user: UserInfo;
}

export interface UserLoginInfo {
  id: number;
  email: string;
  username?: string | null;
  source?: string | null;
  is_active?: boolean | null;
  google_id?: string | null;
  avatar_url?: string | null;
  role?: "admin" | "user";
}


export interface VerifyUserResponse {
  code: number;
  msg: string;
  data: UserLoginInfo;
}

export interface NextAuthUser {
  id: number | string; // 用户 ID 为 number 类型
  name?: string | null;
  email?: string | null;
  image?: string | null;
  username?: string | null;
  is_active?: boolean | null;
  google_id?: string | null;
  avatar_url?: string | null;
  role?: "admin" | "user";
}

// NextAuth 会话类型扩展
export interface NextAuthSession {
  user: NextAuthUser;
  expires: string;
}

export type AuthenticatedUser = NextAuthUser;

export interface GoogleAuthUrlResponse {
  authUrl: string;
}



export interface GoogleTokenRequest {
  code: string;
}
export interface GoogleTokenResponse {
  access_token: string;
  expires_in: number;
  refresh_token: string;
  scope: string;
  token_type: string;
}

export interface GoogleUserInfoResponse {
  id: string;
  email: string;
  verified_email: boolean;
  name: string;
  given_name: string;
  family_name: string;
  picture: string;
  locale: string;
}

export interface UserWithTokenResponse {
  user: NextAuthUser;
  verificationToken: string;
}
