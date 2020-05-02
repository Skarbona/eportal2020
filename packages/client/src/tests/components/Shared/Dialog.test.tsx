import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { Dialog, DialogContent, DialogActions } from '@material-ui/core';

import { DialogComponent, Props } from '../../../components/Shared/UIElements/Dialog/Dialog';
import DialogTitle from '../../../components/Shared/UIElements/Dialog/DialogTitle';

describe('<Dialog > component', () => {
  let wrapper: ShallowWrapper;
  let props: Props;

  beforeEach(() => {
    props = {
      onClose: jest.fn(),
      title: 'TITLE',
      children: <div />,
      actions: null,
    };
  });

  it('should render all required items', () => {
    wrapper = shallow(<DialogComponent {...props} />);
    expect(wrapper.find(Dialog)).toHaveLength(1);
    expect(wrapper.find(DialogTitle)).toHaveLength(1);
    expect(wrapper.find(DialogContent)).toHaveLength(1);
    expect(wrapper.find(DialogActions)).toHaveLength(0);
  });

  it('should render actions when provided', () => {
    props.actions = <div />;
    wrapper = shallow(<DialogComponent {...props} />);
    expect(wrapper.find(DialogActions)).toHaveLength(1);
  });

  it('Dialog should be always open (visibility should be handled in context of usage)', () => {
    wrapper.find(Dialog).simulate('click');
    expect(wrapper.find(Dialog).props().open).toEqual(true);
  });
});
