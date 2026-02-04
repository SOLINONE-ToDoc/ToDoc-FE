export const formatBusinessNumber = (value: string) => {
  const digits = value.replace(/\D/g, '');

  if (digits.length <= 3) return digits;
  if (digits.length <= 5) return `${digits.slice(0, 3)}-${digits.slice(3)}`;
  if (digits.length <= 10) return `${digits.slice(0, 3)}-${digits.slice(3, 5)}-${digits.slice(5)}`;

  return `${digits.slice(0, 3)}-${digits.slice(3, 5)}-${digits.slice(5, 10)}`;
};
