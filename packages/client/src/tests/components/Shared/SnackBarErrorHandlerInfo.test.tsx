import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { Alert } from '@material-ui/lab';
import * as redux from 'react-redux';

import { SnackBarErrorHandlerComponent } from '../../../components/Shared/UIElements/ErrorHandlerInfo/SnackBarErrorHandler';
import { ErrorTypes } from '../../../models/errors';

describe('<SnackBarErrorHandler > component', () => {
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
      type: ErrorTypes.FetchingCategories,
      error: true,
    });
    wrapper = shallow(<SnackBarErrorHandlerComponent />);
    expect(wrapper.find(Alert)).toHaveLength(0);
  });

  it('should have all required elements', () => {
    spyStore.mockReturnValue({
      type: ErrorTypes.UnAuthorizedWarning,
      error: true,
    });
    wrapper = shallow(<SnackBarErrorHandlerComponent />);
    expect(wrapper.find(Alert)).toHaveLength(1);
  });
});
