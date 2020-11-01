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

export const initialInputArrayState = {
  ...initialInputState,
  value: [] as string[],
};

export const initialState: FormState = {
  inputs: {
    password: initialInputState,
    title: initialInputState,
    message: initialInputState,
    place: initialInputState,
    levels: initialInputState,
    preferences: initialInputArrayState,
    confirmedEmail: initialInputState,
    email: initialInputState,
    userName: initialInputState,
    recaptcha: initialInputState,
    confirmAccountDelete: initialInputState,
    newCategory: initialInputState,
    privacyPolicy: {
      valid: false,
      visible: true,
      required: true,
      value: false,
    },
  },
  isFormValid: false,
};
