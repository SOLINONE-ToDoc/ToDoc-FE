export interface LoginRequest {
  email: string;
  password: string;
}

export type EmailDuplicateStatus = 'idle' | 'checking' | 'duplicated' | 'available';

export interface VisitorSignUpRequest {
  userType: 'VISITOR';
  nickname: string;
  email: string;
  password: string;
  passwordConfirm: string;
}

export interface ProviderSignUpRequest {
  userType: 'PROVIDER';
  name: string;
  placeName: string;
  businessNumber: string;
  openedAt: string;
  address: string;
  nickname: string;
  email: string;
  password: string;
  passwordConfirm: string;
}

export type SignUpFormData = VisitorSignUpRequest | ProviderSignUpRequest;

export type SignUpErrors = Partial<Record<keyof ProviderSignUpRequest, string>>;
