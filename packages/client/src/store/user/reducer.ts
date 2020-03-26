import { UserActions } from './action.interface';
import { UserEnum } from './enum';
import { userInitialState } from './initialState';
import { UserStateInterface } from './initialState.interface';

const userReducer = (state = userInitialState, action: UserActions): UserStateInterface => {
  switch (action.type) {
    case UserEnum.InitFetchUserData:
      return {
        ...state,
        loading: true,
      };
    case UserEnum.SuccessFetchUserData: {
      return {
        ...state,
        loading: false,
        userData: action.data.user,
      };
    }
    case UserEnum.FailFetchUserData:
      return {
        ...state,
        ...userInitialState,
        loading: false,
        error: action.data.error,
      };
    case UserEnum.InitSetUserData:
      return {
        ...state,
        loading: true,
      };
    case UserEnum.SuccessSetUserData: {
      return {
        ...state,
        loading: false,
        userData: action.data.user,
      };
    }
    case UserEnum.FailSetUserData:
      return {
        ...state,
        loading: false,
        error: action.data.error,
      };
    default:
      return state;
  }
};

export default userReducer;
