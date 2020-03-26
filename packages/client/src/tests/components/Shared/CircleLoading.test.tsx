import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { Backdrop } from '@material-ui/core';

import { CircleLoadingComponent } from '../../../components/Shared/UIElements/Loading/CircleLoading';

describe('<CircleLoading > component', () => {
  let wrapper: ShallowWrapper;

  beforeEach(() => {
    wrapper = shallow(<CircleLoadingComponent />);
  });

  it('should have all required elements', () => {
    expect(wrapper.find(Backdrop)).toHaveLength(1);
    expect(wrapper.find(Backdrop).find('div')).toHaveLength(13);
  });
});
