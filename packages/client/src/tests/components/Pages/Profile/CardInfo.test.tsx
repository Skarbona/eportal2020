import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { Typography, Card, CardContent, Button } from '@material-ui/core';

import { CardInfoComponent } from '../../../../components/Pages/Profile/CardInfo';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory: jest.fn(() => ({
    push: (path: string) => {},
  })),
}));

describe('<CardInfo > component', () => {
  let wrapper: ShallowWrapper;

  it('should have all required elements', () => {
    wrapper = shallow(<CardInfoComponent name="name" email="email" />);
    expect(wrapper.find(Typography)).toHaveLength(2);
    expect(wrapper.find(Card)).toHaveLength(3);
    expect(wrapper.find(CardContent)).toHaveLength(3);
    expect(wrapper.find(Button)).toHaveLength(3);
  });
});
