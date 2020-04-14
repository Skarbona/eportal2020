import React from 'react';
import { shallow } from 'enzyme';
import { Box } from '@material-ui/core';

import { TabPanel } from '../../utils/profile-settings';

describe('TabPanel utility function', () => {
  it('should render all required items', () => {
    const wrapper = shallow(<TabPanel value={0} index={0} />);
    expect(wrapper.find(Box)).toHaveLength(1);
  });
});
