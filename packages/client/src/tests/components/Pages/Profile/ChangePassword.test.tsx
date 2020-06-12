import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { Typography } from '@material-ui/core';

import { ChangePasswordComponent } from '../../../../components/Pages/Profile/Settings/ChangePassword';
import AlertHandler from '../../../../components/Shared/UIElements/AlertHandlerInfo/AlertHandlerInfo';
import * as changePasswordThunk from '../../../../store/user/thunks/changePassword';
import { mockedEvent } from '../../../../mocks/event';
import Password from '../../../../components/Shared/Form/Password';
import LoadingButton from '../../../../components/Shared/Form/LoadingButton';
import * as useFormActions from '../../../../hooks/form/state/actions';

describe('<ChangePassword > component', () => {
  let wrapper: ShallowWrapper;
  let changePasswordSpy: any;
  let inputChangedSpy: any;

  beforeEach(() => {
    changePasswordSpy = jest.spyOn(changePasswordThunk, 'changePassword');
    inputChangedSpy = jest.spyOn(useFormActions, 'inputChanged');
    wrapper = shallow(<ChangePasswordComponent />);
  });

  afterEach(() => {
    changePasswordSpy.mockClear();
    inputChangedSpy.mockClear();
  });

  it('should have all required elements', () => {
    expect(wrapper.find(AlertHandler)).toHaveLength(1);
    expect(wrapper.find(Password)).toHaveLength(1);
    expect(wrapper.find(LoadingButton)).toHaveLength(1);
    expect(wrapper.find(Typography)).toHaveLength(1);
    expect(wrapper.find('form')).toHaveLength(1);
    expect(wrapper.find(LoadingButton).props().disabled).toEqual(true);
  });

  it('should handle submit event', () => {
    wrapper.find('form').simulate('submit', mockedEvent);
    expect(changePasswordSpy).toHaveBeenCalled();
  });
});
