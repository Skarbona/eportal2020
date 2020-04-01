import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { Button } from '@material-ui/core';

import {
  StartButtonComponent,
  Props,
} from '../../../../components/Pages/Game/GameSettings/StartButton';

describe('<StartButton /> component', () => {
  let wrapper: ShallowWrapper;
  let props: Props;

  it('should render all required elements', () => {
    props = { isFormValid: false };
    wrapper = shallow(<StartButtonComponent {...props} />);
    expect(wrapper.find(Button)).toHaveLength(1);
    expect(wrapper.find(Button).props().disabled).toEqual(true);
    expect(wrapper.find(Button).text()).toEqual('You have to select at least 10 categories');
  });

  it('should render all required elements if form is valid', () => {
    props = { isFormValid: true };
    wrapper = shallow(<StartButtonComponent {...props} />);
    expect(wrapper.find(Button)).toHaveLength(1);
    expect(wrapper.find(Button).props().disabled).toEqual(false);
    expect(wrapper.find(Button).text()).toEqual('Start a Game!');
  });
});
