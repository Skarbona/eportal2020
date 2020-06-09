import { AppActions } from './action.interface';
import { AppEnum } from './enum';
import { appInitialState } from './initialState';
import { AppStateInterface } from './initialState.interface';
import { AlertTypes } from '../../models/alerts';

const appReducer = (state = appInitialState, action: AppActions): AppStateInterface => {
  switch (action.type) {
    case AppEnum.SetContactFormVisibility: {
      return {
        ...state,
        showContactForm: action.data.showContactForm,
      };
    }
    case AppEnum.CleanAppAlerts: {
      return {
        ...state,
        error: null,
        alert: null,
        alertType: null,
      };
    }
    case AppEnum.SetAccessTokenData: {
      const { accessToken, accessTokenExpiration } = action.data;
      return {
        ...state,
        auth: {
          ...state.auth,
          accessToken,
          accessTokenExpiration,
          isAuthorizationDone: true,
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
          isAuthorizationDone: true,
        },
      };
    }
    case AppEnum.FailRefreshTokens: {
      return {
        ...state,
        error: action.data.error,
        alertType: AlertTypes.UnAuthorizedWarning,
      };
    }
    case AppEnum.FinishAuthorization: {
      return {
        ...state,
        auth: {
          ...state.auth,
          isAuthorizationDone: true,
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
