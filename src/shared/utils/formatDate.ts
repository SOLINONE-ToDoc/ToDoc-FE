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
