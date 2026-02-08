import Cookies from 'js-cookie';
import type { ApiSuccessResponse, ApiErrorResponse} from './types';

export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

export async function request<T>(path: string, method: HttpMethod, body?: unknown): Promise<ApiSuccessResponse<T>> {
  const baseUrl = import.meta.env.VITE_API_BASE_URL;
  const url = `${baseUrl}${path}`;

  const token = Cookies.get('accessToken');
  const headers: HeadersInit = { 'Content-Type': 'application/json' };
  if (token) headers['Authorization'] = `Bearer ${token}`;

  const res = await fetch(url, { method, headers, body: body ? JSON.stringify(body) : undefined });

  if (!res.ok) {
    if (res.status === 401) {
      Cookies.remove('accessToken');
      Cookies.remove('userInfo');

      alert('잠시 세션이 끊겼어요. 계속 토독을 즐기려면 로그인해 주세요.');
      window.location.href = '/';
      return {} as ApiSuccessResponse<T>;
    }

    const errorData: ApiErrorResponse = await res.json().catch(() => ({ httpStatus: res.status + '', errorCode: '', message: '알 수 없는 오류가 발생했어요' }));
    throw new Error(errorData.message);
  }

  if (res.status === 204) return {} as ApiSuccessResponse<T>;

  const json: ApiSuccessResponse<T> = await res.json();
  if (json.status !== 'SUCCESS') throw new Error(json.message ?? '현재 접속자가 많아 처리가 지연되고 있습니다.');
  return json;
}
