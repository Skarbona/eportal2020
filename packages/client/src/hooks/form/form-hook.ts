import { useCallback, useReducer } from 'react';

import { setInitialInputsHandler } from '../../utils/form-hook';
import { formReducer } from './state/reducer';
import { initialState } from './state/initialState';
import * as I from './state/interface';
import * as A from './state/actions';
import { InputChangeEvent } from '../../models/typescript-events';
import { InputKeys } from './state/interface';

export const useForm = (inputs: I.InputKeys[], isFormValid = false) => {
  initialState.isFormValid = isFormValid;
  initialState.inputs = setInitialInputsHandler(initialState.inputs, inputs);

  const [state, formDispatch] = useReducer(formReducer, initialState);

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
    (inputKeys: InputKeys[]): void => formDispatch(A.setVisibleInputs(inputKeys)),
    [],
  );

  return {
    state,
    handlers: {
      inputChanged,
      recaptchaChanged,
      setVisibleInputs,
    },
  };
};
