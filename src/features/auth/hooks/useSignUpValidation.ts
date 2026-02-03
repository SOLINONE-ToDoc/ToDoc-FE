import type { SignUpFormData, SignUpErrors } from '../model/types';
import { EMAIL_ERROR_MESSAGES, PASSWORD_ERROR_MESSAGES } from '../constants/messages';

const EMAIL_REGEX = /\S+@\S+\.\S+/;
const PASSWORD_REGEX = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{1,12}$/;

export const useSignUpValidation = (formData: SignUpFormData) => {
  let emailError: string | undefined;
  if (formData.email && !EMAIL_REGEX.test(formData.email)) {
    emailError = EMAIL_ERROR_MESSAGES.INVALID_FORMAT;
  }

  let passwordError: string | undefined;
  if (formData.password && !PASSWORD_REGEX.test(formData.password)) {
    passwordError = PASSWORD_ERROR_MESSAGES.INVALID_FORMAT;
  }

  let passwordConfirmError: string | undefined;
  if (formData.passwordConfirm && formData.password !== formData.passwordConfirm) {
    passwordConfirmError = PASSWORD_ERROR_MESSAGES.NOT_MATCH;
  }

  const errors: SignUpErrors = {
  email: emailError,
  password: passwordError,
  passwordConfirm: passwordError || passwordConfirmError,
};

  const hasRequiredFields = !!(formData.email && formData.password);
  const hasNoErrors = !emailError && !passwordError && !passwordConfirmError;

  return {
    errors,
    isValid: hasRequiredFields && hasNoErrors,
  };
};
