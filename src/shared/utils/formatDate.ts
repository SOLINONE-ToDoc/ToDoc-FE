type YYYYMMDD = `${number}.${number}.${number}`;

export const formatDateToYYYYMMDD = (date: string | Date): YYYYMMDD => {
  const d = typeof date === 'string' ? new Date(date) : date;
  const y = d.getFullYear();
  const m = d.getMonth() + 1;
  const day = d.getDate();

  return `${y}.${m}.${day}` as YYYYMMDD;
};
