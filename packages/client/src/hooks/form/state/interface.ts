export interface InputState {
  valid: boolean;
  visible: boolean;
  required: boolean;
  error: boolean;
  errorMsg: string;
  value: string;
  blurred: boolean;
}

export interface CheckBoxState {
  value: boolean;
  valid: boolean;
  visible: boolean;
  required: boolean;
}

export interface FormState {
  inputs: {
    password?: InputState;
    confirmedEmail?: InputState;
    email?: InputState;
    userName?: InputState;
    message?: InputState;
    recaptcha?: InputState;
    confirmAccountDelete?: InputState;
    privacyPolicy?: CheckBoxState;
  };
  isFormValid: boolean;
}

export enum FormActionsEnum {
  InputChanged = 'INPUT_CHANGED',
  CheckBoxChanged = 'CHECKBOX_CHANGED',
  SetVisibleInputs = 'SET_VISIBLE_INPUTS',
  RecaptchaChanged = 'RECAPTCHA_CHANGED',
  ConfirmAccountDeleteChanged = 'CONFIRM_ACCOUNT_DELETE_CHANGED',
}

export enum InputKeys {
  'Password' = 'password',
  'Username' = 'userName',
  'Message' = 'message',
  'ConfirmedEmail' = 'confirmedEmail',
  'Email' = 'email',
  'Recaptcha' = 'recaptcha',
  'ConfirmAccountDelete' = 'confirmAccountDelete',
  'PrivacyPolicy' = 'privacyPolicy',
}
export interface CheckBoxChanged {
  type: FormActionsEnum.CheckBoxChanged;
  data: {
    inputKey: InputKeys;
    value: boolean;
  };
}

export interface InputChanged {
  type: FormActionsEnum.InputChanged;
  data: {
    inputKey: InputKeys;
    value: string;
    blurred: boolean;
  };
}

export interface SetVisibleInputs {
  type: FormActionsEnum.SetVisibleInputs;
  data: {
    inputKeys: InputKeys[];
  };
}

export interface ConfirmAccountDeleteChanged {
  type: FormActionsEnum.ConfirmAccountDeleteChanged;
  data: {
    value: string;
    userEmail: string;
  };
}

export interface RecaptchaChanged {
  type: FormActionsEnum.RecaptchaChanged;
  data: {
    value: string;
  };
}

export type FormActions =
  | SetVisibleInputs
  | RecaptchaChanged
  | InputChanged
  | CheckBoxChanged
  | ConfirmAccountDeleteChanged;
