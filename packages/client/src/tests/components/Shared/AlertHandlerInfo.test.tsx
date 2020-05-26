import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { Alert } from '@material-ui/lab';

import {
  AlertHandlerComponent,
  Props,
} from '../../../components/Shared/UIElements/AlertHandlerInfo/AlertHandlerInfo';
import { AlertTypes } from '../../../models/alerts';

describe('<AlertHandlerInfo > component', () => {
  let wrapper: ShallowWrapper;
  let props: Props;

  it('should have all required elements', () => {
    props = {
      type: AlertTypes.FetchingCategories,
      error: true,
    };
    wrapper = shallow(<AlertHandlerComponent {...props} />);
    expect(wrapper.find(Alert)).toHaveLength(1);
  });

  it('should not render Alert if size is of type SnackBar', () => {
    props = {
      type: AlertTypes.UnAuthorizedWarning,
      error: true,
    };
    wrapper = shallow(<AlertHandlerComponent {...props} />);
    expect(wrapper.find(Alert)).toHaveLength(0);
  });
});
