export interface InputState {
  valid: boolean;
  visible: boolean;
  required: boolean;
  error: boolean;
  errorMsg: string;
  value: string;
  blurred: boolean;
}

export interface FormState {
  inputs: {
    password?: InputState;
    newPassword?: InputState;
    confirmedEmail?: InputState;
    email?: InputState;
    userName?: InputState;
    recaptcha?: InputState;
  };
  isFormValid: boolean;
}

export enum FormActionsEnum {
  InputChanged = 'INPUT_CHANGED',
  SetVisibleInputs = 'SET_VISIBLE_INPUTS',
  RecaptchaChanged = 'RECAPTCHA_CHANGED',
}

export enum InputKeys {
  'Password' = 'password',
  'NewPassword' = 'newPassword',
  'Username' = 'userName',
  'ConfirmedEmail' = 'confirmedEmail',
  'Email' = 'email',
  'Recaptcha' = 'recaptcha',
}

export interface Actions {
  type: FormActionsEnum;
  data: {
    inputKey: InputKeys;
    value: string;
    blurred: boolean;
  };
}

export interface InputChanged extends Actions {
  type: FormActionsEnum.InputChanged;
}

export interface SetVisibleInputs {
  type: FormActionsEnum.SetVisibleInputs;
  data: {
    inputKeys: InputKeys[];
  };
}

export interface RecaptchaChanged {
  type: FormActionsEnum.RecaptchaChanged;
  data: {
    value: string;
  };
}

export type FormActions = SetVisibleInputs | RecaptchaChanged | InputChanged;
