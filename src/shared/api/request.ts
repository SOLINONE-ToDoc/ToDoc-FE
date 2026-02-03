import type { ApiResponse } from './types'

export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

export async function request<T>(
  path: string,
  method: HttpMethod,
  body?: unknown
): Promise<T> {
  const baseUrl = import.meta.env.VITE_API_BASE_URL;
  const url = `${baseUrl}${path}`;

  const res = await fetch(url, {
    method,
    headers: { 'Content-Type': 'application/json' },
    body: body ? JSON.stringify(body) : undefined,
  });

  if (!res.ok) {
    const errorData = (await res.json().catch(() => ({}))) as {
      message?: string;
      errorCode?: string;
    };
    throw new Error(errorData.message || `HTTP error! status: ${res.status}`);
  }

  if (res.status === 204) return {} as T;

  const response: ApiResponse<T> = await res.json();
  return response.data;
}
