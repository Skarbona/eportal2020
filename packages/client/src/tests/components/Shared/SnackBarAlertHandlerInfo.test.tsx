import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { Alert } from '@material-ui/lab';
import * as redux from 'react-redux';

import { SnackBarAlertHandlerComponent } from '../../../components/Shared/UIElements/AlertHandlerInfo/SnackBarAlertHandler';
import { AlertTypes } from '../../../models/alerts';

describe('<SnackBarAlertHandler > component', () => {
  let wrapper: ShallowWrapper;
  let spyStore: any;

  beforeEach(() => {
    spyStore = jest.spyOn(redux, 'useSelector');
  });

  afterEach(() => {
    spyStore.mockClear();
  });

  it('should not render Alert if size is of type Big', () => {
    spyStore.mockReturnValue({
      type: AlertTypes.FetchingCategories,
      error: true,
    });
    wrapper = shallow(<SnackBarAlertHandlerComponent />);
    expect(wrapper.find(Alert)).toHaveLength(0);
  });

  it('should have all required elements', () => {
    spyStore.mockReturnValue({
      type: AlertTypes.UnAuthorizedWarning,
      error: true,
    });
    wrapper = shallow(<SnackBarAlertHandlerComponent />);
    expect(wrapper.find(Alert)).toHaveLength(1);
  });
});
