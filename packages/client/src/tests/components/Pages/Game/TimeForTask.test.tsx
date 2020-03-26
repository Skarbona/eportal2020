import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { Slider } from '@material-ui/core';

import * as gameActions from '../../../../store/game/action';
import {
  TimeForTaskComponent,
  Props,
} from '../../../../components/Pages/Game/GameSettings/TimeForTask';
import ExpansionPanelComponent from '../../../../components/Shared/UIElements/ExpansionPanel/ExpansionPanel';
import { mockedStore } from '../../../../mocks/store';
import { TimeMode } from '../../../../models/game-models';

jest.mock('../../../../store/game/action', () => ({
  setFormValues: jest.fn(),
}));

describe('<TimeForTask /> component', () => {
  let wrapper: ShallowWrapper;
  let props: Props;

  it('should render all required elements', () => {
    const { user } = mockedStore();
    props = { defaults: user.userData.gameDefaults.time };
    wrapper = shallow(<TimeForTaskComponent {...props} />);
    expect(wrapper.find(ExpansionPanelComponent)).toHaveLength(1);
    expect(wrapper.find(Slider)).toHaveLength(1);
  });

  it('should render all required elements if default TimeMode is different', () => {
    const { user } = mockedStore();
    props = { defaults: user.userData.gameDefaults.time };
    props.defaults.type = TimeMode.Range;
    wrapper = shallow(<TimeForTaskComponent {...props} />);
    expect(wrapper.find(ExpansionPanelComponent)).toHaveLength(1);
    expect(wrapper.find(Slider)).toHaveLength(1);
  });

  it('should call setFormValues', () => {
    const { user } = mockedStore();
    props = { defaults: user.userData.gameDefaults.time };
    wrapper = shallow(<TimeForTaskComponent {...props} />);
    expect(gameActions.setFormValues).toHaveBeenCalled();
  });
});
