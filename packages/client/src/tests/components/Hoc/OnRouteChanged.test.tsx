import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';

import { OnRouteChangedComponent } from '../../../components/Hoc/OnRouteChanged';
import * as cleanAlertsThunk from '../../../store/app/thunks/cleanAlerts';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory: () => ({
    listen: (f: any) => f(),
  }),
}));

describe('<OnRouteChanged /> HOC component', () => {
  let wrapper: ShallowWrapper;
  let scrollToTopSpy: any;
  let cleanAlertsThunkSpy: any;

  beforeEach(() => {
    window.scrollTo = jest.fn();
    cleanAlertsThunkSpy = jest.spyOn(cleanAlertsThunk, 'cleanAlertsHandler');
    scrollToTopSpy = jest.spyOn(window, 'scrollTo');
  });

  afterEach(() => {
    scrollToTopSpy.mockClear();
    cleanAlertsThunkSpy.mockClear();
  });

  it('should scroll to top', () => {
    wrapper = shallow(<OnRouteChangedComponent />);
    expect(scrollToTopSpy).toHaveBeenCalledWith(0, 0);
    expect(cleanAlertsThunkSpy).toHaveBeenCalled();
  });
});
