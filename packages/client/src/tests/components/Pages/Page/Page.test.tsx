import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';

import { PageComponent } from '../../../../components/Pages/Page/Page';
import PageContainer from '../../../../components/Shared/PageElements/PageContainer/PageContainer';
import * as getPageThunk from '../../../../store/pages/thunks/getPageData';
import { PageNames } from '../../../../store/pages/initialState.interface';

describe('<Page > component', () => {
  let wrapper: ShallowWrapper;
  let getPageThunkSpy: any;

  beforeEach(() => {
    getPageThunkSpy = jest.spyOn(getPageThunk, 'getPageData');
  });

  afterEach(() => {
    getPageThunkSpy.mockClear();
  });

  it('should have all required elements', () => {
    wrapper = shallow(<PageComponent slug={PageNames.Rules} />);
    expect(wrapper.find(PageContainer)).toHaveLength(1);
  });

  it('should call getPageData', () => {
    wrapper = shallow(<PageComponent slug={PageNames.Rules} />);
    expect(getPageThunkSpy).toHaveBeenCalledTimes(1);
  });
});
