import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import * as redux from 'react-redux';

import { LevelsComponent } from '../../../../components/Pages/Game/Levels/Levels';
import LevelsNavigation from '../../../../components/Pages/Game/Levels/LevelsNavigation/LevelsNavigation';
import TaskCounter from '../../../../components/Pages/Game/Levels/TaskCounter';
import TaskRandomizer from '../../../../components/Pages/Game/Levels/TaskRandomizer';
import TaskContent from '../../../../components/Pages/Game/Levels/TaskContent';
import TaskActions from '../../../../components/Pages/Game/Levels/TaskActions';
import Summary from '../../../../components/Pages/Game/Levels/Summary';
import PageHeading from '../../../../components/Shared/PageElements/PageHeading/PageHeading';
import PageContainer from '../../../../components/Shared/PageElements/PageContainer/PageContainer';

import * as gameActions from '../../../../store/game/action';
import { mockedStore } from '../../../../mocks/store';
import { GameStatus } from '../../../../models/game-models';
import { PropsLevelSelector } from '../../../../components/Pages/Game/Levels/selector-hooks';
import { postsResponseMock } from '../../../../mocks/responses';
import { LocalStorage } from '../../../../models/local-storage';

describe('<Levels /> component', () => {
  let wrapper: ShallowWrapper;
  let spyStore: any;
  let saveActiveGameDataSpy: any;
  let selectorProps: PropsLevelSelector;
  let setItemLocalStorageSpy: any;
  let mockedGetItems: any;

  beforeEach(() => {
    const { game, categories } = mockedStore();
    selectorProps = {
      gameStatus: GameStatus.Level1,
      config: game.config,
      levels: categories.categories.levels.children,
      currentTask: game.currentTask,
      posts: game.posts,
      configLevels: game.config.levels,
      removedPosts: [
        game.posts.level1.removedPosts,
        game.posts.level2.removedPosts,
        game.posts.level3.removedPosts,
      ],
    };
    spyStore = jest.spyOn(redux, 'useSelector');
    setItemLocalStorageSpy = jest.spyOn(window.localStorage.__proto__, 'setItem');
    mockedGetItems = jest
      .spyOn(window.localStorage.__proto__, 'getItem')
      .mockImplementation((value) => {
        if (value === LocalStorage.CurrentTask) return JSON.stringify({ id: 'ID' });
        if (value === LocalStorage.RemovedPosts) return JSON.stringify([]);
        return JSON.stringify([]);
      });
    saveActiveGameDataSpy = jest.spyOn(gameActions, 'saveActiveGameData');
  });

  afterEach(() => {
    spyStore.mockRestore();
    saveActiveGameDataSpy.mockClear();
    setItemLocalStorageSpy.mockClear();
    mockedGetItems.mockClear();
  });

  it('should render all required items', () => {
    spyStore.mockReturnValue({ ...selectorProps } as PropsLevelSelector);
    wrapper = shallow(<LevelsComponent />);
    expect(wrapper.find(PageHeading)).toHaveLength(1);
    expect(wrapper.find(PageContainer)).toHaveLength(1);
    expect(wrapper.find(LevelsNavigation)).toHaveLength(1);
    expect(wrapper.find(TaskCounter)).toHaveLength(1);
    expect(wrapper.find(TaskRandomizer)).toHaveLength(1);
    expect(wrapper.find(TaskActions)).toHaveLength(0);
    expect(wrapper.find(TaskContent)).toHaveLength(0);
    expect(wrapper.find(Summary)).toHaveLength(0);
  });

  it('should not render any element if no levels', () => {
    spyStore.mockReturnValue({ ...selectorProps, levels: null } as PropsLevelSelector);
    wrapper = shallow(<LevelsComponent />);
    expect(wrapper.find(PageHeading)).toHaveLength(0);
    expect(wrapper.find(PageContainer)).toHaveLength(0);
    expect(wrapper.find(LevelsNavigation)).toHaveLength(0);
    expect(wrapper.find(TaskCounter)).toHaveLength(0);
    expect(wrapper.find(TaskRandomizer)).toHaveLength(0);
    expect(wrapper.find(TaskActions)).toHaveLength(0);
    expect(wrapper.find(TaskContent)).toHaveLength(0);
    expect(wrapper.find(Summary)).toHaveLength(0);
  });

  it('should render all required items if currentTask set', () => {
    spyStore.mockReturnValue({
      ...selectorProps,
      currentTask: postsResponseMock()[0],
    } as PropsLevelSelector);
    wrapper = shallow(<LevelsComponent />);
    expect(wrapper.find(PageHeading)).toHaveLength(1);
    expect(wrapper.find(PageContainer)).toHaveLength(1);
    expect(wrapper.find(LevelsNavigation)).toHaveLength(1);
    expect(wrapper.find(TaskCounter)).toHaveLength(1);
    expect(wrapper.find(TaskRandomizer)).toHaveLength(0);
    expect(wrapper.find(TaskActions)).toHaveLength(1);
    expect(wrapper.find(TaskContent)).toHaveLength(1);
    expect(wrapper.find(Summary)).toHaveLength(0);
  });

  it('should render all required items for summary Page', () => {
    spyStore.mockReturnValue({
      ...selectorProps,
      gameStatus: GameStatus.Summary,
    } as PropsLevelSelector);
    wrapper = shallow(<LevelsComponent />);
    expect(wrapper.find(PageHeading)).toHaveLength(1);
    expect(wrapper.find(PageContainer)).toHaveLength(1);
    expect(wrapper.find(LevelsNavigation)).toHaveLength(1);
    expect(wrapper.find(TaskCounter)).toHaveLength(0);
    expect(wrapper.find(TaskRandomizer)).toHaveLength(0);
    expect(wrapper.find(TaskActions)).toHaveLength(0);
    expect(wrapper.find(TaskContent)).toHaveLength(0);
    expect(wrapper.find(Summary)).toHaveLength(1);
  });

  it('should set config in LocalStorage', () => {
    spyStore.mockReturnValue({ ...selectorProps } as PropsLevelSelector);
    wrapper = shallow(<LevelsComponent />);
    expect(setItemLocalStorageSpy).toHaveBeenCalledWith(
      LocalStorage.GameConfig,
      JSON.stringify(selectorProps.config),
    );
  });

  it('should get currentTask and removedPosts from LocalStorage', () => {
    spyStore.mockReturnValue({ ...selectorProps } as PropsLevelSelector);
    wrapper = shallow(<LevelsComponent />);
    expect(mockedGetItems).toHaveBeenCalledTimes(2);
    expect(mockedGetItems).toHaveBeenCalledWith(LocalStorage.CurrentTask || '{}');
    expect(mockedGetItems).toHaveBeenCalledWith(LocalStorage.RemovedPosts || '{}');
  });

  it('should call saveActiveGameData if data from LocalStorage exists ', () => {
    spyStore.mockReturnValue({ ...selectorProps } as PropsLevelSelector);
    wrapper = shallow(<LevelsComponent />);

    expect(saveActiveGameDataSpy).toHaveBeenCalled();
  });
});
