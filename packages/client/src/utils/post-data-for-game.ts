import { GenderIds, LevelsIDs } from '../constants/categoriesIds';
import { gameInitialState } from '../store/game/initialState';
import { CheckIfHasEnoughPosts, GameStateInterface } from '../store/game/initialState.interface';
import { PostResponseInterface } from '../../../service/src/models/shared-interfaces/post';
import { FormValues } from '../../../service/src/models/shared-interfaces/user';

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
