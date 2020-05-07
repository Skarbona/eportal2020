import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { Link } from '@material-ui/core';

import { FooterComponent } from '../../../components/Shared/PageElements/Footer/Footer';

describe('<Footer > component', () => {
  let wrapper: ShallowWrapper;

  it('should have all required items', () => {
    wrapper = shallow(<FooterComponent />);
    expect(wrapper.find('footer')).toHaveLength(1);
    expect(wrapper.find(Link)).toHaveLength(3);
  });
});
