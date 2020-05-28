import { UserStateInterface } from '../../../store/user/initialState.interface';
import { userInitialState as initialState } from '../../../store/user/initialState';
import userReducer from '../../../store/user/reducer';
import { UserEnum } from '../../../store/user/enum';
import * as I from '../../../store/user/action.interface';
import { mockedStore } from '../../../mocks/store';
import { AlertTypes, NetworkError } from '../../../models/alerts';

describe('Reducer: User', () => {
  let reducerState: UserStateInterface;

  beforeEach(() => {
    reducerState = initialState;
  });

  it('should return initial state', () => {
    const state = userReducer(initialState, {} as any);
    expect(state).toEqual(initialState);
  });

  it('should handle CleanUserAlerts', () => {
    const action: I.CleanUserAlerts = {
      type: UserEnum.CleanUserAlerts,
    };
    const state = userReducer(initialState, action);
    const expectedState: UserStateInterface = {
      ...initialState,
      error: null,
      alert: null,
      alertType: null,
    };
    expect(state).toEqual(expectedState);
  });

  it('should handle InitGetResetPasswordLink', () => {
    const action: I.InitGetResetPasswordLink = {
      type: UserEnum.InitGetResetPasswordLink,
    };
    const state = userReducer(initialState, action);
    const expectedState: UserStateInterface = {
      ...initialState,
      loading: true,
      error: null,
    };
    expect(state).toEqual(expectedState);
  });

  it('should handle SuccessGetResetPasswordLink', () => {
    const action: I.SuccessGetResetPasswordLink = {
      type: UserEnum.SuccessGetResetPasswordLink,
    };
    const state = userReducer(initialState, action);
    const expectedState: UserStateInterface = {
      ...initialState,
      loading: false,
      alert: true,
      alertType: AlertTypes.CheckYourEmail,
    };
    expect(state).toEqual(expectedState);
  });

  it('should handle SuccessSetPassword', () => {
    const action: I.SuccessSetPassword = {
      type: UserEnum.SuccessSetPassword,
    };
    const state = userReducer(initialState, action);
    const expectedState: UserStateInterface = {
      ...initialState,
      loading: false,
      alert: true,
      alertType: AlertTypes.NewUserDataSet,
    };
    expect(state).toEqual(expectedState);
  });

  it('should handle FailGetResetPasswordLink', () => {
    const error = { response: { status: 401 } } as NetworkError;
    const action: I.FailGetResetPasswordLink = {
      type: UserEnum.FailGetResetPasswordLink,
      data: {
        error,
      },
    };
    const state = userReducer(initialState, action);
    const expectedState = {
      ...initialState,
      loading: false,
      error,
      alertType: AlertTypes.UserDoesNotExist,
    };
    expect(state).toEqual(expectedState);
  });

  it('should handle InitFetchUserData', () => {
    const action: I.InitFetchUserData = {
      type: UserEnum.InitFetchUserData,
    };
    const state = userReducer(initialState, action);
    const expectedState: UserStateInterface = {
      ...initialState,
      loading: true,
      error: null,
    };
    expect(state).toEqual(expectedState);
  });

  it('should handle SuccessDeleteUser', () => {
    const action: I.SuccessDeleteUser = {
      type: UserEnum.SuccessDeleteUser,
    };
    const state = userReducer(initialState, action);
    const expectedState: UserStateInterface = {
      ...initialState,
      loading: false,
    };
    expect(state).toEqual(expectedState);
  });

  it('should handle SuccessFetchUserData', () => {
    const {
      user: { userData },
    } = mockedStore();
    const action: I.SuccessFetchUserData = {
      type: UserEnum.SuccessFetchUserData,
      data: {
        user: userData,
      },
    };
    const state = userReducer(initialState, action);
    const expectedState = {
      ...initialState,
      loading: false,
      userData,
    };
    expect(state).toEqual(expectedState);
  });

  it('should handle FailFetchUserData', () => {
    const error = { response: { status: 401 } } as NetworkError;
    const action: I.FailFetchUserData = {
      type: UserEnum.FailFetchUserData,
      data: {
        error,
      },
    };
    const state = userReducer(initialState, action);
    const expectedState = {
      ...initialState,
      loading: false,
      error,
      alertType: AlertTypes.UnAuthorized,
    };
    expect(state).toEqual(expectedState);
  });

  it('should handle FailFetchUserData', () => {
    const error = { response: { status: 500 } } as NetworkError;
    const action: I.FailFetchUserData = {
      type: UserEnum.FailFetchUserData,
      data: {
        error,
      },
    };
    const state = userReducer(initialState, action);
    const expectedState = {
      ...initialState,
      loading: false,
      error,
      alertType: AlertTypes.ServerError,
    };
    expect(state).toEqual(expectedState);
  });

  it('should handle InitSetUserData', () => {
    const action: I.InitSetUserData = {
      type: UserEnum.InitSetUserData,
    };
    const state = userReducer(initialState, action);
    const expectedState: UserStateInterface = {
      ...initialState,
      loading: true,
      error: null,
    };
    expect(state).toEqual(expectedState);
  });

  it('should handle InitDeleteUser', () => {
    const action: I.InitDeleteUser = {
      type: UserEnum.InitDeleteUser,
    };
    const state = userReducer(initialState, action);
    const expectedState: UserStateInterface = {
      ...initialState,
      loading: true,
      error: null,
    };
    expect(state).toEqual(expectedState);
  });

  it('should handle SuccessSetUserData', () => {
    const {
      user: { userData },
    } = mockedStore();
    const action: I.SuccessSetUserData = {
      type: UserEnum.SuccessSetUserData,
      data: {
        user: userData,
      },
    };
    const state = userReducer(initialState, action);
    const expectedState = {
      ...initialState,
      loading: false,
      userData,
    };
    expect(state).toEqual(expectedState);
  });

  it('should handle FailSetUserData', () => {
    const error = { response: { status: 422 } } as NetworkError;
    const action: I.FailSetUserData = {
      type: UserEnum.FailSetUserData,
      data: {
        error,
      },
    };
    const state = userReducer(initialState, action);
    const expectedState = {
      ...initialState,
      loading: false,
      error,
      alertType: AlertTypes.CannotSetUserDataWarning,
    };
    expect(state).toEqual(expectedState);
  });

  it('should handle InitAuthorization', () => {
    const action: I.InitAuthorization = {
      type: UserEnum.InitAuthorization,
    };
    const state = userReducer(initialState, action);
    const expectedState: UserStateInterface = {
      ...initialState,
      loading: true,
      error: null,
    };
    expect(state).toEqual(expectedState);
  });

  it('should handle SuccessAuthorization', () => {
    const {
      user: { userData },
    } = mockedStore();
    const action: I.SuccessAuthorization = {
      type: UserEnum.SuccessAuthorization,
      data: {
        user: userData,
      },
    };
    const state = userReducer(initialState, action);
    const expectedState = {
      ...initialState,
      loading: false,
      userData,
    };
    expect(state).toEqual(expectedState);
  });

  it('should handle FailAuthorization', () => {
    const error = { response: { status: 422 } } as NetworkError;
    const action: I.FailAuthorization = {
      type: UserEnum.FailAuthorization,
      data: {
        error,
      },
    };
    const state = userReducer(initialState, action);
    const expectedState = {
      ...initialState,
      loading: false,
      error,
      alertType: AlertTypes.WrongRegisterInputs,
    };
    expect(state).toEqual(expectedState);
  });

  it('should handle CleanUserData', () => {
    const action: I.CleanUserData = {
      type: UserEnum.CleanUserData,
    };
    const state = userReducer(initialState, action);
    expect(state).toEqual(initialState);
  });
});
