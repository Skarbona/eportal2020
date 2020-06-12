import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { BottomNavigation, BottomNavigationAction } from '@material-ui/core';
import * as reactRouterDom from 'react-router-dom';

import { BottomNavigationComponent } from '../../../components/Shared/PageElements/BottomNavigation/BottomNavigation';

describe('<BottomNavigation > component', () => {
  let wrapper: ShallowWrapper;

  it('should render all required items if has access token', () => {
    jest.spyOn(reactRouterDom, 'useHistory').mockImplementation(
      () =>
        ({
          location: {
            pathname: '/gra',
          },
        } as any),
    );
    wrapper = shallow(<BottomNavigationComponent accessToken="token" />);
    expect(wrapper.find(BottomNavigation)).toHaveLength(1);
    expect(wrapper.find(BottomNavigationAction)).toHaveLength(3);
    expect(wrapper.find(BottomNavigationAction).at(0).props().label).toEqual('Play!');
    expect(wrapper.find(BottomNavigationAction).at(1).props().label).toEqual('Profile');
    expect(wrapper.find(BottomNavigationAction).at(2).props().label).toEqual('Contact');
  });

  it('should render all required items if has NO access token', () => {
    jest.spyOn(reactRouterDom, 'useHistory').mockImplementation(
      () =>
        ({
          location: {
            pathname: '/',
          },
        } as any),
    );
    wrapper = shallow(<BottomNavigationComponent accessToken="" />);
    expect(wrapper.find(BottomNavigation)).toHaveLength(1);
    expect(wrapper.find(BottomNavigation).props().value).toEqual('/');
    expect(wrapper.find(BottomNavigationAction)).toHaveLength(3);
    expect(wrapper.find(BottomNavigationAction).at(0).props().label).toEqual('Log in');
    expect(wrapper.find(BottomNavigationAction).at(1).props().label).toEqual('Register');
    expect(wrapper.find(BottomNavigationAction).at(2).props().label).toEqual('Contact');
  });
});
