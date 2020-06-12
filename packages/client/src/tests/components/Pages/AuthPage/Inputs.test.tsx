import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';

import { InputsComponent, Props } from '../../../../components/Pages/AuthPage/Inputs';
import { initialState } from '../../../../hooks/form/state/initialState';
import Password from '../../../../components/Shared/Form/Password';
import Email from '../../../../components/Shared/Form/Email';
import ConfirmEmail from '../../../../components/Shared/Form/ConfirmEmail';
import PrivacyPolicy from '../../../../components/Shared/Form/PrivacyPolicy';
import UserName from '../../../../components/Shared/Form/UserName';

describe('<Inputs /> component', () => {
  let wrapper: ShallowWrapper;
  let props: Props;

  beforeEach(() => {
    props = {
      inputChanged: jest.fn(),
      checkBoxChanged: jest.fn(),
      inputs: initialState.inputs,
      isRegisterMode: true,
    };
    wrapper = shallow(<InputsComponent {...props} />);
  });

  it('should render all required elements (Register Page)', () => {
    expect(wrapper.find(Email)).toHaveLength(1);
    expect(wrapper.find(ConfirmEmail)).toHaveLength(1);
    expect(wrapper.find(UserName)).toHaveLength(1);
    expect(wrapper.find(Password)).toHaveLength(1);
    expect(wrapper.find(PrivacyPolicy)).toHaveLength(1);
  });

  it('should render all required elements (Login Page)', () => {
    props.isRegisterMode = false;
    wrapper = shallow(<InputsComponent {...props} />);
    expect(wrapper.find(Email)).toHaveLength(1);
    expect(wrapper.find(ConfirmEmail)).toHaveLength(0);
    expect(wrapper.find(UserName)).toHaveLength(0);
    expect(wrapper.find(Password)).toHaveLength(1);
    expect(wrapper.find(PrivacyPolicy)).toHaveLength(0);
  });
});
