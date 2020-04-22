import { GenderIds, LevelsIDs } from '../constants/categoriesIds';
import { gameInitialState } from '../store/game/initialState';
import { CheckIfHasEnoughPosts, GameStateInterface } from '../store/game/initialState.interface';
import { PostResponseInterface } from '../../../service/src/models/shared-interfaces/post';
import { FormValues } from '../../../service/src/models/shared-interfaces/user';
import { ActivePerson, GameStatus } from '../models/game-models';
import { CategoriesStateInterface } from '../store/categories/initialState.interface';

export const convertPosts = (posts: PostResponseInterface[]): GameStateInterface['posts'] =>
  posts.reduce(
    (result, post) => {
      const { categories } = post;
      if (categories.includes(LevelsIDs.Level1) && categories.includes(GenderIds.Woman)) {
        return {
          ...result,
          level1: {
            ...result.level1,
            data: {
              ...result.level1.data,
              woman: [...result.level1.data.woman, post],
            },
          },
        };
      }
      if (categories.includes(LevelsIDs.Level1) && categories.includes(GenderIds.Man)) {
        return {
          ...result,
          level1: {
            ...result.level1,
            data: {
              ...result.level1.data,
              man: [...result.level1.data.man, post],
            },
          },
        };
      }
      if (categories.includes(LevelsIDs.Level2) && categories.includes(GenderIds.Woman)) {
        return {
          ...result,
          level2: {
            ...result.level2,
            data: {
              ...result.level2.data,
              woman: [...result.level2.data.woman, post],
            },
          },
        };
      }
      if (categories.includes(LevelsIDs.Level2) && categories.includes(GenderIds.Man)) {
        return {
          ...result,
          level2: {
            ...result.level2,
            data: {
              ...result.level2.data,
              man: [...result.level2.data.man, post],
            },
          },
        };
      }
      if (categories.includes(LevelsIDs.Level3) && categories.includes(GenderIds.Woman)) {
        return {
          ...result,
          level3: {
            ...result.level3,
            data: {
              ...result.level3.data,
              woman: [...result.level3.data.woman, post],
            },
          },
        };
      }
      if (categories.includes(LevelsIDs.Level3) && categories.includes(GenderIds.Man)) {
        return {
          ...result,
          level3: {
            ...result.level3,
            data: {
              ...result.level3.data,
              man: [...result.level3.data.man, post],
            },
          },
        };
      }
      return result;
    },
    { ...gameInitialState.posts },
  );

export const checkIfHasEnoughPosts = (
  posts: GameStateInterface['posts'],
  levels: FormValues['levels'],
): CheckIfHasEnoughPosts => {
  const newPosts = { ...posts };
  const checkerCreator = Object.values(newPosts).map((level, index) => {
    const has = Math.min(level.data.man.length, level.data.man.length);
    const expected = Object.values(levels)[index];
    return {
      has,
      expected,
      hasEnough: has > 0 && has >= expected,
    };
  });

  return {
    hasEnough: Object.values(checkerCreator).every((level) => level.hasEnough),
    canStartWithSmallerAmount: Object.values(checkerCreator).every((level) => level.has > 0),
    level1: checkerCreator[0],
    level2: checkerCreator[1],
    level3: checkerCreator[2],
  };
};

export const randomizeNewTask = (state: GameStateInterface, activePerson: ActivePerson) => {
  const newState = { ...state };
  let tasksByLevel = null;
  if (newState.gameStatus === GameStatus.Level1) tasksByLevel = { ...newState.posts.level1 };
  if (newState.gameStatus === GameStatus.Level2) tasksByLevel = { ...newState.posts.level2 };
  if (newState.gameStatus === GameStatus.Level3) tasksByLevel = { ...newState.posts.level3 };

  const postsToRandomize =
    activePerson === ActivePerson.He ? tasksByLevel.data.man : tasksByLevel.data.woman;
  const randomIndex =
    postsToRandomize.length > 1 ? Math.floor(Math.random() * postsToRandomize.length) : 1;
  const randomTask = postsToRandomize[randomIndex];
  postsToRandomize.splice(randomIndex, 1);
  tasksByLevel.removedPosts.push(randomTask.id);
  return {
    currentTask: randomTask,
    posts: newState.posts,
  };
};

export const filterRemovedPosts = (
  posts: GameStateInterface['posts'],
): GameStateInterface['posts'] => {
  const filterData = (level: 'level1' | 'level2' | 'level3', gender: 'man' | 'woman') =>
    posts[level].data[gender].filter((post) => !posts[level].removedPosts.includes(post.id));
  return {
    level1: {
      ...posts.level1,
      data: {
        ...posts.level1.data,
        man: filterData('level1', 'man'),
        woman: filterData('level1', 'woman'),
      },
    },
    level2: {
      ...posts.level2,
      data: {
        ...posts.level2.data,
        man: filterData('level2', 'man'),
        woman: filterData('level2', 'woman'),
      },
    },
    level3: {
      ...posts.level3,
      data: {
        ...posts.level3.data,
        man: filterData('level3', 'man'),
        woman: filterData('level3', 'woman'),
      },
    },
  };
};

export const checkIfHasPosts = (
  posts: GameStateInterface['posts'],
  loading: boolean,
  error: Error,
): boolean => {
  return (
    (!!posts.level1.data.man.length ||
      !!posts.level1.data.woman.length ||
      !!posts.level2.data.man.length ||
      !!posts.level2.data.woman.length ||
      !!posts.level3.data.man.length ||
      !!posts.level3.data.woman.length) &&
    !loading &&
    !error
  );
};

export const checkIfHasCategories = ({
  preferences,
  gender,
  places,
  levels,
}: CategoriesStateInterface['categories']): boolean => {
  return !!preferences?.name && !!gender?.name && !!places?.name && !!levels?.name;
};
