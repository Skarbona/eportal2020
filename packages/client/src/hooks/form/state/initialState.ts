import { FormState } from './interface';

export const initialInputState = {
  valid: false,
  visible: true,
  required: false,
  error: false,
  errorMsg: '',
  value: '',
  blurred: false,
};

export const initialState: FormState = {
  inputs: {
    password: initialInputState,
    confirmedEmail: initialInputState,
    email: initialInputState,
    userName: initialInputState,
    recaptcha: initialInputState,
    confirmAccountDelete: initialInputState,
    privacyPolicy: {
      valid: false,
      visible: true,
      required: false,
      value: false,
    },
  },
  isFormValid: false,
};
