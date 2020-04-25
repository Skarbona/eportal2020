import * as I from '../../../store/game/action.interface';
import { GameEnum } from '../../../store/game/enum';
import { GameStatus, Gender } from '../../../models/game-models';
import * as A from '../../../store/game/action';
import { postsResponseMock } from '../../../mocks/responses';

describe('Actions: Game', () => {
  it('should create initFetchPosts action', () => {
    const expectedAction: I.InitFetchPosts = {
      type: GameEnum.InitFetchPosts,
    };

    const action = A.initFetchPosts();
    expect(action).toEqual(expectedAction);
  });

  it('should create successFetchPosts action', () => {
    const posts = postsResponseMock();
    const expectedAction: I.SuccessFetchPosts = {
      type: GameEnum.SuccessFetchPosts,
      data: {
        posts,
      },
    };
    const action = A.successFetchPosts(posts);
    expect(action).toEqual(expectedAction);
  });

  it('should create failFetchPosts action', () => {
    const error = new Error();
    const expectedAction: I.FailFetchPosts = {
      type: GameEnum.FailFetchPosts,
      data: {
        error,
      },
    };
    const action = A.failFetchPosts(error);
    expect(action).toEqual(expectedAction);
  });

  it('should create setFormValues action', () => {
    const values = {};
    const expectedAction: I.SetFormValues = {
      type: GameEnum.SetFormValues,
      data: {
        values,
      },
    };
    const action = A.setFormValues(values);
    expect(action).toEqual(expectedAction);
  });

  it('should create cleanGameData action', () => {
    const expectedAction: I.CleanGameData = {
      type: GameEnum.CleanGameData,
    };

    const action = A.cleanGameData();
    expect(action).toEqual(expectedAction);
  });

  it('should create saveGameStatus action', () => {
    const expectedAction: I.SaveGameStatus = {
      type: GameEnum.SaveGameStatus,
      data: {
        gameStatus: GameStatus.Level1,
      },
    };

    const action = A.saveGameStatus(GameStatus.Level1);
    expect(action).toEqual(expectedAction);
  });

  it('should create cleanIsReadyToGameData action', () => {
    const expectedAction: I.CleanIsReadyToGameData = {
      type: GameEnum.CleanIsReadyToGameData,
    };

    const action = A.cleanIsReadyToGameData();
    expect(action).toEqual(expectedAction);
  });

  it('should create saveActiveGameData action', () => {
    const expectedAction: I.SaveActiveGameData = {
      type: GameEnum.SaveActiveGameData,
      data: {
        currentTask: null,
        removedPosts: [],
      },
    };

    const action = A.saveActiveGameData(null, []);
    expect(action).toEqual(expectedAction);
  });

  it('should create CleanCurrentTask action', () => {
    const expectedAction: I.CleanCurrentTask = {
      type: GameEnum.CleanCurrentTask,
    };

    const action = A.cleanCurrentTask();
    expect(action).toEqual(expectedAction);
  });

  it('should create RandomizeTask action', () => {
    const expectedAction: I.RandomizeTask = {
      type: GameEnum.RandomizeTask,
      data: {
        activePerson: Gender.Woman,
      },
    };

    const action = A.randomizeTask(Gender.Woman);
    expect(action).toEqual(expectedAction);
  });
});
