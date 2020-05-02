import React, { ReactNode } from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { DialogTitle, IconButton } from '@material-ui/core';

import {
  DialogTitleComponent,
  Props,
} from '../../../components/Shared/UIElements/Dialog/DialogTitle';

describe('<DialogTitle > component', () => {
  let wrapper: ShallowWrapper;
  let props: Props;

  beforeEach(() => {
    props = {
      id: '',
      children: <div />,
      onClose: jest.fn(),
      className: '',
    };
  });

  it('should render without errors', () => {
    wrapper = shallow(<DialogTitleComponent {...props} />);
    expect(wrapper.find(DialogTitle)).toHaveLength(1);
    expect(wrapper.find(IconButton)).toHaveLength(1);
  });

  it('should call onClose on Icon click', () => {
    wrapper = shallow(<DialogTitleComponent {...props} />);
    wrapper.find(IconButton).simulate('click');

    expect(props.onClose).toHaveBeenCalled();
  });

  it('should not render close icon if no onClose function', () => {
    props.onClose = null;
    wrapper = shallow(<DialogTitleComponent {...props} />);

    expect(wrapper.find(IconButton)).toHaveLength(0);
  });
});
