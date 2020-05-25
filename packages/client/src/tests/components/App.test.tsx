import React from 'react';
import * as redux from 'react-redux';
import { shallow, ShallowWrapper } from 'enzyme';
import { ThemeProvider } from '@material-ui/styles';

import Header from '../../components/Shared/PageElements/Header/Header';
import Footer from '../../components/Shared/PageElements/Footer/Footer';
import BottomNavigation from '../../components/Shared/PageElements/BottomNavigation/BottomNavigation';
import Pages from '../../components/Pages/Pages';
import AutoHOC from '../../components/Hoc/AuthHOC';
import SnackBarAlertHandler from '../../components/Shared/UIElements/AlertHandlerInfo/SnackBarAlertHandler';
import { App } from '../../components/App';
import * as fetchUserDataThunk from '../../store/user/thunks/fetchUserData';
import { createMatchMedia } from '../helpers';

describe('<App > component', () => {
  let wrapper: ShallowWrapper;
  let spyStore: any;
  let spyFetchUserData: any;

  beforeEach(() => {
    spyStore = jest.spyOn(redux, 'useSelector');
    spyFetchUserData = jest.spyOn(fetchUserDataThunk, 'fetchUserData');
  });

  afterEach(() => {
    spyStore.mockClear();
    spyFetchUserData.mockClear();
  });

  it('should have all required elements on Big Screens', () => {
    window.matchMedia = createMatchMedia(1280) as any;
    wrapper = shallow(<App />);
    expect(wrapper.find(ThemeProvider)).toHaveLength(1);
    expect(wrapper.find(AutoHOC)).toHaveLength(1);
    expect(wrapper.find(Header)).toHaveLength(1);
    expect(wrapper.find(Pages)).toHaveLength(1);
    expect(wrapper.find(SnackBarAlertHandler)).toHaveLength(1);
    expect(wrapper.find(Footer)).toHaveLength(1);
    expect(wrapper.find(BottomNavigation)).toHaveLength(0);
  });

  it('should have all required elements on Small Screens', () => {
    window.matchMedia = createMatchMedia(600) as any;
    wrapper = shallow(<App />);
    expect(wrapper.find(ThemeProvider)).toHaveLength(1);
    expect(wrapper.find(AutoHOC)).toHaveLength(1);
    expect(wrapper.find(Header)).toHaveLength(1);
    expect(wrapper.find(Pages)).toHaveLength(1);
    expect(wrapper.find(SnackBarAlertHandler)).toHaveLength(1);
    expect(wrapper.find(Footer)).toHaveLength(1);
    expect(wrapper.find(BottomNavigation)).toHaveLength(1);
  });

  it('should try fetch user Data', () => {
    spyStore.mockReturnValue({
      accessToken: 'TOKEN',
      id: null,
      expirationTokenDate: new Date(2030, 10, 10),
    });
    wrapper = shallow(<App />);
    expect(spyFetchUserData).toHaveBeenCalled();
  });

  it('should not try fetch user Data if no access token', () => {
    spyStore.mockReturnValue({
      accessToken: null,
      expirationTokenDate: null,
      id: null,
    });
    wrapper = shallow(<App />);
    expect(spyFetchUserData).not.toHaveBeenCalled();
  });

  it('should not try fetch user Data if data already in store', () => {
    spyStore.mockReturnValue({
      accessToken: 'TOKEN',
      expirationTokenDate: new Date().getTime() + 360000,
      id: 'ID',
    });
    wrapper = shallow(<App />);
    expect(spyFetchUserData).not.toHaveBeenCalled();
  });
});
