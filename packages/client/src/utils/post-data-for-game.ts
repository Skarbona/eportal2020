import { GenderIds, LevelsIDs } from '../constants/categoriesIds';
import { gameInitialState } from '../store/game/initialState';
import { GameStateInterface } from '../store/game/initialState.interface';
import { PostResponseInterface } from '../../../service/src/models/shared-interfaces/post';

export const convertedPosts = (posts: PostResponseInterface[]): GameStateInterface['posts'] =>
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
