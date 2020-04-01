import { AuthPageActions, AuthPageState, AuthPageActionsEnum } from './interface';
import {
  isPasswordValidHandler,
  isFormValidHandler,
  isUserNameValidHandler,
  isEmailValidHandler,
  isConfirmedEmailValidHandler,
  setVisibleInputsHandler,
} from '../../../../utils/auth-page';

export const authPageReducer = (state: AuthPageState, action: AuthPageActions): AuthPageState => {
  switch (action.type) {
    case AuthPageActionsEnum.EmailChanged: {
      const { value } = action.data;
      const { blurred } = action.data;
      const newState = {
        ...state,
        inputs: {
          ...state.inputs,
          email: {
            ...state.inputs.email,
            ...isEmailValidHandler(value, blurred),
          },
        },
      };
      newState.isFormValid = isFormValidHandler(newState.inputs);
      return newState;
    }
    case AuthPageActionsEnum.RepeatEmailChanged: {
      const { value } = action.data;
      const { blurred } = action.data;
      const newState = {
        ...state,
        inputs: {
          ...state.inputs,
          confirmedEmail: {
            ...state.inputs.confirmedEmail,
            ...isConfirmedEmailValidHandler(value, blurred, state.inputs.email.value),
          },
        },
      };
      newState.isFormValid = isFormValidHandler(newState.inputs);
      return newState;
    }
    case AuthPageActionsEnum.PasswordChanged: {
      const { value } = action.data;
      const { blurred } = action.data;
      const newState = {
        ...state,
        inputs: {
          ...state.inputs,
          password: {
            ...state.inputs.password,
            ...isPasswordValidHandler(value, blurred),
          },
        },
      };
      newState.isFormValid = isFormValidHandler(newState.inputs);
      return newState;
    }
    case AuthPageActionsEnum.UserNameChanged: {
      const { value } = action.data;
      const { blurred } = action.data;
      const newState = {
        ...state,
        inputs: {
          ...state.inputs,
          userName: {
            ...state.inputs.userName,
            ...isUserNameValidHandler(value, blurred),
          },
        },
      };
      newState.isFormValid = isFormValidHandler(newState.inputs);
      return newState;
    }
    case AuthPageActionsEnum.SetVisibleInputs: {
      const { inputKeys } = action.data;
      const newState = { ...state };
      newState.inputs = setVisibleInputsHandler(newState, inputKeys);
      newState.isFormValid = isFormValidHandler(newState.inputs);
      return newState;
    }
    case AuthPageActionsEnum.RecaptchaChanged: {
      const { value } = action.data;
      const newState = {
        ...state,
        inputs: {
          ...state.inputs,
          recaptcha: {
            ...state.inputs.recaptcha,
            valid: value.length > 0,
          },
        },
      };
      newState.isFormValid = isFormValidHandler(newState.inputs);
      return newState;
    }
    default:
      return state;
  }
};
