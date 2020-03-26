import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { ExpansionPanel, ExpansionPanelDetails, ExpansionPanelSummary } from '@material-ui/core';

import {
  ExpansionPanelComponent,
  Props,
} from '../../../components/Shared/UIElements/ExpansionPanel/ExpansionPanel';

describe('<CircleLoading > component', () => {
  let wrapper: ShallowWrapper;
  let props: Props;

  it('should have all required elements', () => {
    props = {
      children: <div>CHILD</div>,
      title: 'Hello Word!',
    };
    wrapper = shallow(<ExpansionPanelComponent {...props} />);
    expect(wrapper.find(ExpansionPanel)).toHaveLength(1);
    expect(wrapper.find(ExpansionPanelDetails)).toHaveLength(1);
    expect(wrapper.find(ExpansionPanelSummary)).toHaveLength(1);
  });
});
