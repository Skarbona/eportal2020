import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';

import { MainComponent } from '../../../../components/Pages/Main/Main';
import PageContainer from '../../../../components/Shared/PageElements/PageContainer/PageContainer';
import * as getPageThunk from '../../../../store/pages/thunks/getPageData';

describe('<Main > component', () => {
  let wrapper: ShallowWrapper;
  let getPageThunkSpy: any;

  beforeEach(() => {
    getPageThunkSpy = jest.spyOn(getPageThunk, 'getPageData');
  });

  afterEach(() => {
    getPageThunkSpy.mockClear();
  });

  it('should have all required elements', () => {
    wrapper = shallow(<MainComponent isLoggedIn />);
    expect(wrapper.find(PageContainer)).toHaveLength(4);
  });

  it('should call getPageData', () => {
    wrapper = shallow(<MainComponent isLoggedIn />);
    expect(getPageThunkSpy).toHaveBeenCalledTimes(1);
  });
});
