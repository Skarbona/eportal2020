import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { AppBar, IconButton } from '@material-ui/core';
import { Link } from 'react-router-dom';

import * as logoutThunk from '../../../store/app/thunks/logout';
import { HeaderComponent } from '../../../components/Shared/PageElements/Header/Header';

describe('<Header > component', () => {
  let wrapper: ShallowWrapper;

  it('should have all required elements', () => {
    wrapper = shallow(<HeaderComponent accessToken="TOKEN" />);
    expect(wrapper.find(AppBar)).toHaveLength(1);
    expect(wrapper.find(IconButton)).toHaveLength(2);
    expect(wrapper.find(Link)).toHaveLength(4);
    expect(wrapper.find('.btn__start-game')).toHaveLength(1);
    expect(wrapper.find('.btn__logout')).toHaveLength(1);
    expect(wrapper.find('.btn__profile-page')).toHaveLength(1);
  });

  it('should render proper amount of links if token not provided', () => {
    wrapper = shallow(<HeaderComponent accessToken="" />);
    expect(wrapper.find(AppBar)).toHaveLength(1);
    expect(wrapper.find(IconButton)).toHaveLength(1);
    expect(wrapper.find(Link)).toHaveLength(3);
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
