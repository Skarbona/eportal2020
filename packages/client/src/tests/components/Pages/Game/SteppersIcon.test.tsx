import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { Filter1 } from '@material-ui/icons';

import {
  StepperIcons,
  Props,
} from '../../../../components/Pages/Game/Levels/LevelsNavigation/StepperIcons';

describe('<StepperIcons > component', () => {
  let wrapper: ShallowWrapper;
  let props: Props;

  beforeEach(() => {
    props = {
      active: true,
      completed: true,
      icon: 1,
    };
  });

  it('should render all required items', () => {
    wrapper = shallow(<StepperIcons {...props} />);
    expect(wrapper.find('.active-step')).toHaveLength(1);
    expect(wrapper.find('.completed-step')).toHaveLength(1);
    expect(wrapper.find(Filter1)).toHaveLength(1);
  });

  it('should render all required items on different props', () => {
    props.active = false;
    props.completed = false;
    wrapper = shallow(<StepperIcons {...props} />);
    expect(wrapper.find('.active-step')).toHaveLength(0);
    expect(wrapper.find('.completed-step')).toHaveLength(0);
    expect(wrapper.find(Filter1)).toHaveLength(1);
  });
});
