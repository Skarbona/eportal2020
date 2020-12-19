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
import { InputChangeEvent } from '../../../../models/typescript-events';
import { FormValidation } from '../../../../components/Pages/Game/GameSettings/GameSettings';

describe('<NumberOfTasksPerLevel /> component', () => {
  let wrapper: ShallowWrapper;
  let props: Props;
  let setFormValuesSpy: any;

  beforeEach(() => {
    setFormValuesSpy = jest.spyOn(gameActions, 'setFormValues');
  });

  afterEach(() => {
    setFormValuesSpy.mockClear();
  });

  it('should render all required elements', () => {
    props = { defaults: null, levels: null, setFormValidation: jest.fn() };
    wrapper = shallow(<NumberOfTasksPerLevelComponent {...props} />);
    expect(wrapper.find(ExpansionPanelComponent)).toHaveLength(1);
    expect(wrapper.find(TextField)).toHaveLength(0);
  });

  it('should render all required elements when props provided', () => {
    const { user, categories } = mockedStore();
    const props = {
      defaults: user.userData.gameDefaults.levels,
      levels: categories.categories.levels,
      setFormValidation: jest.fn(),
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
      setFormValidation: jest.fn(),
    };
    wrapper = shallow(<NumberOfTasksPerLevelComponent {...props} />);
    expect(setFormValuesSpy).toHaveBeenCalled();
  });

  it('should handle onChange Events', () => {
    const { user, categories } = mockedStore();
    const props = {
      defaults: user.userData.gameDefaults.levels,
      levels: categories.categories.levels,
      setFormValidation: jest.fn(),
    };
    wrapper = shallow(<NumberOfTasksPerLevelComponent {...props} />);
    expect(setFormValuesSpy).toHaveBeenCalledTimes(1);
    const event = ({ target: { value: 0 } } as unknown) as InputChangeEvent;
    wrapper.find(TextField).first().simulate('change', event);
    expect(setFormValuesSpy).toHaveBeenCalledTimes(2);
  });
});
