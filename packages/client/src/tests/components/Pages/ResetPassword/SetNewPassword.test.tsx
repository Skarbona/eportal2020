import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { TextField, Button } from '@material-ui/core';

import { SetNewPasswordComponent } from '../../../../components/Pages/ResetPassword/SetNewPassword';
import AlertHandler from '../../../../components/Shared/UIElements/AlertHandlerInfo/AlertHandlerInfo';
import * as changePasswordThunk from '../../../../store/user/thunks/changePassword';
import { mockedEvent } from '../../../../mocks/event';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: jest.fn(() => ({
    token: 'token',
  })),
}));

describe('<SetNewPassword > component', () => {
  let wrapper: ShallowWrapper;
  let changePasswordSpy: any;

  beforeEach(() => {
    changePasswordSpy = jest.spyOn(changePasswordThunk, 'changePassword');
  });

  afterEach(() => {
    changePasswordSpy.mockClear();
  });

  it('should have all required elements', () => {
    wrapper = shallow(<SetNewPasswordComponent />);
    expect(wrapper.find('form')).toHaveLength(1);
    expect(wrapper.find(AlertHandler)).toHaveLength(1);
    expect(wrapper.find(TextField)).toHaveLength(1);
    expect(wrapper.find(Button)).toHaveLength(1);
  });

  it('Button should be disabled by default', () => {
    wrapper = shallow(<SetNewPasswordComponent />);
    expect(wrapper.find(Button).props().disabled).toEqual(true);
  });

  it('Button should be active if password is valid', () => {
    wrapper = shallow(<SetNewPasswordComponent />);
    wrapper.find(TextField).simulate('change', {
      target: {
        name: 'password',
        value: 'aaAA1111',
      },
    });
    expect(wrapper.find(Button).props().disabled).toEqual(false);
  });

  it('should call changePasswordSpy on button click', () => {
    wrapper = shallow(<SetNewPasswordComponent />);
    wrapper.find(TextField).simulate('change', {
      target: {
        name: 'password',
        value: 'aaAA1111',
      },
    });
    wrapper.find('form').simulate('submit', mockedEvent);
    expect(changePasswordSpy).toHaveBeenCalledWith('aaAA1111', 'token');
  });
});
