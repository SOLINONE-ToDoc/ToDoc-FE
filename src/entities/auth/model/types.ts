import type { VisitorLoginResponse, ProviderLoginResponse } from '@/features/auth';

export type UserInfo =
  | Omit<VisitorLoginResponse, 'accessToken' | 'expiresIn'>
  | Omit<ProviderLoginResponse, 'accessToken' | 'expiresIn'>;

export interface AuthState {
  accessToken: string | null;
  userInfo: UserInfo | null;
  setAuth: (
    token: string,
    userInfo: UserInfo,
    expiresIn: number
  ) => void;
  clearAuth: () => void;
}
