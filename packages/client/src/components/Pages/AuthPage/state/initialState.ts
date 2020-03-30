import { AuthPageState } from './interface';

const basicInputState = {
  valid: false,
  visible: false,
  required: false,
  error: false,
  errorMsg: '',
  value: '',
  blurred: false,
};

export const initialState: AuthPageState = {
  inputs: {
    password: basicInputState,
    repeatedEmail: basicInputState,
    email: basicInputState,
    userName: basicInputState,
  },
  isFormValid: false,
};
