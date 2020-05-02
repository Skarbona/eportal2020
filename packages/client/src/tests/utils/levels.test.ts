import {
  setGameStatusHelper,
  getGameStatusIndex,
  setGameTitleHelper,
  taskCounter,
  randomizeTime,
  convertSecondsToMinutes,
  convertSecondsToPercent,
  pointsHandler,
  whoIsWinnerHandler,
} from '../../utils/levels';
import { GameStatus, Gender, TimeMode } from '../../models/game-models';
import { mockedStore } from '../../mocks/store';
import { GenderIds } from '../../constants/categoriesIds';

describe('setGameStatusHelper utility function', () => {
  it('should return proper gameStatus', () => {
    const first = setGameStatusHelper(GameStatus.Level1);
    expect(first).toEqual(GameStatus.Level2);
    const second = setGameStatusHelper(GameStatus.Level2);
    expect(second).toEqual(GameStatus.Level3);
    const third = setGameStatusHelper(GameStatus.Level3);
    expect(third).toEqual(GameStatus.Summary);
    const fourth = setGameStatusHelper(GameStatus.Summary);
    expect(fourth).toEqual(GameStatus.NewGame);
  });
});

describe('getGameStatusIndex utility function', () => {
  it('should return proper indexes', () => {
    const first = getGameStatusIndex(GameStatus.Level1);
    expect(first).toEqual(0);
    const second = getGameStatusIndex(GameStatus.Level2);
    expect(second).toEqual(1);
    const third = getGameStatusIndex(GameStatus.Level3);
    expect(third).toEqual(2);
  });
});

describe('setGameTitleHelper utility function', () => {
  it('should return proper names', () => {
    const { categories } = mockedStore();
    const { children } = categories.categories.levels;
    const first = setGameTitleHelper(GameStatus.Level1, children);
    expect(first).toEqual('children1');
    const second = setGameTitleHelper(GameStatus.Level2, children);
    expect(second).toEqual('children2');
    const third = setGameTitleHelper(GameStatus.Level3, children);
    expect(third).toEqual('children3');
  });
});

describe('taskCounter utility function', () => {
  it('should return valid values', () => {
    const { game } = mockedStore();
    const first = taskCounter(GameStatus.Level1, game.posts, game.config.levels);
    expect(first.taskPerLevel).toEqual(11);
    expect(first.currentTaskNo).toEqual(0);

    game.posts.level2.removedPosts = ['TASK_ID', 'TASK_ID'];
    const second = taskCounter(GameStatus.Level2, game.posts, game.config.levels);
    expect(second.taskPerLevel).toEqual(11);
    expect(second.currentTaskNo).toEqual(2);

    game.posts.level2.removedPosts = ['TASK_ID', 'TASK_ID', 'TASK_ID'];
    const third = taskCounter(GameStatus.Level2, game.posts, game.config.levels);
    expect(third.taskPerLevel).toEqual(11);
    expect(third.currentTaskNo).toEqual(3);
  });
});

describe('randomizeTime utility function', () => {
  it('should return valid values for SingleTime', () => {
    const single = randomizeTime({ type: TimeMode.Single, value: [3] });
    expect(single).toEqual(3);
  });

  it('should return valid values for RangeTime', () => {
    const range = randomizeTime({ type: TimeMode.Range, value: [2, 5] });
    expect(range).toBeGreaterThanOrEqual(2);
    expect(range).toBeLessThanOrEqual(5);
  });
});

describe('convertSecondsToMinutes utility function', () => {
  it('should return valid string', () => {
    const time = convertSecondsToMinutes(126);
    expect(time).toEqual('02:06');
  });
});

describe('convertSecondsToPercent utility function', () => {
  it('should return valid percent', () => {
    const time = convertSecondsToPercent(60, 2);
    expect(time).toEqual(50);
  });
});

describe('pointsHandler utility function', () => {
  it('should return proper object', () => {
    const points = pointsHandler([GenderIds.Woman], 3);
    expect(points).toEqual({
      man: 0,
      woman: 3,
    });
  });
});

describe('whoIsWinnerHandler utility function', () => {
  it('should return null if it is draft', () => {
    const winner = whoIsWinnerHandler({ man: 3, woman: 3 });
    expect(winner).toEqual(null);
  });

  it('should return Woman if she is a winner', () => {
    const winner = whoIsWinnerHandler({ man: 3, woman: 6 });
    expect(winner).toEqual(Gender.Woman);
  });

  it('should return Man if he is a winner', () => {
    const winner = whoIsWinnerHandler({ man: 13, woman: 6 });
    expect(winner).toEqual(Gender.Man);
  });
});
