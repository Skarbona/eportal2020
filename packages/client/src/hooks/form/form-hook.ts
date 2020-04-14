import { useCallback, useReducer } from 'react';

import { setInitialInputsHandler } from '../../utils/form-hook';
import { formReducer } from './state/reducer';
import { initialState } from './state/initialState';
import * as I from './state/interface';
import * as A from './state/actions';
import { InputChangeEvent } from '../../models/typescript-events';

interface UseForm {
  state: Partial<I.FormState>;
  handlers: {
    inputChanged(event: InputChangeEvent, blurred?: boolean): void;
    recaptchaChanged(value: string): void;
    setVisibleInputs(inputKeys: I.InputKeys[]): void;
    confirmAccountDeleteChanged(value: string, userEmail: string): void;
  };
}

export const useForm = (inputs: I.InputKeys[], isFormValid = false): UseForm => {
  const formState = { ...initialState };
  formState.isFormValid = isFormValid;
  formState.inputs = setInitialInputsHandler(formState.inputs, inputs);

  const [state, formDispatch] = useReducer(formReducer, formState);

  const inputChanged = useCallback(
    (event: InputChangeEvent, blurred?: boolean): void =>
      formDispatch(A.inputChanged(event, blurred)),
    [],
  );

  const recaptchaChanged = useCallback(
    (value: string): void => formDispatch(A.recaptchaChanged(value)),
    [],
  );

  const setVisibleInputs = useCallback(
    (inputKeys: I.InputKeys[]): void => formDispatch(A.setVisibleInputs(inputKeys)),
    [],
  );

  const confirmAccountDeleteChanged = useCallback(
    (value: string, userEmail: string): void =>
      formDispatch(A.confirmAccountDeleteChanged(value, userEmail)),
    [],
  );

  return {
    state,
    handlers: {
      inputChanged,
      recaptchaChanged,
      setVisibleInputs,
      confirmAccountDeleteChanged,
    },
  };
};
