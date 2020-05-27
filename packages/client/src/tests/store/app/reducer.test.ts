import { AppStateInterface } from '../../../store/app/initialState.interface';
import { appInitialState as initialState } from '../../../store/app/initialState';
import appReducer from '../../../store/app/reducer';
import { AppEnum } from '../../../store/app/enum';
import * as I from '../../../store/app/action.interface';
import { AlertTypes } from '../../../models/alerts';

describe('Reducer: App', () => {
  let reducerState: AppStateInterface;

  beforeEach(() => {
    reducerState = initialState;
  });

  it('should return initial state', () => {
    const state = appReducer(initialState, {} as any);
    expect(state).toEqual(initialState);
  });

  it('should handle SetAccessTokenData', () => {
    const data = {
      accessToken: '',
      accessTokenExpiration: new Date(),
    };
    const action: I.SetAccessTokenData = {
      type: AppEnum.SetAccessTokenData,
      data,
    };
    const state = appReducer(initialState, action);
    const expectedState: AppStateInterface = {
      ...initialState,
      auth: {
        ...initialState.auth,
        isAuthorizationDone: true,
        ...data,
      },
    };
    expect(state).toEqual(expectedState);
  });

  it('should handle SetRefreshTokenData', () => {
    const data = {
      refreshToken: '',
      refreshTokenExpiration: new Date(),
    };
    const action: I.SetRefreshTokenData = {
      type: AppEnum.SetRefreshTokenData,
      data,
    };
    const state = appReducer(initialState, action);
    const expectedState: AppStateInterface = {
      ...initialState,
      auth: {
        ...initialState.auth,
        isAuthorizationDone: true,
        ...data,
      },
    };
    expect(state).toEqual(expectedState);
  });

  it('should handle FailRefreshTokens', () => {
    const data = {
      error: new Error(),
    };
    const action: I.FailRefreshTokens = {
      type: AppEnum.FailRefreshTokens,
      data,
    };
    const state = appReducer(initialState, action);
    const expectedState: AppStateInterface = {
      ...initialState,
      error: data.error,
      alertType: AlertTypes.UnAuthorizedWarning,
    };
    expect(state).toEqual(expectedState);
  });

  it('should handle CleanAppData', () => {
    const action: I.CleanAppData = {
      type: AppEnum.CleanAppData,
    };
    const state = appReducer(initialState, action);
    expect(state).toEqual(initialState);
  });
});
