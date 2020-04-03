import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { ThemeProvider } from '@material-ui/styles';

import Header from '../../components/Shared/PageElements/Header/Header';
import Pages from '../../components/Pages/Pages';
import * as userThunk from '../../store/user/thunk';

import { App } from '../../components/App';

jest.mock('../../store/user/thunk', () => ({
  fetchUserData: jest.fn(),
}));

describe('<App > component', () => {
  let wrapper: ShallowWrapper;

  beforeEach(() => {
    wrapper = shallow(<App />);
  });

  it('should have all required elements', () => {
    expect(wrapper.find(ThemeProvider)).toHaveLength(1);
    expect(wrapper.find(Header)).toHaveLength(1);
    expect(wrapper.find(Pages)).toHaveLength(1);
  });

  it.skip('should try fetch user Data', () => {
    // TODO: Implement mocks for token and id
    expect(userThunk.fetchUserData).toHaveBeenCalled();
  });
});
