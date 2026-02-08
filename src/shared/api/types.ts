export interface ApiSuccessResponse<T> {
  status: 'SUCCESS';
  data: T;
  message?: string;
}

export interface ApiErrorResponse {
  httpStatus: string;
  errorCode: string;
  message: string;
}

export type ApiResponse<T> = ApiSuccessResponse<T> | ApiErrorResponse;
