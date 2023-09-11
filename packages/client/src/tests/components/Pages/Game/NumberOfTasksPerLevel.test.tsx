import React from 'react';
import * as redux from 'react-redux';
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
import { premiumUser } from '../../../helpers';

describe('<NumberOfTasksPerLevel /> component', () => {
  let wrapper: ShallowWrapper;
  let componentProps: Props;
  let setFormValuesSpy: any;
  let spyStore: any;

  beforeEach(() => {
    spyStore = jest.spyOn(redux, 'useSelector');
    setFormValuesSpy = jest.spyOn(gameActions, 'setFormValues');
  });

  afterEach(() => {
    spyStore.mockRestore();
    setFormValuesSpy.mockClear();
  });

  it('should render all required elements', () => {
    componentProps = { defaults: null, levels: null, setFormValidation: jest.fn() };
    spyStore.mockReturnValue({});
    wrapper = shallow(<NumberOfTasksPerLevelComponent {...componentProps} />);
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
    spyStore.mockReturnValue({});
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
    spyStore.mockReturnValue({});
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
    spyStore.mockReturnValue({});
    wrapper = shallow(<NumberOfTasksPerLevelComponent {...props} />);
    expect(setFormValuesSpy).toHaveBeenCalledTimes(1);
    const event = { target: { value: 0 } } as unknown as InputChangeEvent;
    wrapper.find(TextField).first().simulate('change', event);
    expect(setFormValuesSpy).toHaveBeenCalledTimes(2);
  });
  it('should disable fields for NONE Premium users', () => {
    const { user, categories } = mockedStore();
    const props = {
      defaults: user.userData.gameDefaults.levels,
      levels: categories.categories.levels,
      setFormValidation: jest.fn(),
    };
    spyStore.mockReturnValue({});
    wrapper = shallow(<NumberOfTasksPerLevelComponent {...props} />);
    expect(wrapper.find('[data-test="level-children1"]').props().disabled).toBe(true);
    expect(wrapper.find('[data-test="level-children2"]').props().disabled).toBe(true);
    expect(wrapper.find('[data-test="level-children3"]').props().disabled).toBe(true);
  });

  it('should force 3 tasks per level for NONE Premium users', () => {
    const { user, categories } = mockedStore();
    const props = {
      defaults: user.userData.gameDefaults.levels,
      levels: categories.categories.levels,
      setFormValidation: jest.fn(),
    };
    spyStore.mockReturnValue({});
    wrapper = shallow(<NumberOfTasksPerLevelComponent {...props} />);
    expect(wrapper.find('[data-test="level-children1"]').props().value).toBe(3);
    expect(wrapper.find('[data-test="level-children2"]').props().value).toBe(3);
    expect(wrapper.find('[data-test="level-children3"]').props().value).toBe(3);
  });

  it('should enable fields for Premium users', () => {
    const { user, categories } = mockedStore();
    const props = {
      defaults: user.userData.gameDefaults.levels,
      levels: categories.categories.levels,
      setFormValidation: jest.fn(),
    };
    spyStore.mockReturnValue({
      ...premiumUser(),
    });
    wrapper = shallow(<NumberOfTasksPerLevelComponent {...props} />);
    expect(wrapper.find('[data-test="level-children1"]').props().disabled).toBe(false);
    expect(wrapper.find('[data-test="level-children2"]').props().disabled).toBe(false);
    expect(wrapper.find('[data-test="level-children3"]').props().disabled).toBe(false);
  });

  it('should show default number of task per level for Premium users', () => {
    const { user, categories } = mockedStore();
    const props = {
      defaults: user.userData.gameDefaults.levels,
      levels: categories.categories.levels,
      ...premiumUser(),
      setFormValidation: jest.fn(),
    };

    spyStore.mockReturnValue({
      ...premiumUser(),
    });
    wrapper = shallow(<NumberOfTasksPerLevelComponent {...props} />);
    expect(wrapper.find('[data-test="level-children1"]').props().value).toBe(11);
    expect(wrapper.find('[data-test="level-children2"]').props().value).toBe(11);
    expect(wrapper.find('[data-test="level-children3"]').props().value).toBe(11);
  });
});
