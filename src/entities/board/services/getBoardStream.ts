const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const getBoardStream = (placeId: number) => {
  const url = `${BASE_URL}/api/boards/${placeId}/stream`;
  const es = new EventSource(url, { withCredentials: true });

  es.addEventListener('connect', (e) => {
    console.log('SSE 연결 성공:', e.data);
  });

  return es;
};
