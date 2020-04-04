import { AppActions } from './action.interface';
import { AppEnum } from './enum';
import { appInitialState } from './initialState';
import { AppStateInterface } from './initialState.interface';

const appReducer = (state = appInitialState, action: AppActions): AppStateInterface => {
  switch (action.type) {
    case AppEnum.SetAccessTokenData: {
      const { accessToken, accessTokenExpiration } = action.data;
      return {
        ...state,
        auth: {
          ...state.auth,
          accessToken,
          accessTokenExpiration,
        },
      };
    }
    case AppEnum.SetRefreshTokenData: {
      const { refreshToken, refreshTokenExpiration } = action.data;
      return {
        ...state,
        auth: {
          ...state.auth,
          refreshToken,
          refreshTokenExpiration,
        },
      };
    }
    case AppEnum.CleanAppData:
      return appInitialState;
    default:
      return state;
  }
};

export default appReducer;