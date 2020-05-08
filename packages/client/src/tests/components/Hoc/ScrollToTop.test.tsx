import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';

import { ScrollToTopComponent } from '../../../components/Hoc/ScrollToTop';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory: () => ({
    listen: (f) => f(),
  }),
}));

describe('<ScrollToTop /> HOC component', () => {
  let wrapper: ShallowWrapper;
  let scrollToTopSpy: any;

  beforeEach(() => {
    window.scrollTo = jest.fn();
    scrollToTopSpy = jest.spyOn(window, 'scrollTo');
  });

  afterEach(() => {
    scrollToTopSpy.mockClear();
  });

  it('should scroll to top', () => {
    wrapper = shallow(<ScrollToTopComponent />);
    expect(scrollToTopSpy).toHaveBeenCalledWith(0, 0);
  });
});
