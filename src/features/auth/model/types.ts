import type { UserType } from '@/entities/user';

export interface LoginRequest {
  email: string;
  password: string;
  userType: UserType;
}
