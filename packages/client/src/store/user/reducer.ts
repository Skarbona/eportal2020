import { UserActions } from './action.interface';
import { UserEnum } from './enum';
import { userInitialState } from './initialState';
import { UserStateInterface } from './initialState.interface';
import { AlertTypes } from '../../models/alerts';

const userReducer = (state = userInitialState, action: UserActions): UserStateInterface => {
  switch (action.type) {
    case UserEnum.InitGetResetPasswordLink:
    case UserEnum.InitAuthorization:
    case UserEnum.InitSetUserData:
    case UserEnum.InitDeleteUser:
    case UserEnum.InitFetchUserData:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case UserEnum.SuccessGetResetPasswordLink: {
      return {
        ...state,
        loading: false,
        alert: true,
        alertType: AlertTypes.CheckYourEmail,
      };
    }
    case UserEnum.SuccessDeleteUser: {
      return {
        ...state,
        loading: false,
      };
    }
    case UserEnum.SuccessAuthorization:
    case UserEnum.SuccessSetUserData:
    case UserEnum.SuccessFetchUserData: {
      return {
        ...state,
        loading: false,
        userData: action.data.user,
      };
    }
    case UserEnum.FailDeleteUser:
    case UserEnum.FailFetchUserData: {
      const { error } = action.data;
      let alertType = AlertTypes.ServerError;
      const errorStatus = error.response?.status;
      if (!errorStatus || errorStatus >= 500) {
        alertType = AlertTypes.ServerError;
      } else if (errorStatus === 401) {
        alertType = AlertTypes.UnAuthorized;
      }
      return {
        ...state,
        ...userInitialState,
        loading: false,
        error,
        alertType,
      };
    }
    case UserEnum.FailSetUserData: {
      const { error } = action.data;
      let alertType = AlertTypes.ServerError;
      const errorStatus = error.response?.status;
      if (!errorStatus || errorStatus >= 500) {
        alertType = AlertTypes.ServerError;
      } else if (errorStatus === 401) {
        alertType = AlertTypes.UnAuthorized;
      } else {
        alertType = AlertTypes.CannotSetUserDataWarning;
      }
      return {
        ...state,
        loading: false,
        error,
        alertType,
      };
    }
    case UserEnum.FailGetResetPasswordLink: {
      const { error } = action.data;
      let alertType = AlertTypes.ServerError;
      const errorStatus = error.response?.status;
      if (!errorStatus || errorStatus >= 500) {
        alertType = AlertTypes.ServerError;
      } else if (errorStatus === 400) {
        alertType = AlertTypes.ValidationError;
      } else if (errorStatus === 401) {
        alertType = AlertTypes.UserDoesNotExist;
      }
      return {
        ...state,
        loading: false,
        error,
        alertType,
      };
    }
    case UserEnum.FailAuthorization: {
      const { error } = action.data;
      let alertType = AlertTypes.ServerError;
      const errorStatus = error.response?.status;
      if (!errorStatus || errorStatus >= 500) {
        alertType = AlertTypes.ServerError;
      } else if (errorStatus === 400) {
        alertType = AlertTypes.ValidationError;
      } else if (errorStatus === 401) {
        alertType = AlertTypes.WrongLoginInputs;
      } else if (errorStatus === 422) {
        alertType = AlertTypes.WrongRegisterInputs;
      }
      return {
        ...state,
        loading: false,
        error,
        alertType,
      };
    }
    case UserEnum.CleanUserData:
      return userInitialState;
    default:
      return state;
  }
};

export default userReducer;
