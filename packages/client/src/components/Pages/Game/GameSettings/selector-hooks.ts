import { useSelector } from 'react-redux';
import { CheckIfHasEnoughPosts } from '../../../../store/game/initialState.interface';
import { RootState } from '../../../../store/store.interface';
import { FormValues } from '../../../../../../service/src/models/shared-interfaces/user';
import { CategoriesStateInterface } from '../../../../store/categories/initialState.interface';
import { ErrorTypes } from '../../../../models/errors';

interface SelectorGameStartProps {
  isReadyToStartGame: CheckIfHasEnoughPosts;
  levels: string[];
  levelsValues: CheckIfHasEnoughPosts['level1'][];
}

export const useGameStartSelector = (): SelectorGameStartProps => {
  return useSelector<RootState, SelectorGameStartProps>(({ game, categories }) => ({
    isReadyToStartGame: game.isReadyToStartGame,
    levelsValues: [
      game.isReadyToStartGame?.level1,
      game.isReadyToStartGame?.level2,
      game.isReadyToStartGame?.level3,
    ],
    levels: categories.categories.levels?.children.map((level) => level.name),
  }));
};

export interface SelectorGameSettingsProps {
  cats: CategoriesStateInterface['categories'];
  loading: boolean;
  error: Error;
  errorType: ErrorTypes;
  defaults: FormValues;
  userCanStartGame: boolean;
}

export const useGameSettingsSelector = (): SelectorGameSettingsProps => {
  return useSelector<RootState, SelectorGameSettingsProps>(({ categories, game, user, app }) => ({
    cats: categories.categories,
    loading: categories.loading || game.loading,
    error: categories.error || game.error || user.error,
    errorType: categories.errorType || game.errorType || user.errorType,
    defaults: user.userData.gameDefaults,
    accessToken: app.auth.accessToken,
    userCanStartGame: game.isReadyToStartGame?.hasEnough,
  }));
};
