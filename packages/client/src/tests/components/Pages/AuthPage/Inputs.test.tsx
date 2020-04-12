import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';

import { InputsComponent, Props } from '../../../../components/Pages/AuthPage/Inputs';
import { initialState } from '../../../../hooks/form/state/initialState';

describe('<Inputs /> component', () => {
  let wrapper: ShallowWrapper;
  let props: Props;

  beforeEach(() => {
    props = {
      inputChanged: jest.fn(),
      inputs: initialState.inputs,
      isRegisterMode: true,
    };
  });

  it('should render all required elements (Register Page)', () => {
    wrapper = shallow(<InputsComponent {...props} />);
    expect(wrapper.find('#email')).toHaveLength(1);
    expect(wrapper.find('#confirmed-email')).toHaveLength(1);
    expect(wrapper.find('#username')).toHaveLength(1);
    expect(wrapper.find('#password')).toHaveLength(1);
  });

  it('should render all required elements (Login Page)', () => {
    props.isRegisterMode = false;
    wrapper = shallow(<InputsComponent {...props} />);
    expect(wrapper.find('#email')).toHaveLength(1);
    expect(wrapper.find('#confirmed-email')).toHaveLength(0);
    expect(wrapper.find('#username')).toHaveLength(0);
    expect(wrapper.find('#password')).toHaveLength(1);
  });

  it('should call handler on email changed', () => {
    wrapper = shallow(<InputsComponent {...props} />);
    wrapper.find('#email').simulate('change');
    expect(props.inputChanged).toHaveBeenCalled();
  });

  it('should call handler on confirmed email changed', () => {
    wrapper = shallow(<InputsComponent {...props} />);
    wrapper.find('#confirmed-email').simulate('change');
    expect(props.inputChanged).toHaveBeenCalled();
  });

  it('should call handler on username changed', () => {
    wrapper = shallow(<InputsComponent {...props} />);
    wrapper.find('#username').simulate('change');
    expect(props.inputChanged).toHaveBeenCalled();
  });

  it('should call handler on password changed', () => {
    wrapper = shallow(<InputsComponent {...props} />);
    wrapper.find('#password').simulate('change');
    expect(props.inputChanged).toHaveBeenCalled();
  });
});
