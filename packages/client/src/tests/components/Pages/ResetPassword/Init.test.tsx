import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { TextField, Button } from '@material-ui/core';

import { InitResetPasswordComponent } from '../../../../components/Pages/ResetPassword/Init';
import AlertHandler from '../../../../components/Shared/UIElements/AlertHandlerInfo/AlertHandlerInfo';
import * as getResetPasswordLinkThunk from '../../../../store/user/thunks/getResetPasswordLink';
import { mockedEvent } from '../../../../mocks/event';

describe('<InitResetPassword > component', () => {
  let wrapper: ShallowWrapper;
  let getResetPasswordLinkSpy: any;

  beforeEach(() => {
    getResetPasswordLinkSpy = jest.spyOn(getResetPasswordLinkThunk, 'getResetPasswordLink');
  });

  afterEach(() => {
    getResetPasswordLinkSpy.mockClear();
  });

  it('should have all required elements', () => {
    wrapper = shallow(<InitResetPasswordComponent />);
    expect(wrapper.find('form')).toHaveLength(1);
    expect(wrapper.find(AlertHandler)).toHaveLength(1);
    expect(wrapper.find(TextField)).toHaveLength(1);
    expect(wrapper.find(Button)).toHaveLength(1);
  });

  it('Button should be disabled by default', () => {
    wrapper = shallow(<InitResetPasswordComponent />);
    expect(wrapper.find(Button).props().disabled).toEqual(true);
  });

  it('Button should be active if email is valid', () => {
    wrapper = shallow(<InitResetPasswordComponent />);
    wrapper.find(TextField).simulate('change', {
      target: {
        name: 'email',
        value: 'valid@valid.pl',
      },
    });
    expect(wrapper.find(Button).props().disabled).toEqual(false);
  });

  it('should call getResetPasswordLink on button click', () => {
    wrapper = shallow(<InitResetPasswordComponent />);
    wrapper.find(TextField).simulate('change', {
      target: {
        name: 'email',
        value: 'valid@valid.pl',
      },
    });
    wrapper.find('form').simulate('submit', mockedEvent);
    expect(getResetPasswordLinkSpy).toHaveBeenCalledWith('valid@valid.pl');
  });
});
