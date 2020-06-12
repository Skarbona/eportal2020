import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';

import { InitResetPasswordComponent } from '../../../../components/Pages/ResetPassword/Init';
import AlertHandler from '../../../../components/Shared/UIElements/AlertHandlerInfo/AlertHandlerInfo';
import * as getResetPasswordLinkThunk from '../../../../store/user/thunks/getResetPasswordLink';
import { mockedEvent } from '../../../../mocks/event';
import Email from '../../../../components/Shared/Form/Email';
import LoadingButton from '../../../../components/Shared/Form/LoadingButton';

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
    expect(wrapper.find(Email)).toHaveLength(1);
    expect(wrapper.find(LoadingButton)).toHaveLength(1);
  });

  it('Button should be disabled by default', () => {
    wrapper = shallow(<InitResetPasswordComponent />);
    expect(wrapper.find(LoadingButton).props().disabled).toEqual(true);
  });

  it('should call getResetPasswordLink on button click', () => {
    wrapper = shallow(<InitResetPasswordComponent />);
    wrapper.find('form').simulate('submit', mockedEvent);
    expect(getResetPasswordLinkSpy).toHaveBeenCalled();
  });
});
