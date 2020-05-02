import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { Step, Stepper } from '@material-ui/core';

import {
  LevelsNavigationComponent,
  Props,
} from '../../../../components/Pages/Game/Levels/LevelsNavigation/LevelsNavigation';
import * as GameActions from '../../../../store/game/action';
import * as setGameStatusThunk from '../../../../store/game/thunks/setGameStatus';
import { GameStatus } from '../../../../models/game-models';
import { mockedStore, mockPost } from '../../../../mocks/store';

describe('<LevelsNavigation > component', () => {
  let wrapper: ShallowWrapper;
  let props: Props;
  let setGameStatusSpy: any;
  let cleanGameDataSpy: any;
  let cleanCurrentTaskSpy: any;
  let removeItemLocalStorageSpy: any;

  beforeEach(() => {
    const { categories } = mockedStore();
    props = {
      isTheLastTask: false,
      currentGameStatus: GameStatus.Level1,
      currentTask: mockPost(),
      levels: categories.categories.levels.children,
    };
    setGameStatusSpy = jest.spyOn(setGameStatusThunk, 'setGameStatus');
    cleanGameDataSpy = jest.spyOn(GameActions, 'cleanGameData');
    cleanCurrentTaskSpy = jest.spyOn(GameActions, 'cleanCurrentTask');
    removeItemLocalStorageSpy = jest.spyOn(window.localStorage.__proto__, 'removeItem');
  });

  afterEach(() => {
    setGameStatusSpy.mockClear();
    cleanGameDataSpy.mockClear();
    cleanCurrentTaskSpy.mockClear();
    removeItemLocalStorageSpy.mockClear();
  });

  it('should render all required items when currentTask is set', () => {
    wrapper = shallow(<LevelsNavigationComponent {...props} />);
    expect(wrapper.find('.ignore-task')).toHaveLength(1);
    expect(wrapper.find('.ignore-level')).toHaveLength(0);
    expect(wrapper.find('.warning-button')).toHaveLength(0);
    expect(wrapper.find('.error-button')).toHaveLength(1);
    expect(wrapper.find(Stepper).props().activeStep).toEqual(0);
    expect(wrapper.find(Step)).toHaveLength(3);
  });

  it('should render all required items when currentTask is NOT set', () => {
    props.currentTask = null;
    wrapper = shallow(<LevelsNavigationComponent {...props} />);
    expect(wrapper.find('.ignore-task')).toHaveLength(0);
    expect(wrapper.find('.ignore-level')).toHaveLength(1);
    expect(wrapper.find('.warning-button')).toHaveLength(0);
    expect(wrapper.find('.error-button')).toHaveLength(1);
    expect(wrapper.find(Step)).toHaveLength(3);
  });

  it('should render all required items when it is level 3', () => {
    props.currentGameStatus = GameStatus.Level3;
    wrapper = shallow(<LevelsNavigationComponent {...props} />);
    expect(wrapper.find('.ignore-task')).toHaveLength(1);
    expect(wrapper.find('.ignore-level')).toHaveLength(0);
    expect(wrapper.find('.warning-button')).toHaveLength(1);
    expect(wrapper.find('.error-button')).toHaveLength(1);
    expect(wrapper.find(Stepper).props().activeStep).toEqual(2);
    expect(wrapper.find(Step)).toHaveLength(3);
  });

  it('should render all required items when it is Summary', () => {
    props.currentGameStatus = GameStatus.Summary;
    props.currentTask = null;
    wrapper = shallow(<LevelsNavigationComponent {...props} />);
    expect(wrapper.find('.ignore-task')).toHaveLength(0);
    expect(wrapper.find('.ignore-level')).toHaveLength(0);
    expect(wrapper.find('.warning-button')).toHaveLength(0);
    expect(wrapper.find('.error-button')).toHaveLength(1);
    expect(wrapper.find(Step)).toHaveLength(0);
  });

  it('should call all required actions on game finishing', () => {
    wrapper = shallow(<LevelsNavigationComponent {...props} />);
    wrapper.find('.error-button').simulate('click');
    expect(removeItemLocalStorageSpy).toHaveBeenCalledTimes(3);
    expect(setGameStatusSpy).toHaveBeenCalled();
    expect(cleanGameDataSpy).toHaveBeenCalled();
  });

  it('should call all required action on ignoring task', () => {
    wrapper = shallow(<LevelsNavigationComponent {...props} />);
    wrapper.find('.ignore-task').simulate('click');
    expect(setGameStatusSpy).not.toHaveBeenCalled();
    expect(cleanCurrentTaskSpy).toHaveBeenCalled();
  });

  it('should call all required action on ignoring task when isTheLastTask', () => {
    props.isTheLastTask = true;
    wrapper = shallow(<LevelsNavigationComponent {...props} />);
    wrapper.find('.ignore-task').simulate('click');
    expect(setGameStatusSpy).toHaveBeenCalled();
    expect(cleanCurrentTaskSpy).toHaveBeenCalled();
  });

  it('should call all required action on ignoring current level', () => {
    props.currentTask = null;
    wrapper = shallow(<LevelsNavigationComponent {...props} />);
    wrapper.find('.ignore-level').simulate('click');
    expect(setGameStatusSpy).toHaveBeenCalled();
    expect(cleanCurrentTaskSpy).toHaveBeenCalled();
  });
});
