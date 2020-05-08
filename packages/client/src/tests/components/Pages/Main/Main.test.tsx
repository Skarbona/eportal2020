import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';

import { MainComponent } from '../../../../components/Pages/Main/Main';
import PageContainer from '../../../../components/Shared/PageElements/PageContainer/PageContainer';

describe('<Main > component', () => {
  let wrapper: ShallowWrapper;

  it('should have all required elements', () => {
    wrapper = shallow(<MainComponent isLoggedIn />);
    expect(wrapper.find(PageContainer)).toHaveLength(2);
  });
});
