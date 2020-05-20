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
      checkBoxChanged: jest.fn(),
      inputs: initialState.inputs,
      isRegisterMode: true,
    };
    wrapper = shallow(<InputsComponent {...props} />);
  });

  it('should render all required elements (Register Page)', () => {
    expect(wrapper.find('#email')).toHaveLength(1);
    expect(wrapper.find('#confirmed-email')).toHaveLength(1);
    expect(wrapper.find('#username')).toHaveLength(1);
    expect(wrapper.find('#password')).toHaveLength(1);
    expect(wrapper.find('#password')).toHaveLength(1);
    expect(wrapper.find('#privacy-policy')).toHaveLength(1);
  });

  it('should render all required elements (Login Page)', () => {
    props.isRegisterMode = false;
    wrapper = shallow(<InputsComponent {...props} />);
    expect(wrapper.find('#email')).toHaveLength(1);
    expect(wrapper.find('#confirmed-email')).toHaveLength(0);
    expect(wrapper.find('#username')).toHaveLength(0);
    expect(wrapper.find('#password')).toHaveLength(1);
    expect(wrapper.find('#privacy-policy')).toHaveLength(0);
  });

  it('should call handler on email changed', () => {
    wrapper.find('#email').simulate('change');
    expect(props.inputChanged).toHaveBeenCalled();
  });

  it('should call handler on email blurred', () => {
    wrapper.find('#email').simulate('blur');
    expect(props.inputChanged).toHaveBeenCalled();
  });

  it('should call handler on confirmed email changed', () => {
    wrapper.find('#confirmed-email').simulate('change');
    expect(props.inputChanged).toHaveBeenCalled();
  });

  it('should call handler on confirmed email blurred', () => {
    wrapper.find('#confirmed-email').simulate('blur');
    expect(props.inputChanged).toHaveBeenCalled();
  });

  it('should call handler on username changed', () => {
    wrapper.find('#username').simulate('change');
    expect(props.inputChanged).toHaveBeenCalled();
  });

  it('should call handler on username blurred', () => {
    wrapper.find('#username').simulate('blur');
    expect(props.inputChanged).toHaveBeenCalled();
  });

  it('should call handler on password changed', () => {
    wrapper.find('#password').simulate('change');
    expect(props.inputChanged).toHaveBeenCalled();
  });

  it('should call handler on password blurred', () => {
    wrapper.find('#password').simulate('blur');
    expect(props.inputChanged).toHaveBeenCalled();
  });

  it('should call handler on checkbox changed', () => {
    const checkbox = wrapper.find('#privacy-policy') as any;
    checkbox.prop('control').props.onChange({ target: { checked: true }, persist: jest.fn() });

    expect(props.checkBoxChanged).toHaveBeenCalled();
  });
});
