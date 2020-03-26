import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { TextField } from '@material-ui/core';

import * as gameActions from '../../../../store/game/action';
import {
  NumberOfTasksPerLevelComponent,
  Props,
} from '../../../../components/Pages/Game/GameSettings/NumberOfTasksPerLevel';
import ExpansionPanelComponent from '../../../../components/Shared/UIElements/ExpansionPanel/ExpansionPanel';
import { mockedStore } from '../../../../mocks/store';

jest.mock('../../../../store/game/action', () => ({
  setFormValues: jest.fn(),
}));

describe('<NumberOfTasksPerLevel /> component', () => {
  let wrapper: ShallowWrapper;
  let props: Props;

  it('should render all required elements', () => {
    props = { defaults: null, levels: null };
    wrapper = shallow(<NumberOfTasksPerLevelComponent {...props} />);
    expect(wrapper.find(ExpansionPanelComponent)).toHaveLength(1);
    expect(wrapper.find(TextField)).toHaveLength(0);
  });

  it('should render all required elements when props provided', () => {
    const { user, categories } = mockedStore();
    const props = {
      defaults: user.userData.gameDefaults.levels,
      levels: categories.categories.levels,
    };
    wrapper = shallow(<NumberOfTasksPerLevelComponent {...props} />);
    expect(wrapper.find(ExpansionPanelComponent)).toHaveLength(1);
    expect(wrapper.find(TextField)).toHaveLength(3);
  });

  it('should call setFormValues', () => {
    const { user, categories } = mockedStore();
    const props = {
      defaults: user.userData.gameDefaults.levels,
      levels: categories.categories.levels,
    };
    wrapper = shallow(<NumberOfTasksPerLevelComponent {...props} />);
    expect(gameActions.setFormValues).toHaveBeenCalled();
  });
});
