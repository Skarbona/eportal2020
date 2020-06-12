import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { Typography } from '@material-ui/core';

import { DeleteAccountComponent } from '../../../../components/Pages/Profile/Settings/DeleteAccount';
import AlertHandlerInfo from '../../../../components/Shared/UIElements/AlertHandlerInfo/AlertHandlerInfo';
import * as deleteUserThunk from '../../../../store/user/thunks/deleteUser';
import { mockedEvent } from '../../../../mocks/event';
import * as useFormActions from '../../../../hooks/form/state/actions';
import ConfirmAccountDelete from '../../../../components/Shared/Form/ConfirmAccountDelete';
import LoadingButton from '../../../../components/Shared/Form/LoadingButton';

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
    expect(wrapper.find(AlertHandlerInfo)).toHaveLength(1);
    expect(wrapper.find(ConfirmAccountDelete)).toHaveLength(1);
    expect(wrapper.find(LoadingButton)).toHaveLength(1);
    expect(wrapper.find(Typography)).toHaveLength(1);
    expect(wrapper.find('form')).toHaveLength(1);
    expect(wrapper.find(LoadingButton).props().disabled).toEqual(true);
  });

  it('should handle submit event', () => {
    wrapper.find('form').simulate('submit', mockedEvent);
    expect(deleteUserThunkSpy).toHaveBeenCalled();
  });
});
