import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';

import { SetNewPasswordComponent } from '../../../../components/Pages/ResetPassword/SetNewPassword';
import AlertHandler from '../../../../components/Shared/UIElements/AlertHandlerInfo/AlertHandlerInfo';
import * as changePasswordThunk from '../../../../store/user/thunks/changePassword';
import { mockedEvent } from '../../../../mocks/event';
import Password from '../../../../components/Shared/Form/Password';
import LoadingButton from '../../../../components/Shared/Form/LoadingButton';

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
    expect(wrapper.find(Password)).toHaveLength(1);
    expect(wrapper.find(LoadingButton)).toHaveLength(1);
  });

  it('Button should be disabled by default', () => {
    wrapper = shallow(<SetNewPasswordComponent />);
    expect(wrapper.find(LoadingButton).props().disabled).toEqual(true);
  });

  it('should call changePasswordSpy on button click', () => {
    wrapper = shallow(<SetNewPasswordComponent />);
    wrapper.find('form').simulate('submit', mockedEvent);
    expect(changePasswordSpy).toHaveBeenCalledWith('', 'token');
  });
});
