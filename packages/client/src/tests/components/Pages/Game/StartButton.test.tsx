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
    props = { formValidation: { preferences: true, taskPerLevel: false }, isLoading: false };
    wrapper = shallow(<StartButtonComponent {...props} />);
    expect(wrapper.find(LoadingButton)).toHaveLength(1);
    expect(wrapper.find(LoadingButton).props().disabled).toEqual(true);
  });

  it('should render all required elements if form is valid', () => {
    props = { formValidation: { preferences: true, taskPerLevel: true }, isLoading: false };
    wrapper = shallow(<StartButtonComponent {...props} />);
    expect(wrapper.find(LoadingButton)).toHaveLength(1);
    expect(wrapper.find(LoadingButton).props().disabled).toEqual(false);
    expect(wrapper.find(LoadingButton).text()).toEqual('Start a Game!');
  });
});
