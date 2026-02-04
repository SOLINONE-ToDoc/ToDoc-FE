import type { SignUpFormData, SignUpErrors } from '../model/types';
import { VALIDATION_MESSAGES, PASSWORD_ERROR_MESSAGES } from '../constants/messages';

const EMAIL_REGEX = /\S+@\S+\.\S+/;
const PASSWORD_REGEX = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{1,12}$/;
const BUSINESS_REGEX = /^\d{3}-\d{2}-\d{5}$/;

export const useSignUpValidation = <T extends SignUpFormData>(formData: T) => {
  let emailError: string | undefined;
  if (formData.email && !EMAIL_REGEX.test(formData.email)) {
    emailError = VALIDATION_MESSAGES.EMAIL.INVALID;
  }

  let passwordError: string | undefined;
  if (formData.password && !PASSWORD_REGEX.test(formData.password)) {
    passwordError = PASSWORD_ERROR_MESSAGES.INVALID_FORMAT;
  }

  let passwordConfirmError: string | undefined;
  if (formData.passwordConfirm && formData.password !== formData.passwordConfirm) {
    passwordConfirmError = PASSWORD_ERROR_MESSAGES.NOT_MATCH;
  }

  let businessError: string | undefined;
  if ('businessNumber' in formData && formData.businessNumber) {
    if (!BUSINESS_REGEX.test(formData.businessNumber as string)) {
      businessError = VALIDATION_MESSAGES.BUSINESS.INVALID;
    }
  }

  const errors: SignUpErrors<T> = {
    email: emailError,
    ...( 'password' in formData ? { password: passwordError } : {} ),
    ...( 'passwordConfirm' in formData ? { passwordConfirm: passwordError || passwordConfirmError } : {} ),
    ...( 'businessNumber' in formData ? { businessNumber: businessError } : {} ),
  } as SignUpErrors<T>;

  const hasRequiredFields = !!(formData.email && formData.password);
  const hasNoErrors = !emailError && !passwordError && !passwordConfirmError;

  return {
    errors,
    isValid: hasRequiredFields && hasNoErrors,
  };
};
