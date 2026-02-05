import Cookies from 'js-cookie';
import type { ApiResponse } from './types';

export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

export async function request<T>(
  path: string,
  method: HttpMethod,
  body?: unknown
): Promise<T> {
  const baseUrl = import.meta.env.VITE_API_BASE_URL;
  const url = `${baseUrl}${path}`;

  const token = Cookies.get('accessToken');

  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const res = await fetch(url, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });

  if (!res.ok) {
    if (res.status === 401) {
      Cookies.remove('accessToken');
      Cookies.remove('userInfo');

      alert('잠시 세션이 끊겼어요. 계속 토독을 즐기려면 로그인해 주세요.');
      window.location.href = '/';

      return {} as T;
    }

    const errorData = (await res.json().catch(() => ({}))) as {
      message?: string;
    };
    throw new Error(errorData.message || `HTTP error! status: ${res.status}`);
  }

  if (res.status === 204) return {} as T;

  const response: ApiResponse<T> = await res.json();
  return response.data;
}
