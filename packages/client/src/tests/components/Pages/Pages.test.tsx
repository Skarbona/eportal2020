import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { Route } from 'react-router-dom';

import { PagesComponent } from '../../../components/Pages/Pages';
import Game from '../../../components/Pages/Game/Game';
import Main from '../../../components/Pages/Main/Main';
import AuthPage from '../../../components/Pages/AuthPage/AuthPage';

describe('<Pages > component', () => {
  let wrapper: ShallowWrapper;

  it('should have all required elements if access token exist', () => {
    wrapper = shallow(<PagesComponent accessToken="TOKEN" />);
    expect(wrapper.find(Game)).toHaveLength(1);
    expect(wrapper.find(Main)).toHaveLength(1);
    expect(wrapper.find(Route)).toHaveLength(2);

    expect(wrapper.find(AuthPage)).toHaveLength(0);
  });

  it('should have all required elements if access token NOT exist', () => {
    wrapper = shallow(<PagesComponent accessToken="" />);
    expect(wrapper.find(Main)).toHaveLength(1);
    expect(wrapper.find(AuthPage)).toHaveLength(1);
    expect(wrapper.find(Route)).toHaveLength(2);

    expect(wrapper.find(Game)).toHaveLength(0);
  });
});
