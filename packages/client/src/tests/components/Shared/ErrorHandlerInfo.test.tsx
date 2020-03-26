import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { Alert } from '@material-ui/lab';

import { ErrorHandlerComponent } from '../../../components/Shared/UIElements/ErrorHandlerInfo/ErrorHandlerInfo';
import { ErrorHandlerInterface } from '../../../components/Shared/UIElements/ErrorHandlerInfo/ErrorHandler.interface';
import { PageTypes } from '../../../models/page-types';

describe('<ErrorHandlerInfo > component', () => {
  let wrapper: ShallowWrapper;
  let props: ErrorHandlerInterface;

  it('should have all required elements', () => {
    props = {
      type: PageTypes.CategorySettings,
      error: true,
    };
    wrapper = shallow(<ErrorHandlerComponent {...props} />);
    expect(wrapper.find(Alert)).toHaveLength(1);
  });
});
