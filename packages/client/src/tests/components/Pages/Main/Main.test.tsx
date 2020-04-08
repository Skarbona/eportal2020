import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';

import { MainComponent } from '../../../../components/Pages/Main/Main';

describe('<Main > component', () => {
  let wrapper: ShallowWrapper;

  it('should have all required elements', () => {
    wrapper = shallow(<MainComponent />);
    expect(wrapper.find('div')).toHaveLength(1);
  });
});
