import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { AppBar } from '@material-ui/core';
import { Menu as MenuIcon } from '@material-ui/icons';
import { Link } from 'react-router-dom';

import * as logoutThunk from '../../../store/app/thunks/logout';
import { HeaderComponent } from '../../../components/Shared/PageElements/Header/Header';
import { createMatchMedia } from '../../helpers';

describe('<Header > component', () => {
  let wrapper: ShallowWrapper;

  it('should have all required elements on Mobile Screens with access Token', () => {
    window.matchMedia = createMatchMedia(600) as any;
    wrapper = shallow(<HeaderComponent accessToken="TOKEN" />);
    expect(wrapper.find(AppBar)).toHaveLength(1);
    expect(wrapper.find(MenuIcon)).toHaveLength(1);
    expect(wrapper.find(Link)).toHaveLength(7);
    expect(wrapper.find('.portal-name')).toHaveLength(1);
    expect(wrapper.find('.btn__start-game')).toHaveLength(1);
    expect(wrapper.find('.btn__logout')).toHaveLength(2);
    expect(wrapper.find('.btn__waiting-room')).toHaveLength(1);
    expect(wrapper.find('.btn__profile-page')).toHaveLength(1);
    expect(wrapper.find('.btn__premium-page')).toHaveLength(1);
    expect(wrapper.find('.btn__log-in')).toHaveLength(0);
    expect(wrapper.find('.btn__register')).toHaveLength(0);
  });

  it('should have all required elements on Mobile Screens with NO access Token', () => {
    window.matchMedia = createMatchMedia(600) as any;
    wrapper = shallow(<HeaderComponent accessToken="" />);
    expect(wrapper.find(AppBar)).toHaveLength(1);
    expect(wrapper.find(MenuIcon)).toHaveLength(1);
    expect(wrapper.find(Link)).toHaveLength(3);
    expect(wrapper.find('.portal-name')).toHaveLength(1);
    expect(wrapper.find('.btn__start-game')).toHaveLength(0);
    expect(wrapper.find('.btn__logout')).toHaveLength(0);
    expect(wrapper.find('.btn__waiting-room')).toHaveLength(0);
    expect(wrapper.find('.btn__profile-page')).toHaveLength(0);
    expect(wrapper.find('.btn__premium-page')).toHaveLength(0);
    expect(wrapper.find('.btn__log-in')).toHaveLength(1);
    expect(wrapper.find('.btn__register')).toHaveLength(1);
  });

  it('should have all required elements on Big Screens with access Token', () => {
    window.matchMedia = createMatchMedia(1280) as any;
    wrapper = shallow(<HeaderComponent accessToken="TOKEN" />);
    expect(wrapper.find(AppBar)).toHaveLength(1);
    expect(wrapper.find(MenuIcon)).toHaveLength(0);
    expect(wrapper.find(Link)).toHaveLength(6);
    expect(wrapper.find('.portal-name')).toHaveLength(1);
    expect(wrapper.find('.btn__start-game')).toHaveLength(1);
    expect(wrapper.find('.btn__logout')).toHaveLength(1);
    expect(wrapper.find('.btn__profile-page')).toHaveLength(1);
    expect(wrapper.find('.btn__waiting-room')).toHaveLength(1);
    expect(wrapper.find('.btn__log-in')).toHaveLength(0);
    expect(wrapper.find('.btn__register')).toHaveLength(0);
  });

  it('should have all required elements on Big Screens with NO access Token', () => {
    window.matchMedia = createMatchMedia(1280) as any;
    wrapper = shallow(<HeaderComponent accessToken="" />);
    expect(wrapper.find(AppBar)).toHaveLength(1);
    expect(wrapper.find(MenuIcon)).toHaveLength(0);
    expect(wrapper.find(Link)).toHaveLength(3);
    expect(wrapper.find('.portal-name')).toHaveLength(1);
    expect(wrapper.find('.btn__start-game')).toHaveLength(0);
    expect(wrapper.find('.btn__logout')).toHaveLength(0);
    expect(wrapper.find('.btn__profile-page')).toHaveLength(0);
    expect(wrapper.find('.btn__waiting-room')).toHaveLength(0);
    expect(wrapper.find('.btn__log-in')).toHaveLength(1);
    expect(wrapper.find('.btn__register')).toHaveLength(1);
  });

  it('should call logout on logout btn click', () => {
    const logoutSpy = jest.spyOn(logoutThunk, 'logout');
    wrapper = shallow(<HeaderComponent accessToken="TOKEN" />);
    wrapper.find('.btn__logout').simulate('click');

    expect(logoutSpy).toHaveBeenCalled();
  });
});
