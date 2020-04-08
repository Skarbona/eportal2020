import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { Alert } from '@material-ui/lab';

import {
  ErrorHandlerComponent,
  Props,
} from '../../../components/Shared/UIElements/ErrorHandlerInfo/ErrorHandlerInfo';
import { ErrorTypes } from '../../../models/errors';

describe('<ErrorHandlerInfo > component', () => {
  let wrapper: ShallowWrapper;
  let props: Props;

  it('should have all required elements', () => {
    props = {
      type: ErrorTypes.FetchingCategories,
      error: true,
    };
    wrapper = shallow(<ErrorHandlerComponent {...props} />);
    expect(wrapper.find(Alert)).toHaveLength(1);
  });

  it('should not render Alert if size is of type SnackBar', () => {
    props = {
      type: ErrorTypes.UnAuthorizedWarning,
      error: true,
    };
    wrapper = shallow(<ErrorHandlerComponent {...props} />);
    expect(wrapper.find(Alert)).toHaveLength(0);
  });
});
