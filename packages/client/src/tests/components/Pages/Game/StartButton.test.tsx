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
    expect(wrapper.find(Button).text()).toEqual('Musisz zaznaczyć przynajmniej 10 kategorii');
  });

  it('should render all required elements if form is valid', () => {
    props = { isFormValid: true };
    wrapper = shallow(<StartButtonComponent {...props} />);
    expect(wrapper.find(Button)).toHaveLength(1);
    expect(wrapper.find(Button).props().disabled).toEqual(false);
    expect(wrapper.find(Button).text()).toEqual('Rozpocznij Grę!');
  });
});
