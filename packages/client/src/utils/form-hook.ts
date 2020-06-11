import isEmail from 'validator/lib/isEmail';
import i18n from '../settings/translation-settings';

import { FormState, InputKeys, InputState } from '../hooks/form/state/interface';
import { initialInputState } from '../hooks/form/state/initialState';

interface ValidateByKeyProps {
  inputKey: InputKeys;
  value: string;
  blurred: boolean;
  oldState: Partial<FormState>;
}

export const isFormValidHandler = (inputs: Partial<FormState['inputs']>): boolean => {
  return Object.values(inputs).every((input) => {
    if (!input.visible) return true;
    return input.valid;
  });
};

export const isPasswordValidHandler = (password: string, blurred: boolean): Partial<InputState> => {
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

export const messageValidHandler = (message: string, blurred: boolean): Partial<InputState> => {
  let errorMsg = '';

  if (!/^(.{4,})$/.test(message)) {
    errorMsg = i18n.t('Message must include at least 4 characters');
  } else if (/[`~,.<>;':"/[\]|{}()=_+-]/.test(message)) {
    errorMsg = i18n.t('Message cannot include some of special characters');
  } else {
    errorMsg = '';
  }

  return {
    value: message,
    error: errorMsg.length > 0 && blurred,
    valid: errorMsg.length === 0,
    blurred: !!blurred,
    errorMsg,
  };
};

export const isUserNameValidHandler = (userName: string, blurred: boolean): Partial<InputState> => {
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

export const isEmailValidHandler = (email: string, blurred: boolean): Partial<InputState> => {
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
): Partial<InputState> => {
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

export const isRecaptchaValidHandler = (recaptcha: string): Partial<InputState> => ({
  valid: recaptcha?.length > 0,
  value: recaptcha,
});

export const setVisibleInputsHandler = (
  inputs: Partial<FormState['inputs']>,
  inputKeys: InputKeys[],
): Partial<FormState['inputs']> =>
  Object.entries(inputs).reduce((result, input) => {
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
  }, {} as FormState['inputs']);

export const setInitialInputsHandler = (
  inputs: Partial<FormState['inputs']>,
  inputKeys: InputKeys[],
): Partial<FormState['inputs']> =>
  Object.entries(inputs).reduce((result, input) => {
    if (inputKeys.includes(input[0] as InputKeys)) {
      return {
        ...result,
        [input[0]]: input[1],
      };
    }
    return result;
  }, {} as FormState['inputs']);

export const validateByKey = ({
  inputKey,
  value,
  blurred = false,
  oldState,
}: ValidateByKeyProps): Partial<InputState> => {
  switch (inputKey) {
    case InputKeys.Email:
      return isEmailValidHandler(value, blurred);
    case InputKeys.Password:
      return isPasswordValidHandler(value, blurred);
    case InputKeys.Username:
      return isUserNameValidHandler(value, blurred);
    case InputKeys.ConfirmedEmail:
      return isConfirmedEmailValidHandler(value, blurred, oldState.inputs.email.value);
    case InputKeys.Recaptcha:
      return isRecaptchaValidHandler(value);
    case InputKeys.Message:
      return messageValidHandler(value, blurred);
    default:
      return initialInputState;
  }
};
