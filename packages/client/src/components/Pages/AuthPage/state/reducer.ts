import * as I from './interface';
import * as U from '../../../../utils/auth-page';

export const authPageReducer = (
  state: I.AuthPageState,
  action: I.AuthPageActions,
): I.AuthPageState => {
  switch (action.type) {
    case I.AuthPageActionsEnum.EmailChanged: {
      const { value } = action.data;
      const { blurred } = action.data;
      const newState = {
        ...state,
        inputs: {
          ...state.inputs,
          email: {
            ...state.inputs.email,
            ...U.isEmailValidHandler(value, blurred),
          },
        },
      };
      newState.isFormValid = U.isFormValidHandler(newState.inputs);
      return newState;
    }
    case I.AuthPageActionsEnum.RepeatEmailChanged: {
      const { value } = action.data;
      const { blurred } = action.data;
      const newState = {
        ...state,
        inputs: {
          ...state.inputs,
          confirmedEmail: {
            ...state.inputs.confirmedEmail,
            ...U.isConfirmedEmailValidHandler(value, blurred, state.inputs.email.value),
          },
        },
      };
      newState.isFormValid = U.isFormValidHandler(newState.inputs);
      return newState;
    }
    case I.AuthPageActionsEnum.PasswordChanged: {
      const { value } = action.data;
      const { blurred } = action.data;
      const newState = {
        ...state,
        inputs: {
          ...state.inputs,
          password: {
            ...state.inputs.password,
            ...U.isPasswordValidHandler(value, blurred),
          },
        },
      };
      newState.isFormValid = U.isFormValidHandler(newState.inputs);
      return newState;
    }
    case I.AuthPageActionsEnum.UserNameChanged: {
      const { value } = action.data;
      const { blurred } = action.data;
      const newState = {
        ...state,
        inputs: {
          ...state.inputs,
          userName: {
            ...state.inputs.userName,
            ...U.isUserNameValidHandler(value, blurred),
          },
        },
      };
      newState.isFormValid = U.isFormValidHandler(newState.inputs);
      return newState;
    }
    case I.AuthPageActionsEnum.SetVisibleInputs: {
      const { inputKeys } = action.data;
      const newState = { ...state };
      newState.inputs = U.setVisibleInputsHandler(newState, inputKeys);
      newState.isFormValid = U.isFormValidHandler(newState.inputs);
      return newState;
    }
    case I.AuthPageActionsEnum.RecaptchaChanged: {
      const { value } = action.data;
      const newState = {
        ...state,
        inputs: {
          ...state.inputs,
          recaptcha: {
            ...state.inputs.recaptcha,
            valid: value?.length > 0,
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
