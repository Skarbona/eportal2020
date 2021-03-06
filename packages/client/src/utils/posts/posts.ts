import { GenderIds, LevelsIDs } from '../../constants/categoriesIds';
import { CheckIfHasEnoughPosts, GameStateInterface } from '../../store/game/initialState.interface';
import { gameInitialState } from '../../store/game/initialState';
import { PostResponseInterface } from '../../../../service/src/models/shared-interfaces/post';
import { FormValues } from '../../../../service/src/models/shared-interfaces/user';
import { GameStatus, Gender, Levels } from '../../models/game-models';
import {
  getPostsToRandomize,
  getOnlyFavouritesPosts,
  findRandomPostIndex,
  getRandomIndex,
} from './posts-getters';
import { Posts, RandomizeNewTask } from './interface';

const setPostData = (
  level: Levels,
  gender: Gender,
  result: Posts,
  post: PostResponseInterface,
): Posts => ({
  ...result,
  [level]: {
    ...result[level],
    data: {
      ...result[level].data,
      [gender]: [...result[level].data[gender], post],
    },
  },
});

export const convertPosts = (posts: PostResponseInterface[]): Posts =>
  posts.reduce(
    (result, post) => {
      const { categories } = post;

      if (categories.includes(LevelsIDs.Level1) && categories.includes(GenderIds.Woman)) {
        return setPostData(Levels.L1, Gender.Woman, result, post);
      }
      if (categories.includes(LevelsIDs.Level1) && categories.includes(GenderIds.Man)) {
        return setPostData(Levels.L1, Gender.Man, result, post);
      }
      if (categories.includes(LevelsIDs.Level2) && categories.includes(GenderIds.Woman)) {
        return setPostData(Levels.L2, Gender.Woman, result, post);
      }
      if (categories.includes(LevelsIDs.Level2) && categories.includes(GenderIds.Man)) {
        return setPostData(Levels.L2, Gender.Man, result, post);
      }
      if (categories.includes(LevelsIDs.Level3) && categories.includes(GenderIds.Woman)) {
        return setPostData(Levels.L3, Gender.Woman, result, post);
      }
      if (categories.includes(LevelsIDs.Level3) && categories.includes(GenderIds.Man)) {
        return setPostData(Levels.L3, Gender.Man, result, post);
      }
      return result;
    },
    { ...gameInitialState.posts },
  );

export const checkIfHasEnoughPosts = (
  posts: Posts,
  levels: FormValues['levels'],
): CheckIfHasEnoughPosts => {
  const newPosts = { ...posts };
  const statusForLevel = Object.values(newPosts).map((level, index) => {
    const has = Math.min(level.data.man.length, level.data.man.length);
    const expected = Object.values(levels)[index];
    return {
      has,
      expected,
      hasEnough: has > 0 && has >= expected,
    };
  });

  return {
    hasEnough: Object.values(statusForLevel).every((level) => level.hasEnough),
    canStartWithSmallerAmount: Object.values(statusForLevel).every((level) => level.has > 0),
    level1: statusForLevel[0],
    level2: statusForLevel[1],
    level3: statusForLevel[2],
  };
};

export const randomizeNewTask = (
  { gameStatus, posts }: Partial<GameStateInterface>,
  settings: {
    favouritesPosts: string[];
    gender: Gender;
    onlyFavourites: boolean;
  },
): RandomizeNewTask => {
  const { favouritesPosts, gender, onlyFavourites } = settings;
  const setRandomizeData = (
    storePosts: Posts,
    level: Levels,
    genderToSelect: Gender,
  ): RandomizeNewTask => {
    const gamePosts = {
      ...storePosts,
      [level]: {
        ...storePosts[level],
        data: {
          ...storePosts[level].data,
          man: [...storePosts[level].data.man],
          woman: [...storePosts[level].data.woman],
        },
        removedPosts: [...storePosts[level].removedPosts],
      },
    };
    const postsByLevel = gamePosts[level];
    const postsByGender = postsByLevel.data[genderToSelect];
    const postsToRandom = getPostsToRandomize(
      getOnlyFavouritesPosts(postsByGender, favouritesPosts),
      postsByGender,
      onlyFavourites,
    );

    const randomPost = postsToRandom[getRandomIndex(postsToRandom)];
    const randomPostIndex = findRandomPostIndex(postsByGender, randomPost);

    postsByGender.splice(randomPostIndex, 1);
    postsByLevel.removedPosts.push(randomPost.id);

    return {
      currentTask: randomPost,
      posts: gamePosts,
    };
  };

  if (gameStatus === GameStatus.Level1) return setRandomizeData(posts, Levels.L1, gender);
  if (gameStatus === GameStatus.Level2) return setRandomizeData(posts, Levels.L2, gender);
  return setRandomizeData(posts, Levels.L3, gender);
};

export const filterRemovedPosts = (posts: Posts): Posts => {
  const filterData = (level: Levels, gender: Gender): Posts['level1']['data']['man'] =>
    posts[level].data[gender].filter((post) => !posts[level].removedPosts.includes(post.id));

  const setLevelsData = (level: Levels): Posts['level1'] => {
    return {
      ...posts[level],
      data: {
        ...posts[level].data,
        man: filterData(level, Gender.Man),
        woman: filterData(level, Gender.Woman),
      },
    };
  };

  return {
    level1: setLevelsData(Levels.L1),
    level2: setLevelsData(Levels.L2),
    level3: setLevelsData(Levels.L3),
  };
};

export const checkIfHasPosts = (
  { level1, level2, level3 }: Posts,
  loading: boolean,
  error: Error,
): boolean => {
  return (
    (!!level1.data.man.length ||
      !!level1.data.woman.length ||
      !!level2.data.man.length ||
      !!level2.data.woman.length ||
      !!level3.data.man.length ||
      !!level3.data.woman.length) &&
    !loading &&
    !error
  );
};
