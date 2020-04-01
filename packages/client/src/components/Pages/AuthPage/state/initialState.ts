import { AuthPageState } from './interface';

const initialInputState = {
  valid: false,
  visible: true,
  required: false,
  error: false,
  errorMsg: '',
  value: '',
  blurred: false,
};

export const initialState: AuthPageState = {
  inputs: {
    password: initialInputState,
    repeatedEmail: initialInputState,
    email: initialInputState,
    userName: initialInputState,
  },
  isFormValid: false,
};
