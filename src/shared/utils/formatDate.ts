type YYYYMMDD = `${number}.${string}.${string}`;

export const padZero = (num: number | string): string =>
  num.toString().padStart(2, '0');

export const formatDateToYYYYMMDD = (date: string | Date): YYYYMMDD => {
  const d = typeof date === 'string' ? new Date(date) : date;

  const y = d.getFullYear();
  const m = padZero(d.getMonth() + 1);
  const day = padZero(d.getDate());

  return `${y}.${m}.${day}` as YYYYMMDD;
};

export const getTodayFormatted = (): YYYYMMDD => formatDateToYYYYMMDD(new Date());

export const getRelativeVisitText = (visitedAt: string | null | Date): string => {
  if (!visitedAt) return "방문 전";

  const visitDate = typeof visitedAt === 'string' ? new Date(visitedAt) : visitedAt;
  const now = new Date();

  const diffMs = now.getTime() - visitDate.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays <= 7) return '최근 방문';
  if (diffDays < 30) return `${Math.floor(diffDays / 7)}주 전 방문`;
  if (diffDays < 365) return `${Math.floor(diffDays / 30)}달 전 방문`;
  return `${Math.floor(diffDays / 365)}년 전 방문`;
};

export const formatDate = (isoString: string) => {
  const date = new Date(isoString);

  const year = String(date.getFullYear()).slice(-2);
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');

  return `${year}.${month}.${day} ${hours}:${minutes}`;
};
