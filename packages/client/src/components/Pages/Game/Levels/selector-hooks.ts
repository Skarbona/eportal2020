import { useSelector } from 'react-redux';
import { RootState } from '../../../../store/store.interface';
import { CategoryInterface } from '../../../../store/categories/initialState.interface';
import { FormValues } from '../../../../../../service/src/models/shared-interfaces/user';
import { PostResponseInterface } from '../../../../../../service/src/models/shared-interfaces/post';
import { GameStatus } from '../../../../models/game-models';
import { GameStateInterface } from '../../../../store/game/initialState.interface';

interface PropsLevelSelector {
  gameStatus: GameStatus;
  levels: CategoryInterface[];
  currentTask: PostResponseInterface;
  removedPosts: string[][];
  config: GameStateInterface['config'];
  posts: GameStateInterface['posts'];
  configLevels: FormValues['levels'];
  time: GameStateInterface['config']['time'];
}

export const useLevelsSelector = (): PropsLevelSelector => {
  return useSelector<RootState, PropsLevelSelector>(
    ({ game, categories }): PropsLevelSelector => ({
      gameStatus: game.gameStatus,
      config: game.config,
      levels: categories.categories?.levels?.children,
      currentTask: game.currentTask,
      posts: game.posts,
      time: game.config.time,
      configLevels: game.config?.levels,
      removedPosts: [
        game.posts.level1.removedPosts,
        game.posts.level2.removedPosts,
        game.posts.level3.removedPosts,
      ],
    }),
  );
};

interface PropsTaskRandomizationSelector {
  she: string;
  he: string;
}

export const useTaskRandomizationSelector = (): PropsTaskRandomizationSelector => {
  return useSelector<RootState, PropsTaskRandomizationSelector>(
    ({ game }): PropsTaskRandomizationSelector => ({
      she: game.config?.names.she,
      he: game.config?.names.he,
    }),
  );
};

interface PropsTaskContentSelector {
  allCatsMap: Map<string, string>;
  currentTask: PostResponseInterface;
  she: string;
  he: string;
}

export const useTaskContentSelector = (): PropsTaskContentSelector => {
  return useSelector<RootState, PropsTaskContentSelector>(
    ({ game, categories }): PropsTaskContentSelector => ({
      allCatsMap: categories.allCatsMap,
      currentTask: game.currentTask,
      she: game.config?.names.she,
      he: game.config?.names.he,
    }),
  );
};
