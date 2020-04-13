import { UserActions } from './action.interface';
import { UserEnum } from './enum';
import { userInitialState } from './initialState';
import { UserStateInterface } from './initialState.interface';
import { ErrorTypes } from '../../models/errors';

const userReducer = (state = userInitialState, action: UserActions): UserStateInterface => {
  switch (action.type) {
    case UserEnum.InitAuthorization:
    case UserEnum.InitSetUserData:
    case UserEnum.InitDeleteUser:
    case UserEnum.InitFetchUserData:
      return {
        ...state,
        loading: true,
        error: null,
      };
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
      let errorType = ErrorTypes.ServerError;
      const errorStatus = error.response?.status;
      if (!errorStatus || errorStatus >= 500) {
        errorType = ErrorTypes.ServerError;
      } else if (errorStatus === 401) {
        errorType = ErrorTypes.UnAuthorized;
      }
      return {
        ...state,
        ...userInitialState,
        loading: false,
        error,
        errorType,
      };
    }
    case UserEnum.FailSetUserData: {
      const { error } = action.data;
      let errorType = ErrorTypes.ServerError;
      const errorStatus = error.response?.status;
      if (!errorStatus || errorStatus >= 500) {
        errorType = ErrorTypes.ServerError;
      } else if (errorStatus === 401) {
        errorType = ErrorTypes.UnAuthorized;
      } else {
        errorType = ErrorTypes.CannotSetUserDataWarning;
      }
      return {
        ...state,
        loading: false,
        error,
        errorType,
      };
    }
    case UserEnum.FailAuthorization: {
      const { error } = action.data;
      let errorType = ErrorTypes.ServerError;
      const errorStatus = error.response?.status;
      if (!errorStatus || errorStatus >= 500) {
        errorType = ErrorTypes.ServerError;
      } else if (errorStatus === 400) {
        errorType = ErrorTypes.ValidationError;
      } else if (errorStatus === 401) {
        errorType = ErrorTypes.WrongLoginInputs;
      } else if (errorStatus === 422) {
        errorType = ErrorTypes.WrongRegisterInputs;
      }
      return {
        ...state,
        loading: false,
        error,
        errorType,
      };
    }
    case UserEnum.CleanUserData:
      return userInitialState;
    default:
      return state;
  }
};

export default userReducer;
