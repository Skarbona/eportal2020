import {
  FormActionsEnum,
  InputKeys,
  InputChanged,
  SetVisibleInputs,
  RecaptchaChanged,
  ConfirmAccountDeleteChanged,
} from './interface';
import { InputChangeEvent } from '../../../models/typescript-events';

export const inputChanged = (event: InputChangeEvent, blurred?: boolean): InputChanged => ({
  type: FormActionsEnum.InputChanged,
  data: {
    inputKey: event.target.name as InputKeys,
    value: event.target.value,
    blurred,
  },
});

export const setVisibleInputs = (inputKeys: InputKeys[]): SetVisibleInputs => ({
  type: FormActionsEnum.SetVisibleInputs,
  data: {
    inputKeys,
  },
});

export const confirmAccountDeleteChanged = (
  value: string,
  userEmail: string,
): ConfirmAccountDeleteChanged => ({
  type: FormActionsEnum.ConfirmAccountDeleteChanged,
  data: {
    value,
    userEmail,
  },
});

export const recaptchaChanged = (value: string): RecaptchaChanged => ({
  type: FormActionsEnum.RecaptchaChanged,
  data: {
    value,
  },
});
