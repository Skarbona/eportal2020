import * as I from '../../../store/game/action.interface';
import { GameEnum } from '../../../store/game/enum';
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
});
