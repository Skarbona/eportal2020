import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { Grid, Typography, LinearProgress } from '@material-ui/core';

import { Props, TaskCounterComponent } from '../../../../components/Pages/Game/Levels/TaskCounter';

describe('<Summary > component', () => {
  let wrapper: ShallowWrapper;
  let props: Props;

  beforeEach(() => {
    props = {
      currentTaskNo: 1,
      taskPerLevel: 10,
      isCurrentTaskVisible: true,
    };
  });

  it('should render all required items', () => {
    wrapper = shallow(<TaskCounterComponent {...props} />);
    const linearProgress = wrapper.find(LinearProgress);
    const counterTypography = wrapper.find('.task-counter__values');

    expect(linearProgress).toHaveLength(1);
    expect(linearProgress.props().value).toEqual(10);
    expect(counterTypography).toHaveLength(1);
    expect(counterTypography.text()).toEqual('Task No: 1/10');
  });

  it('should render properly values for progress bar', () => {
    props.isCurrentTaskVisible = false;
    wrapper = shallow(<TaskCounterComponent {...props} />);
    const linearProgress = wrapper.find(LinearProgress);
    const counterTypography = wrapper.find('.task-counter__values');

    expect(linearProgress.props().value).toEqual(20);
    expect(counterTypography.text()).toEqual('Task No: 2/10');
  });
});
