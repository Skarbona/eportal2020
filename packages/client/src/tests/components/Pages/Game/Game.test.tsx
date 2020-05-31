import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import * as redux from 'react-redux';

import { GameComponent, SelectorProps } from '../../../../components/Pages/Game/Game';
import GameSettings from '../../../../components/Pages/Game/GameSettings/GameSettings';
import Levels from '../../../../components/Pages/Game/Levels/Levels';
import { mockedStore } from '../../../../mocks/store';
import { GameStatus } from '../../../../models/game-models';
import * as categoriesThunk from '../../../../store/categories/thunks/fetchCategories';
import * as gameThunk from '../../../../store/game/thunks/setGameStatus';
import * as gameActions from '../../../../store/game/action';
import * as fetchPostsForGameThunk from '../../../../store/game/thunks/fetchPostsForGame';

describe('<Game > component', () => {
  let wrapper: ShallowWrapper;
  let spyFetchCategories: any;
  let fetchPostsForGameSpy: any;
  let setGameStatusSpy: any;
  let setFormValuesSpy: any;
  let saveActiveGameDataSpy: any;
  let getItemLocalStorageSpy: any;
  let removeItemLocalStorageSpy: any;
  let selectorProps: SelectorProps;
  let spyStore: any;

  beforeEach(() => {
    spyFetchCategories = jest.spyOn(categoriesThunk, 'fetchCategories');
    fetchPostsForGameSpy = jest.spyOn(fetchPostsForGameThunk, 'fetchPostsForGame');
    setGameStatusSpy = jest.spyOn(gameThunk, 'setGameStatus');
    saveActiveGameDataSpy = jest.spyOn(gameActions, 'saveActiveGameData');
    setFormValuesSpy = jest.spyOn(gameActions, 'setFormValues');
    getItemLocalStorageSpy = jest.spyOn(window.localStorage.__proto__, 'getItem');
    removeItemLocalStorageSpy = jest.spyOn(window.localStorage.__proto__, 'removeItem');
    spyStore = jest.spyOn(redux, 'useSelector');
    const { game } = mockedStore();
    selectorProps = {
      gameStatus: game.gameStatus,
      config: game.config,
      hasPosts: false,
      hasCategories: false,
      expirationDate: new Date(2030, 10, 10),
      accessToken: 'TOKEN',
    };
  });

  afterEach(() => {
    spyStore.mockRestore();
    spyFetchCategories.mockClear();
    fetchPostsForGameSpy.mockClear();
    saveActiveGameDataSpy.mockClear();
    setFormValuesSpy.mockClear();
    setGameStatusSpy.mockClear();
    getItemLocalStorageSpy.mockRestore();
    removeItemLocalStorageSpy.mockRestore();
  });

  it('should have all required elements', () => {
    wrapper = shallow(<GameComponent />);
    expect(wrapper.find(GameSettings)).toHaveLength(0);
    expect(wrapper.find(Levels)).toHaveLength(0);
  });

  it('should render GameSetting if has all required props', () => {
    spyStore.mockReturnValue({ ...selectorProps, gameStatus: GameStatus.NewGame });
    wrapper = shallow(<GameComponent />);
  });

  it('should render Levels if has all required props', () => {
    spyStore.mockReturnValue({
      ...selectorProps,
      gameStatus: GameStatus.Level3,
      hasPosts: true,
      hasCategories: true,
    });
    wrapper = shallow(<GameComponent />);
  });

  it('should not call fetchCategories if no tokens', () => {
    spyStore.mockReturnValue({
      ...selectorProps,
      expirationDate: null,
      accessToken: null,
    });
    wrapper = shallow(<GameComponent />);
    expect(spyFetchCategories).not.toHaveBeenCalled();
  });

  it('should not call fetchCategories if token expired', () => {
    spyStore.mockReturnValue({
      ...selectorProps,
      expirationDate: new Date(2018, 10, 10),
      accessToken: null,
    });
    wrapper = shallow(<GameComponent />);
    expect(spyFetchCategories).not.toHaveBeenCalled();
  });

  it('should reset basic Game data on load/reload of page', () => {
    spyStore.mockReturnValue(selectorProps);

    wrapper = shallow(<GameComponent />);
    expect(setGameStatusSpy).toHaveBeenCalled();
    expect(saveActiveGameDataSpy).toHaveBeenCalled();
    expect(removeItemLocalStorageSpy).toHaveBeenCalledTimes(2);
  });

  it('should set basic Game data on load/reload of page', () => {
    spyStore.mockReturnValue(selectorProps);

    getItemLocalStorageSpy.mockReturnValue(true);

    wrapper = shallow(<GameComponent />);
    expect(setGameStatusSpy).toHaveBeenCalled();
    expect(setFormValuesSpy).toHaveBeenCalled();
  });

  it('should fetch Posts after page reload during game', () => {
    spyStore.mockReturnValue({
      ...selectorProps,
      gameStatus: GameStatus.Level3,
    });
    wrapper = shallow(<GameComponent />);
    expect(fetchPostsForGameSpy).toHaveBeenCalled();
  });

  it('should not fetch if all data in place', () => {
    spyStore.mockReturnValue({
      ...selectorProps,
      gameStatus: GameStatus.Level3,
      hasPosts: true,
    });
    wrapper = shallow(<GameComponent />);
    expect(fetchPostsForGameSpy).not.toHaveBeenCalled();
  });
});
