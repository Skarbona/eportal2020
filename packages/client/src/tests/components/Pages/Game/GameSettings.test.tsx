import React from 'react';
import * as redux from 'react-redux';
import { shallow, ShallowWrapper } from 'enzyme';

import { mockedStore } from '../../../../mocks/store';
import { AlertTypes } from '../../../../models/alerts';
import { GameSettingComponent } from '../../../../components/Pages/Game/GameSettings/GameSettings';
import DefaultSettings from '../../../../components/Pages/Game/GameSettings/DefaultSettings';
import NumberOfTasksPerLevel from '../../../../components/Pages/Game/GameSettings/NumberOfTasksPerLevel';
import Places from '../../../../components/Pages/Game/GameSettings/Places';
import PlayersNames from '../../../../components/Pages/Game/GameSettings/PlayersNames';
import Preferences from '../../../../components/Pages/Game/GameSettings/Preferences';
import TimeForTask from '../../../../components/Pages/Game/GameSettings/TimeForTask';
import StartButton from '../../../../components/Pages/Game/GameSettings/StartButton';
import AlertHandler from '../../../../components/Shared/UIElements/AlertHandlerInfo/AlertHandlerInfo';
import CircleLoading from '../../../../components/Shared/UIElements/Loading/CircleLoading';
import * as startGameThunk from '../../../../store/game/thunks/startGame';
import { mockedEvent } from '../../../../mocks/event';

describe('<GameSettings > component', () => {
  let wrapper: ShallowWrapper;
  let spyStore: any;
  let startGameSpy: any;

  beforeEach(() => {
    spyStore = jest.spyOn(redux, 'useSelector');
    startGameSpy = jest.spyOn(startGameThunk, 'startGameHandler');
  });

  afterEach(() => {
    spyStore.mockRestore();
    startGameSpy.mockRestore();
  });

  it('should have all required elements', () => {
    spyStore.mockReturnValue({
      loading: false,
      cats: null,
      error: null,
      alertType: null,
      defaults: null,
    });
    wrapper = shallow(<GameSettingComponent />);
    expect(wrapper.find(AlertHandler)).toHaveLength(1);
    expect(wrapper.find(DefaultSettings)).toHaveLength(0);
    expect(wrapper.find(NumberOfTasksPerLevel)).toHaveLength(0);
    expect(wrapper.find(Places)).toHaveLength(0);
    expect(wrapper.find(PlayersNames)).toHaveLength(0);
    expect(wrapper.find(Preferences)).toHaveLength(0);
    expect(wrapper.find(TimeForTask)).toHaveLength(0);
    expect(wrapper.find(StartButton)).toHaveLength(0);
    expect(wrapper.find(CircleLoading)).toHaveLength(0);
  });

  it('should render <CircleLoading /> if loading', () => {
    spyStore.mockReturnValue({
      loading: true,
      cats: null,
      error: null,
      alertType: null,
      defaults: null,
    });
    wrapper = shallow(<GameSettingComponent />);
    expect(wrapper.find(CircleLoading)).toHaveLength(1);
  });

  it('should render all game settings if defaults and categories provided', () => {
    const { categories, user } = mockedStore();
    spyStore.mockReturnValue({
      cats: categories.categories,
      defaults: user.userData.gameDefaults,
      loading: false,
      error: null,
      alertType: null,
    });
    wrapper = shallow(<GameSettingComponent />);
    expect(wrapper.find(AlertHandler)).toHaveLength(2);
    expect(wrapper.find(DefaultSettings)).toHaveLength(1);
    expect(wrapper.find(NumberOfTasksPerLevel)).toHaveLength(1);
    expect(wrapper.find(Places)).toHaveLength(1);
    expect(wrapper.find(PlayersNames)).toHaveLength(1);
    expect(wrapper.find(Preferences)).toHaveLength(1);
    expect(wrapper.find(TimeForTask)).toHaveLength(1);
    expect(wrapper.find(StartButton)).toHaveLength(1);
    expect(wrapper.find(CircleLoading)).toHaveLength(0);
  });

  it('should properly render all components if error occured', () => {
    const { categories, user } = mockedStore();
    spyStore.mockReturnValue({
      error: new Error(),
      alertType: AlertTypes.UnAuthorized,
      loading: false,
      cats: categories.categories,
      defaults: user.userData.gameDefaults,
    });
    wrapper = shallow(<GameSettingComponent />);
    expect(wrapper.find(AlertHandler)).toHaveLength(2);
    expect(wrapper.find(DefaultSettings)).toHaveLength(1);
    expect(wrapper.find(NumberOfTasksPerLevel)).toHaveLength(1);
    expect(wrapper.find(Places)).toHaveLength(1);
    expect(wrapper.find(PlayersNames)).toHaveLength(1);
    expect(wrapper.find(Preferences)).toHaveLength(1);
    expect(wrapper.find(TimeForTask)).toHaveLength(1);
    expect(wrapper.find(StartButton)).toHaveLength(1);
    expect(wrapper.find(CircleLoading)).toHaveLength(0);
  });

  it('should call fetchCategories', () => {
    const { categories, user } = mockedStore();
    spyStore.mockReturnValue({
      cats: categories.categories,
      defaults: user.userData.gameDefaults,
      loading: false,
      error: null,
      alertType: null,
    });
    wrapper = shallow(<GameSettingComponent />);
    wrapper.find('form').simulate('submit', mockedEvent);
    expect(startGameSpy).toHaveBeenCalled();
  });
});
