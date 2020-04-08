import React from 'react';
import * as redux from 'react-redux';
import { shallow, ShallowWrapper } from 'enzyme';
import { ThemeProvider } from '@material-ui/styles';

import Header from '../../components/Shared/PageElements/Header/Header';
import Pages from '../../components/Pages/Pages';
import AutoHOC from '../../components/Hoc/AuthHOC';
import SnackBarErrorHandler from '../../components/Shared/UIElements/ErrorHandlerInfo/SnackBarErrorHandler';
import { App } from '../../components/App';
import * as fetchUserDataThunk from '../../store/user/thunks/fetchUserData';

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

  it('should have all required elements', () => {
    wrapper = shallow(<App />);
    expect(wrapper.find(ThemeProvider)).toHaveLength(1);
    expect(wrapper.find(AutoHOC)).toHaveLength(1);
    expect(wrapper.find(Header)).toHaveLength(1);
    expect(wrapper.find(Pages)).toHaveLength(1);
    expect(wrapper.find(SnackBarErrorHandler)).toHaveLength(1);
  });

  it('should try fetch user Data', () => {
    spyStore.mockReturnValue({
      accessToken: 'TOKEN',
      id: null,
    });
    wrapper = shallow(<App />);
    expect(spyFetchUserData).toHaveBeenCalled();
  });

  it('should not try fetch user Data if no access token', () => {
    spyStore.mockReturnValue({
      accessToken: null,
      id: null,
    });
    wrapper = shallow(<App />);
    expect(spyFetchUserData).not.toHaveBeenCalled();
  });

  it('should not try fetch user Data if data already in store', () => {
    spyStore.mockReturnValue({
      accessToken: 'TOKEN',
      id: 'ID',
    });
    wrapper = shallow(<App />);
    expect(spyFetchUserData).not.toHaveBeenCalled();
  });
});
