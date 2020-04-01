interface InputState {
  valid: boolean;
  visible: boolean;
  required: boolean;
  error: boolean;
  errorMsg: string;
  value: string;
  blurred: boolean;
}

export interface AuthPageState {
  inputs: {
    password: InputState;
    confirmedEmail: InputState;
    email: InputState;
    userName: InputState;
    recaptcha: InputState;
  };
  isFormValid: boolean;
}

export enum AuthPageActionsEnum {
  PasswordChanged = 'PASSWORD_CHANGED',
  RepeatEmailChanged = 'REPEAT_EMAIL_CHANGED',
  EmailChanged = 'EMAIL_CHANGED',
  UserNameChanged = 'USER_NAME_CHANGED',
  SetVisibleInputs = 'SET_VISIBLE_INPUTS',
  RecaptchaChanged = 'RECAPTCHA_CHANGED',
}

export enum InputKeys {
  'Password' = 'password',
  'Username' = 'userName',
  'ConfirmedEmail' = 'confirmedEmail',
  'Email' = 'email',
  'Recaptcha' = 'recaptcha',
}

export interface Actions {
  type: AuthPageActionsEnum;
  data: {
    value: string;
    blurred: boolean;
  };
}

export interface PasswordChanged extends Actions {
  type: AuthPageActionsEnum.PasswordChanged;
}

export interface RepeatEmailChanged extends Actions {
  type: AuthPageActionsEnum.RepeatEmailChanged;
}

export interface EmailChanged extends Actions {
  type: AuthPageActionsEnum.EmailChanged;
}

export interface UserNameChanged extends Actions {
  type: AuthPageActionsEnum.UserNameChanged;
}

export interface SetVisibleInputs {
  type: AuthPageActionsEnum.SetVisibleInputs;
  data: {
    inputKeys: InputKeys[];
  };
}

export interface RecaptchaChanged {
  type: AuthPageActionsEnum.RecaptchaChanged;
  data: {
    value: string;
  };
}

export type AuthPageActions =
  | PasswordChanged
  | RepeatEmailChanged
  | EmailChanged
  | SetVisibleInputs
  | RecaptchaChanged
  | UserNameChanged;
