export type UserType = 'PROVIDER' | 'VISITOR';

export interface User {
  userId: number;
  userType: UserType;
  email: string;
  name: string;
  nickname?: string;
}
