import isEmail from 'validator/lib/isEmail';
import i18n from '../settings/translation-settings';

import { AuthPageState, InputKeys } from '../components/Pages/AuthPage/state/interface';
import { initialState } from '../components/Pages/AuthPage/state/initialState';

export const isFormValidHandler = (inputs: AuthPageState['inputs']): boolean => {
  return Object.values(inputs).every((input) => {
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
    errorMsg = i18n.t('Password must include at least one number');
  } else if (!/^(.*[A-Z].*)$/.test(password)) {
    errorMsg = i18n.t('Password must include at least one big letter');
  } else if (!/^(.*[a-z].*)$/.test(password)) {
    errorMsg = i18n.t('Password must include at least one small letter');
  } else if (!/^(.{8,})$/.test(password)) {
    errorMsg = i18n.t('Password must include at least 8 characters');
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

export const isUserNameValidHandler = (
  userName: string,
  blurred: boolean,
): Partial<AuthPageState['inputs']['userName']> => {
  let errorMsg = '';

  if (!/^(.{4,})$/.test(userName)) {
    errorMsg = i18n.t('Username must include at least 4 characters');
  } else if (/[`~,.<>;':"/[\]|{}()=_+-]/.test(userName)) {
    errorMsg = i18n.t('Username cannot include some of special characters');
  } else if (!/^(.{4,20})$/.test(userName)) {
    errorMsg = i18n.t('Username must include less then 20 characters');
  } else {
    errorMsg = '';
  }

  return {
    value: userName,
    error: errorMsg.length > 0 && blurred,
    valid: errorMsg.length === 0,
    blurred: !!blurred,
    errorMsg: errorMsg || i18n.t('Username can be visible for all users'),
  };
};

export const isEmailValidHandler = (
  email: string,
  blurred: boolean,
): Partial<AuthPageState['inputs']['email']> => {
  let errorMsg = '';

  if (!isEmail(email)) {
    errorMsg = i18n.t('Provide valid email');
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

export const isConfirmedEmailValidHandler = (
  email: string,
  blurred: boolean,
  mainEmail: string,
): Partial<AuthPageState['inputs']['confirmedEmail']> => {
  let errorMsg = '';

  if (!isEmail(email)) {
    errorMsg = i18n.t('Provide valid email');
  } else if (email !== mainEmail) {
    errorMsg = i18n.t('Emails must be the same');
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

export const setVisibleInputsHandler = (
  state: AuthPageState,
  inputKeys: InputKeys[],
): AuthPageState['inputs'] =>
  Object.entries(state.inputs).reduce((result, input) => {
    if (inputKeys.includes(input[0] as InputKeys)) {
      return {
        ...result,
        [input[0]]: {
          ...input[1],
          visible: true,
        },
      };
    }
    return {
      ...result,
      [input[0]]: { ...input[1], visible: false },
    };
  }, initialState.inputs);
