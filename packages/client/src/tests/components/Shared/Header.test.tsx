import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { AppBar, IconButton } from '@material-ui/core';

import { HeaderComponent } from '../../../components/Shared/PageElements/Header/Header';

describe('<Header > component', () => {
  let wrapper: ShallowWrapper;

  beforeEach(() => {
    wrapper = shallow(<HeaderComponent />);
  });

  it('should have all required elements', () => {
    expect(wrapper.find(AppBar)).toHaveLength(1);
    expect(wrapper.find(IconButton)).toHaveLength(1);
  });
});
