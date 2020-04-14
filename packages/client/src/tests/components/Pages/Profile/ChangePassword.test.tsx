import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { TextField, Button, Typography } from '@material-ui/core';

import { ChangePasswordComponent } from '../../../../components/Pages/Profile/Settings/ChangePassword';
import ErrorHandler from '../../../../components/Shared/UIElements/ErrorHandlerInfo/ErrorHandlerInfo';
import * as changePasswordThunk from '../../../../store/user/thunks/changePassword';
import { mockedEvent, MockedEventWithValues } from '../../../../mocks/event';
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
    expect(wrapper.find(ErrorHandler)).toHaveLength(1);
    expect(wrapper.find(TextField)).toHaveLength(1);
    expect(wrapper.find(Button)).toHaveLength(1);
    expect(wrapper.find(Typography)).toHaveLength(1);
    expect(wrapper.find('form')).toHaveLength(1);
    expect(wrapper.find(Button).props().disabled).toEqual(true);
  });

  it('should handle submit event', () => {
    wrapper.find('form').simulate('submit', mockedEvent);
    expect(changePasswordSpy).toHaveBeenCalled();
  });

  it('should handle TextField change event', () => {
    wrapper.find(TextField).simulate('change', MockedEventWithValues());
    expect(inputChangedSpy).toHaveBeenCalled();
  });
});
