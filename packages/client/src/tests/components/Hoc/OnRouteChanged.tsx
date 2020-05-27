import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';

import { OnRouteChangedComponent } from '../../../components/Hoc/OnRouteChanged';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory: () => ({
    listen: (f: any) => f(),
  }),
}));

describe('<OnRouteChanged /> HOC component', () => {
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
    wrapper = shallow(<OnRouteChangedComponent />);
    expect(scrollToTopSpy).toHaveBeenCalledWith(0, 0);
  });
});
