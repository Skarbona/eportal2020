import { useSelector } from 'react-redux';
import { RootState } from '../../../../store/store.interface';
import { CategoryInterface } from '../../../../store/categories/initialState.interface';
import { FormValues } from '../../../../../../service/src/models/shared-interfaces/user';
import { PostResponseInterface } from '../../../../../../service/src/models/shared-interfaces/post';
import { GameStatus } from '../../../../models/game-models';
import { GameStateInterface } from '../../../../store/game/initialState.interface';

export interface PropsLevelSelector {
  gameStatus: GameStatus;
  levels: CategoryInterface[];
  currentTask: PostResponseInterface;
  removedPosts: string[][];
  config: GameStateInterface['config'];
  posts: GameStateInterface['posts'];
  configLevels: FormValues['levels'];
}

export const useLevelsSelector = (): PropsLevelSelector => {
  return useSelector<RootState, PropsLevelSelector>(
    ({ game, categories }): PropsLevelSelector => ({
      gameStatus: game.gameStatus,
      config: game.config,
      levels: categories.categories?.levels?.children,
      currentTask: game.currentTask,
      posts: game.posts,
      configLevels: game.config?.levels,
      removedPosts: [
        game.posts.level1.removedPosts,
        game.posts.level2.removedPosts,
        game.posts.level3.removedPosts,
      ],
    }),
  );
};

export interface PropsTaskRandomizationSelector {
  she: string;
  he: string;
  gameStatus: GameStatus;
  points: GameStateInterface['points'];
  favouritesPosts: string[];
  onlyFavourites: boolean;
}

export const useTaskRandomizationSelector = (): PropsTaskRandomizationSelector => {
  return useSelector<RootState, PropsTaskRandomizationSelector>(
    ({ game, user }): PropsTaskRandomizationSelector => ({
      she: game.config?.names.she,
      he: game.config?.names.he,
      gameStatus: game.gameStatus,
      points: game.points,
      favouritesPosts: user.userData.favouritesPosts,
      onlyFavourites: game.config.onlyFavourites,
    }),
  );
};

export interface PropsTaskContentSelector {
  allCatsMap: Map<string, string>;
  categories: PostResponseInterface['categories'];
  content: PostResponseInterface['content'];
  image: PostResponseInterface['image'];
  she: string;
  he: string;
  id: string;
}

export const useTaskContentSelector = (): PropsTaskContentSelector => {
  return useSelector<RootState, PropsTaskContentSelector>(
    ({ game, categories }): PropsTaskContentSelector => ({
      allCatsMap: categories.allCatsMap,
      categories: game.currentTask?.categories,
      content: game.currentTask?.content,
      image: game.currentTask?.image,
      id: game.currentTask?.id,
      she: game.config?.names.she,
      he: game.config?.names.he,
    }),
  );
};

export interface PropsTaskPointsSelector {
  she: string;
  he: string;
  points: { man: number; woman: number };
}

export const useTaskPointsSelector = (): PropsTaskPointsSelector => {
  return useSelector<RootState, PropsTaskPointsSelector>(
    ({ game }): PropsTaskPointsSelector => ({
      she: game.config?.names.she,
      he: game.config?.names.he,
      points: game.points,
    }),
  );
};

export interface PropsTaskActionsSelector {
  time: GameStateInterface['config']['time'];
  gameStatus: GameStatus;
  currentTask: GameStateInterface['currentTask'];
}

export const useTaskActionsSelector = (): PropsTaskActionsSelector => {
  return useSelector<RootState, PropsTaskActionsSelector>(
    ({ game }): PropsTaskActionsSelector => ({
      time: game.config.time,
      gameStatus: game.gameStatus,
      currentTask: game.currentTask,
    }),
  );
};
