import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { TextField, Button, Typography } from '@material-ui/core';

import { DeleteAccountComponent } from '../../../../components/Pages/Profile/Settings/DeleteAccount';
import ErrorHandlerInfo from '../../../../components/Shared/UIElements/ErrorHandlerInfo/ErrorHandlerInfo';
import * as deleteUserThunk from '../../../../store/user/thunks/deleteUser';
import { mockedEvent, MockedEventWithValues } from '../../../../mocks/event';
import * as useFormActions from '../../../../hooks/form/state/actions';

describe('<DeleteAccount > component', () => {
  let wrapper: ShallowWrapper;
  let deleteUserThunkSpy: any;
  let confirmAccountDeleteChanged: any;

  beforeEach(() => {
    deleteUserThunkSpy = jest.spyOn(deleteUserThunk, 'deleteUser');
    confirmAccountDeleteChanged = jest.spyOn(useFormActions, 'confirmAccountDeleteChanged');
    wrapper = shallow(<DeleteAccountComponent />);
  });

  afterEach(() => {
    deleteUserThunkSpy.mockClear();
    confirmAccountDeleteChanged.mockClear();
  });

  it('should have all required elements', () => {
    expect(wrapper.find(ErrorHandlerInfo)).toHaveLength(1);
    expect(wrapper.find(TextField)).toHaveLength(1);
    expect(wrapper.find(Button)).toHaveLength(1);
    expect(wrapper.find(Typography)).toHaveLength(1);
    expect(wrapper.find('form')).toHaveLength(1);
    expect(wrapper.find(Button).props().disabled).toEqual(true);
  });

  it('should handle submit event', () => {
    wrapper.find('form').simulate('submit', mockedEvent);
    expect(deleteUserThunkSpy).toHaveBeenCalled();
  });

  it('should handle TextField change event', () => {
    wrapper.find(TextField).simulate('change', MockedEventWithValues());
    expect(confirmAccountDeleteChanged).toHaveBeenCalled();
  });
});
