import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { Grid, Typography } from '@material-ui/core';

import { SummaryComponent } from '../../../../components/Pages/Game/Levels/Summary';

describe('<Summary > component', () => {
  let wrapper: ShallowWrapper;

  it('should render all required items', () => {
    wrapper = shallow(<SummaryComponent />);
    expect(wrapper.find(Grid)).toHaveLength(1);
    expect(wrapper.find(Typography)).toHaveLength(1);
  });
});
