

export type UserRole = 'admin' | 'user';
export type UserSource = 'original' | 'google' | 'email_otp';
export interface UserInfo {
  id: number;
  email: string;
  username: string;
  is_active: boolean;
  created_at: string; // ISO 格式的日期字符串
  google_id?: string | null;
  avatar_url?: string | null;
  modules: string[];
  role: string;
  source: string;
  session_quota_seconds: number;
}

export interface CreateUserRequest {
  email: string;
  password: string;
  username: string;
  modules: string[];
  role: string;
}

export interface UpdateUserRequest {
  email?: string;
  username?: string;
  password?: string;
  is_active?: boolean;
  avatar_url?: string | null;
  role?: string;
  modules?: string[];
  session_quota_seconds?: number;
}

export interface QueryUsersParams {
  page: number;
  page_size: number;
  search?: string;
  role?: UserRole;
  is_active?: boolean;
}

export interface UserResponse {
  users: UserInfo[];
  total: number;
  page: number;
  page_size: number;
}
