import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { Route } from 'react-router-dom';

import { PagesComponent, arePropsEqual } from '../../../components/Pages/Pages';
import Game from '../../../components/Pages/Game/Game';
import Page from '../../../components/Pages/Page/Page';
import Main from '../../../components/Pages/Main/Main';
import AuthPage from '../../../components/Pages/AuthPage/AuthPage';
import NotFound from '../../../components/Pages/404/404';

describe('<Pages > component', () => {
  let wrapper: ShallowWrapper;

  it('should have all required elements if access token exist', () => {
    wrapper = shallow(<PagesComponent accessToken="TOKEN" expirationDate={new Date()} />);
    expect(wrapper.find(Game)).toHaveLength(1);
    expect(wrapper.find(Main)).toHaveLength(1);
    expect(wrapper.find(Page)).toHaveLength(2);
    expect(wrapper.find(NotFound)).toHaveLength(1);
    expect(wrapper.find(Route)).toHaveLength(6);

    expect(wrapper.find(AuthPage)).toHaveLength(0);
  });

  it('should have all required elements if access token NOT exist', () => {
    wrapper = shallow(<PagesComponent accessToken="" expirationDate={new Date()} />);
    expect(wrapper.find(Main)).toHaveLength(1);
    expect(wrapper.find(AuthPage)).toHaveLength(1);
    expect(wrapper.find(NotFound)).toHaveLength(1);
    expect(wrapper.find(Page)).toHaveLength(2);
    expect(wrapper.find(Route)).toHaveLength(7);

    expect(wrapper.find(Game)).toHaveLength(0);
  });

  it('should not allow update component if access token has changed', () => {
    const oldAccessToken = '111111';
    const newAccessToken = '222222';
    const propsChanged = arePropsEqual(
      { accessToken: oldAccessToken, expirationDate: new Date() },
      { accessToken: newAccessToken, expirationDate: new Date() },
    );
    expect(propsChanged).toEqual(true);
  });

  it('should allow update component if access token is valid', () => {
    const oldAccessToken = '';
    const newAccessToken = '222222';
    const propsChanged = arePropsEqual(
      { accessToken: oldAccessToken, expirationDate: new Date() },
      { accessToken: newAccessToken, expirationDate: new Date() },
    );
    expect(propsChanged).toEqual(false);
  });
});
