import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { Typography, Card, CardContent, Button } from '@material-ui/core';

import { CardInfoComponent } from '../../../../components/Pages/Profile/CardInfo';

describe('<CardInfo > component', () => {
  let wrapper: ShallowWrapper;

  it('should have all required elements', () => {
    wrapper = shallow(<CardInfoComponent name="name" email="email" />);
    expect(wrapper.find(Typography)).toHaveLength(2);
    expect(wrapper.find(Card)).toHaveLength(2);
    expect(wrapper.find(CardContent)).toHaveLength(2);
    expect(wrapper.find(Button)).toHaveLength(2);
  });
});
