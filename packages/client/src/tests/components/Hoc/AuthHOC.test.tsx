import React from 'react';
import * as redux from 'react-redux';
import { shallow, ShallowWrapper } from 'enzyme';

import { AuthHOC } from '../../../components/Hoc/AuthHOC';
import * as loginThunk from '../../../store/app/thunks/login';
import * as logoutThunk from '../../../store/app/thunks/logout';
import * as refreshThunk from '../../../store/app/thunks/refreshTokens';
import { LocalStorage } from '../../../models/local-storage';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory: jest.fn(() => ({
    push: (path: string) => {},
  })),
}));

describe('<AuthHOC> Hoc component', () => {
  let wrapper: ShallowWrapper;
  let spyStore: any;
  let spyRefreshTokens: any;
  let spyLogout: any;
  let spyLogin: any;
  let setIntervalSpy: any;
  let clearIntervalSpy: any;
  let setTimeoutSpy: any;
  let clearTimeoutSpy: any;

  beforeEach(() => {
    setTimeoutSpy = jest.spyOn(window, 'setTimeout');
    clearTimeoutSpy = jest.spyOn(window, 'clearTimeout');
    setIntervalSpy = jest.spyOn(window, 'setInterval');
    clearIntervalSpy = jest.spyOn(window, 'clearInterval');
    spyStore = jest.spyOn(redux, 'useSelector');
    spyLogin = jest.spyOn(loginThunk, 'login');
    spyLogout = jest.spyOn(logoutThunk, 'logout');
    spyRefreshTokens = jest.spyOn(refreshThunk, 'refreshTokens');
  });

  afterEach(() => {
    spyStore.mockClear();
    setTimeoutSpy.mockClear();
    clearTimeoutSpy.mockClear();
    setIntervalSpy.mockClear();
    clearIntervalSpy.mockClear();
    spyLogin.mockClear();
    spyLogout.mockClear();
    spyRefreshTokens.mockClear();
  });

  it('should NOT set Tokens Timeout', () => {
    spyStore.mockReturnValue({
      accToken: null,
      accTokenExpiration: new Date(),
      refToken: null,
      refTokenExpiration: new Date(),
    });
    wrapper = shallow(<AuthHOC />);
    expect(setTimeoutSpy).not.toHaveBeenCalled();
    expect(clearTimeoutSpy).toHaveBeenCalled();
  });

  it('should set accessToken Timeout', () => {
    spyStore.mockReturnValue({
      accToken: 'TOKEN',
      accTokenExpiration: new Date(2030, 10, 10),
    });
    wrapper = shallow(<AuthHOC />);
    expect(setTimeoutSpy).toHaveBeenCalled();
    expect(clearTimeoutSpy).toHaveBeenCalled();
  });

  it('should set refreshToken Timeout', () => {
    spyStore.mockReturnValue({
      refToken: 'TOKEN',
      refTokenExpiration: new Date(),
    });
    wrapper = shallow(<AuthHOC />);
    expect(setTimeoutSpy).toHaveBeenCalled();
    expect(clearTimeoutSpy).toHaveBeenCalled();
  });

  it('should set refreshToken Interval', () => {
    spyStore.mockReturnValue({
      refToken: 'TOKEN',
      refTokenExpiration: new Date(),
    });
    wrapper = shallow(<AuthHOC />);
    expect(setIntervalSpy).toHaveBeenCalled();
    expect(clearIntervalSpy).toHaveBeenCalled();
  });

  it('should NOT set refreshToken Interval', () => {
    spyStore.mockReturnValue({
      refToken: null,
      refTokenExpiration: new Date(),
    });
    wrapper = shallow(<AuthHOC />);
    expect(setIntervalSpy).not.toHaveBeenCalled();
    expect(clearIntervalSpy).toHaveBeenCalled();
  });

  it('should set accessToken Interval', () => {
    spyStore.mockReturnValue({
      accToken: 'TOKEN',
      accTokenExpiration: new Date(),
    });
    wrapper = shallow(<AuthHOC />);
    expect(setIntervalSpy).toHaveBeenCalled();
    expect(clearIntervalSpy).toHaveBeenCalled();
  });

  it('should NOT set accessToken Interval', () => {
    spyStore.mockReturnValue({
      accToken: null,
      accTokenExpiration: new Date(),
    });
    wrapper = shallow(<AuthHOC />);
    expect(setIntervalSpy).not.toHaveBeenCalled();
    expect(clearIntervalSpy).toHaveBeenCalled();
  });

  it('should dispatch refreshTokens thunk when ACCESS TOKEN time remain to end', () => {
    spyStore.mockReturnValue({
      accToken: 'TOKEN',
      accTokenExpiration: new Date(new Date().getTime() + 1000),
    });
    wrapper = shallow(<AuthHOC />);
    expect(spyRefreshTokens).toHaveBeenCalled();
  });

  it('should dispatch refreshTokens thunk when REFRESH TOKEN time remain to end', () => {
    spyStore.mockReturnValue({
      refToken: 'TOKEN',
      refTokenExpiration: new Date(new Date().getTime() + 1000),
    });
    wrapper = shallow(<AuthHOC />);
    expect(spyRefreshTokens).toHaveBeenCalled();
  });

  it('should login if refresh and access token exist', () => {
    const localStorageData = {
      refreshTokenData: {
        refreshToken: 'REFRESH_TOKEN',
        refreshTokenExpirationDate: new Date(new Date().getTime() + 1000 * 60 * 60),
      },
      accessTokenData: {
        accessToken: 'ACCESS_TOKEN',
        accessTokenExpirationDate: new Date(new Date().getTime() + 1000 * 60 * 60),
      },
    };

    jest.spyOn(window.localStorage.__proto__, 'getItem');
    window.localStorage.__proto__.getItem = jest.fn((type) =>
      JSON.stringify(
        type === LocalStorage.UserDataAccessToken
          ? localStorageData.accessTokenData
          : localStorageData.refreshTokenData,
      ),
    );

    wrapper = shallow(<AuthHOC />);
    expect(spyLogin).toHaveBeenCalled();
  });

  it('should logout if refresh and access token NOT exist', () => {
    jest.spyOn(window.localStorage.__proto__, 'getItem');
    window.localStorage.__proto__.getItem = jest.fn(() => {});

    wrapper = shallow(<AuthHOC />);
    expect(spyLogout).toHaveBeenCalled();
  });
});
