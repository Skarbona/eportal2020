import isEmail from 'validator/lib/isEmail';

import { AuthPageState } from '../components/Pages/AuthPage/state/interface';

export const isFormValidHandler = (inputs: AuthPageState['inputs']) => {
  return Object.values(inputs).every(input => {
    if (!input.visible) return true;
    return input.valid;
  });
};

export const isPasswordValidHandler = (
  password: string,
  blurred: boolean,
): Partial<AuthPageState['inputs']['password']> => {
  let errorMsg = '';

  if (!/^(.*[0-9].*)$/.test(password)) {
    errorMsg = 'Hasło musi zawierać przynajmniej jedną cyfrę';
  } else if (!/^(.*[A-Z].*)$/.test(password)) {
    errorMsg = 'Hasło musi zawierać przynajmniej jedną dużą literę';
  } else if (!/^(.*[a-z].*)$/.test(password)) {
    errorMsg = 'Hasło musi zawierać przynajmniej jedną małą literę';
  } else if (!/^(.{8,})$/.test(password)) {
    errorMsg = 'Hasło musi zawierać przynajmniej 8 znaków';
  } else {
    errorMsg = '';
  }

  return {
    value: password,
    error: errorMsg.length > 0 && blurred,
    valid: errorMsg.length === 0,
    blurred: !!blurred,
    errorMsg,
  };
};

export const isUserNameValidHandler = (userName: string, blurred: boolean) => {
  let errorMsg = '';

  if (!/^(.{4,})$/.test(userName)) {
    errorMsg = 'Nazwa musi mieć przynajmniej 4 litery';
  } else if (/[`~,.<>;':"/[\]|{}()=_+-]/.test(userName)) {
    errorMsg = 'Nazwa nie może zawierać znaków specjalnych';
  } else if (!/^(.{4,20})$/.test(userName)) {
    errorMsg = 'Nazwa nie może być dłuższa niż 20 znaków';
  } else {
    errorMsg = '';
  }

  return {
    value: userName,
    error: errorMsg.length > 0 && blurred,
    valid: errorMsg.length === 0,
    blurred: !!blurred,
    errorMsg: errorMsg || 'Nazwa może być widoczna dla innych użytkowników',
  };
};

export const isEmailValidHandler = (email: string, blurred: boolean) => {
  let errorMsg = '';

  if (!isEmail(email)) {
    errorMsg = 'Podaj poprawny email';
  } else {
    errorMsg = '';
  }

  return {
    value: email,
    error: errorMsg.length > 0 && blurred,
    valid: errorMsg.length === 0,
    blurred: !!blurred,
    errorMsg,
  };
};

export const isRepeatedEmailValidHandler = (email: string, blurred: boolean, mainEmail: string) => {
  let errorMsg = '';

  if (!isEmail(email)) {
    errorMsg = 'Podaj poprawny email';
  } else if (email !== mainEmail) {
    errorMsg = 'Podane emaile się różnią';
  } else {
    errorMsg = '';
  }

  return {
    value: email,
    error: errorMsg.length > 0 && blurred,
    valid: errorMsg.length === 0,
    blurred: !!blurred,
    errorMsg,
  };
};
