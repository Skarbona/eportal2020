import * as I from './interface';
import * as U from '../../../utils/form-hook';

export const formReducer = (
  state: Partial<I.FormState>,
  action: Partial<I.FormActions>,
): Partial<I.FormState> => {
  switch (action.type) {
    case I.FormActionsEnum.RecaptchaChanged: {
      const { value } = action.data;
      const validation = U.isRecaptchaValidHandler(value);
      const newState = {
        ...state,
        inputs: {
          ...state.inputs,
          recaptcha: {
            ...state.inputs.recaptcha,
            ...validation,
          },
        },
      };
      newState.isFormValid = U.isFormValidHandler(newState.inputs);
      return newState;
    }
    case I.FormActionsEnum.CheckBoxChanged: {
      const { value, inputKey } = action.data;
      const newState = {
        ...state,
        inputs: {
          ...state.inputs,
          [inputKey]: {
            ...state.inputs[inputKey],
            valid: value,
            value,
          },
        },
      };
      newState.isFormValid = U.isFormValidHandler(newState.inputs);
      return newState;
    }
    case I.FormActionsEnum.InputChanged: {
      const { value, blurred, inputKey } = action.data;
      const validation = U.validateByKey({ inputKey, blurred, value, oldState: { ...state } });
      const newState = {
        ...state,
        inputs: {
          ...state.inputs,
          [inputKey]: {
            ...state.inputs[inputKey],
            ...validation,
          },
        },
      };
      newState.isFormValid = U.isFormValidHandler(newState.inputs);
      return newState;
    }
    case I.FormActionsEnum.SetVisibleInputs: {
      const { inputKeys } = action.data;
      const newState = { ...state };
      newState.inputs = U.setVisibleInputsHandler(newState.inputs, inputKeys);
      newState.isFormValid = U.isFormValidHandler(newState.inputs);
      return newState;
    }
    case I.FormActionsEnum.ConfirmAccountDeleteChanged: {
      const { value, userEmail } = action.data;
      const newState = {
        ...state,
        inputs: {
          ...state.inputs,
          confirmAccountDelete: {
            ...state.inputs.confirmAccountDelete,
            value,
            valid: value === userEmail,
          },
        },
      };
      newState.isFormValid = U.isFormValidHandler(newState.inputs);
      return newState;
    }

    default:
      return state;
  }
};
