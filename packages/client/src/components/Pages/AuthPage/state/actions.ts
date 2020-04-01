import {
  AuthPageActionsEnum,
  PasswordChanged,
  RepeatEmailChanged,
  EmailChanged,
  UserNameChanged,
  SetVisibleInputs,
  InputKeys,
} from './interface';
import { InputChangeEvent } from '../../../../models/typescript-events';

export const passwordChanged = (event: InputChangeEvent, blurred?: boolean): PasswordChanged => ({
  type: AuthPageActionsEnum.PasswordChanged,
  data: {
    value: event.target.value,
    blurred,
  },
});

export const repeatEmailChanged = (
  event: InputChangeEvent,
  blurred?: boolean,
): RepeatEmailChanged => ({
  type: AuthPageActionsEnum.RepeatEmailChanged,
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
