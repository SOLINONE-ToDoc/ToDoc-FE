type ConfirmStatus = 'default' | 'error' | 'success';

export const getConfirmStatus = (
  value?: string,
  error?: string,
  isValid?: boolean
): ConfirmStatus => {
  if (!value) return 'default';

  if (isValid) return 'success';

  if (error) return 'error';

  return 'default';
};
