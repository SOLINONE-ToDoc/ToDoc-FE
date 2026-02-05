export type UserType = 'PROVIDER' | 'VISITOR';

export interface User {
  userId: number;
  userType: UserType;
  email: string;
  name: string;
  nickname?: string;
}

export interface UserInfo {
  email: string;
  nickname: string;
  role: string;
  userId: number;
}

export interface AuthState {
  accessToken: string | null;
  userInfo: UserInfo | null;
  setAuth: (token: string, userInfo: UserInfo, expiresIn: number) => void;
  clearAuth: () => void;
}
