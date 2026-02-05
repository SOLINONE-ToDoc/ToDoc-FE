import type { PlaceType } from "@/entities/place";

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
  zoneCode: string;
  placeType: PlaceType;
  latitude: string;
  longitude: string;
}

export type SignUpFormData = VisitorSignUpRequest | ProviderSignUpRequest;

export type ProviderSignUpPayload = Omit<ProviderSignUpRequest, 'userType' | 'passwordConfirm'>;

export type VisitorSignUpPayload = Pick<VisitorSignUpRequest, 'nickname' | 'email' | 'password'>;

export type SignUpErrors<T> = Partial<Record<keyof T, string>>;
