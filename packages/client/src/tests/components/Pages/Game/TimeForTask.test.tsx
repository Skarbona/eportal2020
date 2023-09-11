import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { FormControlLabel, Slider, Switch } from '@material-ui/core';
import * as redux from 'react-redux';

import * as gameActions from '../../../../store/game/action';
import {
  TimeForTaskComponent,
  Props,
} from '../../../../components/Pages/Game/GameSettings/TimeForTask';
import ExpansionPanelComponent from '../../../../components/Shared/UIElements/ExpansionPanel/ExpansionPanel';
import { mockedStore } from '../../../../mocks/store';
import { TimeMode } from '../../../../models/game-models';
import { premiumUser } from '../../../helpers';

describe('<TimeForTask /> component', () => {
  let wrapper: ShallowWrapper;
  let props: Props;
  let spyStore: any;
  let setFormValuesSpy: any;

  beforeEach(() => {
    spyStore = jest.spyOn(redux, 'useSelector');
    setFormValuesSpy = jest.spyOn(gameActions, 'setFormValues');
  });

  afterEach(() => {
    spyStore.mockRestore();
    setFormValuesSpy.mockClear();
  });

  it('should render all required elements', () => {
    const { user } = mockedStore();
    props = { defaults: user.userData.gameDefaults.time };
    spyStore.mockReturnValue({});
    wrapper = shallow(<TimeForTaskComponent {...props} />);
    expect(wrapper.find(ExpansionPanelComponent)).toHaveLength(1);
    expect(wrapper.find(Slider)).toHaveLength(1);
  });

  it('should render all required elements if default TimeMode is different', () => {
    const { user } = mockedStore();
    props = { defaults: user.userData.gameDefaults.time };
    props.defaults.type = TimeMode.Range;
    spyStore.mockReturnValue({});
    wrapper = shallow(<TimeForTaskComponent {...props} />);
    expect(wrapper.find(ExpansionPanelComponent)).toHaveLength(1);
    expect(wrapper.find(Slider)).toHaveLength(1);
  });

  it('should call setFormValues', () => {
    const { user } = mockedStore();
    props = { defaults: user.userData.gameDefaults.time };
    spyStore.mockReturnValue({});
    wrapper = shallow(<TimeForTaskComponent {...props} />);
    expect(setFormValuesSpy).toHaveBeenCalled();
  });

  it('should call setFormValues', () => {
    const { user } = mockedStore();
    props = { defaults: user.userData.gameDefaults.time };
    spyStore.mockReturnValue({});
    wrapper = shallow(<TimeForTaskComponent {...props} />);
    expect(setFormValuesSpy).toHaveBeenCalledTimes(1);
    wrapper.find(Slider).simulate('change', {}, [0]);
    expect(setFormValuesSpy).toHaveBeenCalledTimes(2);
  });

  it('should disable field for NONE Premium User', () => {
    const { user } = mockedStore();
    props = { defaults: user.userData.gameDefaults.time };
    spyStore.mockReturnValue({});
    wrapper = shallow(<TimeForTaskComponent {...props} />);
    expect(wrapper.find(Slider).props().disabled).toBe(true);
    expect(wrapper.find(FormControlLabel).props().control.props.disabled).toBe(true);
  });
  it('should set fixed time and type for NONE Premium User', () => {
    const { user } = mockedStore();
    props = { defaults: user.userData.gameDefaults.time };
    spyStore.mockReturnValue({});
    wrapper = shallow(<TimeForTaskComponent {...props} />);
    expect(wrapper.find(Slider).props().value).toBe(2);
    expect(wrapper.find(FormControlLabel).props().control.props.checked).toBe(false);
  });
  it('should enable field for Premium User', () => {
    const { user } = mockedStore();
    props = { defaults: user.userData.gameDefaults.time };
    spyStore.mockReturnValue({
      ...premiumUser(),
    });
    wrapper = shallow(<TimeForTaskComponent {...props} />);
    expect(wrapper.find(Slider).props().disabled).toBe(false);
    expect(wrapper.find(FormControlLabel).props().control.props.disabled).toBe(false);
  });
  it('should set default time and type for Premium User', () => {
    const { user } = mockedStore();
    props = { defaults: user.userData.gameDefaults.time };
    spyStore.mockReturnValue({
      ...premiumUser(),
    });
    wrapper = shallow(<TimeForTaskComponent {...props} />);
    expect(wrapper.find(Slider).props().value).toStrictEqual([3, 5]);
    expect(wrapper.find(FormControlLabel).props().control.props.checked).toBe(true);
  });
});
