import * as I from '../../../store/app/action.interface';
import { AppEnum } from '../../../store/app/enum';
import * as A from '../../../store/app/action';

describe('Actions: App', () => {
  it('should create finishAuthorization action', () => {
    const expectedAction: I.FinishAuthorization = {
      type: AppEnum.FinishAuthorization,
    };

    const action = A.finishAuthorization();
    expect(action).toEqual(expectedAction);
  });

  it('should create cleanAppAlerts action', () => {
    const expectedAction: I.CleanAppAlerts = {
      type: AppEnum.CleanAppAlerts,
    };

    const action = A.cleanAppAlerts();
    expect(action).toEqual(expectedAction);
  });

  it('should create cleanAppData action', () => {
    const expectedAction: I.CleanAppData = {
      type: AppEnum.CleanAppData,
    };

    const action = A.cleanAppData();
    expect(action).toEqual(expectedAction);
  });

  it('should create initRefreshTokens action', () => {
    const expectedAction: I.InitRefreshTokens = {
      type: AppEnum.InitRefreshTokens,
    };

    const action = A.initRefreshTokens();
    expect(action).toEqual(expectedAction);
  });

  it('should create failRefreshTokens action', () => {
    const error = new Error();
    const expectedAction: I.FailRefreshTokens = {
      type: AppEnum.FailRefreshTokens,
      data: {
        error,
      },
    };

    const action = A.failRefreshTokens(error);
    expect(action).toEqual(expectedAction);
  });

  it('should create setAccessTokenData action', () => {
    const data = {
      accessToken: '',
      accessTokenExpiration: new Date(),
    };
    const expectedAction: I.SetAccessTokenData = {
      type: AppEnum.SetAccessTokenData,
      data,
    };
    const action = A.setAccessTokenData(data);
    expect(action).toEqual(expectedAction);
  });

  it('should create setRefreshTokenData action', () => {
    const data = {
      refreshToken: '',
      refreshTokenExpiration: new Date(),
    };
    const expectedAction: I.SetRefreshTokenData = {
      type: AppEnum.SetRefreshTokenData,
      data,
    };
    const action = A.setRefreshTokenData(data);
    expect(action).toEqual(expectedAction);
  });
});
