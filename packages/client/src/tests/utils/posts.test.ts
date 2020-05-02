import {
  convertPosts,
  checkIfHasEnoughPosts,
  randomizeNewTask,
  filterRemovedPosts,
  checkIfHasPosts,
} from '../../utils/posts';
import { postsResponseMock } from '../../mocks/responses';
import { mockedStore } from '../../mocks/store';
import { GameStatus, Gender } from '../../models/game-models';

describe('convertedPosts utility function', () => {
  it('should return proper object for provided arguments', () => {
    const returnValue = convertPosts(postsResponseMock());
    Object.values(returnValue).forEach((level) => {
      expect(level.data.man).toHaveLength(1);
      expect(level.data.woman).toHaveLength(1);
    });
  });
});

describe('checkIfHasEnoughPosts utility function', () => {
  it('should pass all check if user fetched enough posts', () => {
    const { game } = mockedStore();
    const hasEnough = checkIfHasEnoughPosts(game.posts, { level1: 1, level2: 1, level3: 1 });
    expect(hasEnough.hasEnough).toEqual(true);
  });

  it('should allow for start with smaller amount of tasks', () => {
    const { game } = mockedStore();
    const hasEnough = checkIfHasEnoughPosts(game.posts, { level1: 100, level2: 1, level3: 1 });
    expect(hasEnough.hasEnough).toEqual(false);
    expect(hasEnough.canStartWithSmallerAmount).toEqual(true);
  });

  it('should not allow for start if no tasks', () => {
    const { game } = mockedStore();
    game.posts.level2.data.man = [];
    const hasEnough = checkIfHasEnoughPosts(game.posts, { level1: 1, level2: 1, level3: 1 });
    expect(hasEnough.hasEnough).toEqual(false);
    expect(hasEnough.canStartWithSmallerAmount).toEqual(false);
  });
});

describe('randomizeNewTask utility function', () => {
  it('should return random task for selected gender', () => {
    const { game } = mockedStore();
    const firstTask = randomizeNewTask(
      { gameStatus: GameStatus.Level1, posts: game.posts },
      Gender.Woman,
    );
    expect(firstTask.currentTask.id).toBeTruthy();
    expect(firstTask.posts.level1.removedPosts[0]).toEqual(firstTask.currentTask.id);
    expect(firstTask.posts.level1.data.woman).toHaveLength(1);
    expect(firstTask.posts.level1.data.man).toHaveLength(2);

    const secondTask = randomizeNewTask(
      { gameStatus: GameStatus.Level2, posts: game.posts },
      Gender.Man,
    );
    expect(secondTask.currentTask.id).toBeTruthy();
    expect(secondTask.posts.level2.removedPosts[0]).toEqual(secondTask.currentTask.id);
    expect(secondTask.posts.level2.data.woman).toHaveLength(2);
    expect(secondTask.posts.level2.data.man).toHaveLength(1);

    const thirdTask = randomizeNewTask(
      { gameStatus: GameStatus.Level3, posts: game.posts },
      Gender.Man,
    );
    expect(thirdTask.currentTask.id).toBeTruthy();
    expect(thirdTask.posts.level3.removedPosts[0]).toEqual(thirdTask.currentTask.id);
    expect(thirdTask.posts.level3.data.woman).toHaveLength(2);
    expect(thirdTask.posts.level3.data.man).toHaveLength(1);
  });
});

describe('filterRemovedPosts utility function', () => {
  it('should return post without removed one', () => {
    const {
      game: { posts },
    } = mockedStore();
    const removedPostId = posts.level1.data.man[0].id;
    posts.level1.removedPosts = [removedPostId];
    const filteredPosts = filterRemovedPosts(posts);
    expect(filteredPosts.level1.data.man).toHaveLength(1);
    expect(filteredPosts.level1.data.man[0].id).not.toEqual(removedPostId);
    expect(filteredPosts.level1.removedPosts).toHaveLength(1);
    expect(filteredPosts.level1.removedPosts[0]).toEqual(removedPostId);
  });

  it('should handle filtering more removedPosts', () => {
    const {
      game: { posts },
    } = mockedStore();
    const removedPostId1 = posts.level2.data.woman[0].id;
    const removedPostId2 = posts.level2.data.woman[1].id;
    posts.level2.removedPosts = [removedPostId1, removedPostId2];
    const filteredPosts = filterRemovedPosts(posts);
    expect(filteredPosts.level2.removedPosts).toHaveLength(2);
    expect(filteredPosts.level2.data.woman).toHaveLength(0);
    expect(filteredPosts.level2.removedPosts[0]).toEqual(removedPostId1);
    expect(filteredPosts.level2.removedPosts[1]).toEqual(removedPostId2);
  });
});

describe('checkIfHasPosts utility function', () => {
  it('should return true if has at least 1 post', () => {
    const {
      game: { posts },
    } = mockedStore();
    const hasPost = checkIfHasPosts(posts, false, null);
    expect(hasPost).toEqual(true);
  });

  it('should return false if it is loading', () => {
    const {
      game: { posts },
    } = mockedStore();
    const hasPost = checkIfHasPosts(posts, true, null);
    expect(hasPost).toEqual(false);
  });

  it('should return false if error appear', () => {
    const {
      game: { posts },
    } = mockedStore();
    const hasPost = checkIfHasPosts(posts, false, new Error());
    expect(hasPost).toEqual(false);
  });
});
