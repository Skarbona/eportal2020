import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';

import {
  StartButtonComponent,
  Props,
} from '../../../../components/Pages/Game/GameSettings/StartButton';
import LoadingButton from '../../../../components/Shared/Form/LoadingButton';

describe('<StartButton /> component', () => {
  let wrapper: ShallowWrapper;
  let props: Props;

  it('should render all required elements', () => {
    props = { isFormValid: false, isLoading: false };
    wrapper = shallow(<StartButtonComponent {...props} />);
    expect(wrapper.find(LoadingButton)).toHaveLength(1);
    expect(wrapper.find(LoadingButton).props().disabled).toEqual(true);
    expect(wrapper.find(LoadingButton).text()).toEqual('You have to select at least 10 categories');
  });

  it('should render all required elements if form is valid', () => {
    props = { isFormValid: true, isLoading: false };
    wrapper = shallow(<StartButtonComponent {...props} />);
    expect(wrapper.find(LoadingButton)).toHaveLength(1);
    expect(wrapper.find(LoadingButton).props().disabled).toEqual(false);
    expect(wrapper.find(LoadingButton).text()).toEqual('Start a Game!');
  });
});
