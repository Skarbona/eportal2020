import {
  AuthPageActionsEnum,
  PasswordChanged,
  ConfirmedEmailChanged,
  EmailChanged,
  UserNameChanged,
  SetVisibleInputs,
  InputKeys,
  RecaptchaChanged,
} from './interface';
import { InputChangeEvent } from '../../../../models/typescript-events';

export const passwordChanged = (event: InputChangeEvent, blurred?: boolean): PasswordChanged => ({
  type: AuthPageActionsEnum.PasswordChanged,
  data: {
    value: event.target.value,
    blurred,
  },
});

export const confirmedEmailChanged = (
  event: InputChangeEvent,
  blurred?: boolean,
): ConfirmedEmailChanged => ({
  type: AuthPageActionsEnum.ConfirmedEmailChanged,
  data: {
    value: event.target.value,
    blurred,
  },
});

export const emailChanged = (event: InputChangeEvent, blurred?: boolean): EmailChanged => ({
  type: AuthPageActionsEnum.EmailChanged,
  data: {
    value: event.target.value,
    blurred,
  },
});

export const userNameChanged = (event: InputChangeEvent, blurred?: boolean): UserNameChanged => ({
  type: AuthPageActionsEnum.UserNameChanged,
  data: {
    value: event.target.value,
    blurred,
  },
});

export const setVisibleInputs = (inputKeys: InputKeys[]): SetVisibleInputs => ({
  type: AuthPageActionsEnum.SetVisibleInputs,
  data: {
    inputKeys,
  },
});

export const recaptchaChanged = (value: string): RecaptchaChanged => ({
  type: AuthPageActionsEnum.RecaptchaChanged,
  data: {
    value,
  },
});
