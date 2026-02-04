export interface LoginRequest {
  email: string;
  password: string;
}

export type ValidationStatus = 'idle' | 'checking' | 'available' | 'duplicated' | 'unavailable';

export interface VisitorSignUpRequest {
  userType: 'VISITOR';
  nickname: string;
  email: string;
  password: string;
  passwordConfirm: string;
}

export interface BusinessVerifyResponse {
  businessNumber: string;
  valid: boolean;
  message: string;
}

export type PlaceType = 'RESTAURANT' | 'CAFE' | 'OTHER';

export interface ProviderSignUpRequest {
  userType: 'PROVIDER';
  name: string;
  placeName: string;
  businessNumber: string;
  openedAt: `${number}.${number}.${number}` | '';
  address: string;
  nickname: string;
  email: string;
  password: string;
  passwordConfirm: string;
  placeType: PlaceType;
  latitude: number;
  longitude: number;
}

export type SignUpFormData = VisitorSignUpRequest | ProviderSignUpRequest;

export type ProviderSignUpPayload = Omit<ProviderSignUpRequest, 'userType' | 'passwordConfirm'>;

export type VisitorSignUpPayload = Pick<VisitorSignUpRequest, 'nickname' | 'email' | 'password'>;

export type SignUpErrors<T> = Partial<Record<keyof T, string>>;
