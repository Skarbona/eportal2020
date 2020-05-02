import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { Slider, Button, LinearProgress } from '@material-ui/core';
import * as redux from 'react-redux';

import Fade from '../../../../components/Shared/UIElements/Animations/Fade';
import { TaskActionsComponent } from '../../../../components/Pages/Game/Levels/TaskActions';
import { PropsTaskActionsSelector } from '../../../../components/Pages/Game/Levels/selector-hooks';
import { mockedStore, mockPost } from '../../../../mocks/store';
import * as GameActions from '../../../../store/game/action';
import * as SetGameStatusThunk from '../../../../store/game/thunks/setGameStatus';

describe('<TaskActions > component', () => {
  let wrapper: ShallowWrapper;
  let selectorProps: PropsTaskActionsSelector;
  let spyStore: any;
  let setPointsSpy: any;
  let cleanCurrentTaskSpy: any;
  let setGameStatusSpy: any;

  beforeEach(() => {
    const { game } = mockedStore();
    const currentTask = mockPost();
    spyStore = jest.spyOn(redux, 'useSelector');
    setPointsSpy = jest.spyOn(GameActions, 'setPoints');
    cleanCurrentTaskSpy = jest.spyOn(GameActions, 'cleanCurrentTask');
    setGameStatusSpy = jest.spyOn(SetGameStatusThunk, 'setGameStatus');
    selectorProps = {
      time: game.config.time,
      gameStatus: game.gameStatus,
      currentTask,
    };
    spyStore.mockReturnValue(selectorProps);
  });

  afterEach(() => {
    spyStore.mockRestore();
    setPointsSpy.mockClear();
    cleanCurrentTaskSpy.mockClear();
    setGameStatusSpy.mockClear();
  });

  it('should render all required items on BeforeGame status', () => {
    wrapper = shallow(<TaskActionsComponent isTheLastTask={false} />);
    const FadeComponent = wrapper.find(Fade);
    const LinearProgressFade = FadeComponent.at(0);
    const PointsButtonsFade = FadeComponent.at(1);
    expect(wrapper.find(Slider)).toHaveLength(1);
    expect(wrapper.find(Button).at(0).text()).toEqual('Start a Task!');

    expect(LinearProgressFade.props().show).toEqual(false);
    expect(PointsButtonsFade.props().show).toEqual(false);
    expect(wrapper.find('.before-game')).toHaveLength(1);
    expect(wrapper.find('.timer-in-progress')).toHaveLength(0);
    expect(wrapper.find('.timer-paused')).toHaveLength(0);
    expect(wrapper.find('.task-is-done')).toHaveLength(0);
  });

  it('should render all required items on TimerInProgress status', () => {
    wrapper = shallow(<TaskActionsComponent isTheLastTask={false} />);

    const startGameButton = wrapper.find(Button).at(0);
    startGameButton.simulate('click');

    const FadeComponent = wrapper.find(Fade);
    const LinearProgressFade = FadeComponent.at(0);
    const PointsButtonsFade = FadeComponent.at(1);

    expect(LinearProgressFade.props().show).toEqual(true);
    expect(PointsButtonsFade.props().show).toEqual(false);
    expect(wrapper.find('.before-game')).toHaveLength(0);
    expect(wrapper.find('.timer-in-progress')).toHaveLength(1);
    expect(wrapper.find('.timer-paused')).toHaveLength(0);
    expect(wrapper.find('.task-is-done')).toHaveLength(1);
  });

  it('should render all required items on TimerPaused status', () => {
    wrapper = shallow(<TaskActionsComponent isTheLastTask={false} />);

    const startGameButton = wrapper.find(Button).at(0);
    startGameButton.simulate('click');

    const pausedGameButton = wrapper.find(Button).at(0);
    pausedGameButton.simulate('click');

    const FadeComponent = wrapper.find(Fade);
    const LinearProgressFade = FadeComponent.at(0);
    const PointsButtonsFade = FadeComponent.at(1);

    expect(LinearProgressFade.props().show).toEqual(true);
    expect(PointsButtonsFade.props().show).toEqual(false);
    expect(wrapper.find('.before-game')).toHaveLength(0);
    expect(wrapper.find('.timer-in-progress')).toHaveLength(0);
    expect(wrapper.find('.timer-paused')).toHaveLength(1);
    expect(wrapper.find('.task-is-done')).toHaveLength(1);
  });

  it('should render all required items on TimeEnd status', () => {
    wrapper = shallow(<TaskActionsComponent isTheLastTask={false} />);

    const startGameButton = wrapper.find(Button).at(0);
    startGameButton.simulate('click');

    const taskIsDoneButton = wrapper.find(Button).at(1);
    taskIsDoneButton.simulate('click');

    const FadeComponent = wrapper.find(Fade);
    const LinearProgressFade = FadeComponent.at(0);
    const PointsButtonsFade = FadeComponent.at(1);

    expect(LinearProgressFade.props().show).toEqual(false);
    expect(PointsButtonsFade.props().show).toEqual(true);
    expect(wrapper.find('.before-game')).toHaveLength(0);
    expect(wrapper.find('.timer-in-progress')).toHaveLength(0);
    expect(wrapper.find('.timer-paused')).toHaveLength(0);
    expect(wrapper.find('.task-is-done')).toHaveLength(0);
  });

  it('should dispatch all actions in clicking points button', () => {
    wrapper = shallow(<TaskActionsComponent isTheLastTask={false} />);

    const startGameButton = wrapper.find(Button).at(0);
    startGameButton.simulate('click');

    const taskIsDoneButton = wrapper.find(Button).at(1);
    taskIsDoneButton.simulate('click');

    const ThreePointsButton = wrapper.find(Button).at(0);
    ThreePointsButton.simulate('click');

    expect(setPointsSpy).toHaveBeenCalled();
    expect(cleanCurrentTaskSpy).toHaveBeenCalled();
    expect(setGameStatusSpy).not.toHaveBeenCalled();
  });

  it('should dispatch all actions in clicking points button if it isTheLastTask', () => {
    wrapper = shallow(<TaskActionsComponent isTheLastTask={true} />);

    const startGameButton = wrapper.find(Button).at(0);
    startGameButton.simulate('click');

    const taskIsDoneButton = wrapper.find(Button).at(1);
    taskIsDoneButton.simulate('click');

    const ThreePointsButton = wrapper.find(Button).at(0);
    ThreePointsButton.simulate('click');

    expect(setPointsSpy).toHaveBeenCalled();
    expect(cleanCurrentTaskSpy).toHaveBeenCalled();
    expect(setGameStatusSpy).toHaveBeenCalled();
  });

  it('should set default value and handle changing value of timer', () => {
    wrapper = shallow(<TaskActionsComponent isTheLastTask={false} />);

    expect(wrapper.find(Slider).props().value).toEqual(2);

    wrapper.find(Slider).simulate('change', {}, 5);
    expect(wrapper.find(Slider).props().value).toEqual(5);
  });

  it('should handle new time value in progress bar', () => {
    wrapper = shallow(<TaskActionsComponent isTheLastTask={false} />);

    wrapper.find(Slider).simulate('change', {}, 5);

    const startGameButton = wrapper.find(Button).at(0);
    startGameButton.simulate('click');

    expect(wrapper.find('.values').props().children).toEqual('05:00');
  });

  it('should set proper values when game in progress', () => {
    jest.useFakeTimers();

    wrapper = shallow(<TaskActionsComponent isTheLastTask={false} />);

    const startGameButton = wrapper.find(Button).at(0);
    startGameButton.simulate('click');

    expect(wrapper.find('.values').props().children).toEqual('02:00');
    expect(wrapper.find(LinearProgress).props().value).toEqual(0);

    jest.advanceTimersByTime(2000);
    expect(wrapper.find('.values').props().children).toEqual('01:58');
    expect(wrapper.find(LinearProgress).props().value).toBeGreaterThan(1);
    expect(wrapper.find(LinearProgress).props().value).toBeLessThan(2);
  });

  it('should set proper value on pausing/starting game', () => {
    jest.useFakeTimers();
    wrapper = shallow(<TaskActionsComponent isTheLastTask={false} />);

    const startGameButton = wrapper.find(Button).at(0);
    startGameButton.simulate('click');

    expect(wrapper.find('.values').props().children).toEqual('02:00');
    expect(wrapper.find(LinearProgress).props().value).toEqual(0);

    jest.advanceTimersByTime(1000);

    const pauseButton = wrapper.find(Button).at(0);
    pauseButton.simulate('click');

    jest.advanceTimersByTime(3000);
    // Check if time still the same after pause
    expect(wrapper.find('.values').props().children).toEqual('01:59');
    expect(wrapper.find(LinearProgress).props().value).toBeGreaterThan(0);
    expect(wrapper.find(LinearProgress).props().value).toBeLessThan(1);

    const startButton = wrapper.find(Button).at(0);
    startButton.simulate('click');

    jest.advanceTimersByTime(2000);
    expect(wrapper.find('.values').props().children).toEqual('01:57');
    expect(wrapper.find(LinearProgress).props().value).toBeGreaterThan(2);
    expect(wrapper.find(LinearProgress).props().value).toBeLessThan(3);
  });

  it('should set TimeEnd status if timer is equal to 0', () => {
    jest.useFakeTimers();
    wrapper = shallow(<TaskActionsComponent isTheLastTask={false} />);

    wrapper.find(Slider).simulate('change', {}, 1);

    const startGameButton = wrapper.find(Button).at(0);
    startGameButton.simulate('click');

    jest.advanceTimersByTime(60001);

    const PointsButtonsFade = wrapper.find(Fade).at(1);

    expect(PointsButtonsFade.props().show).toEqual(true);
  });
});
