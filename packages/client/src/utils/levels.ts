import { GameStatus } from '../store/game/initialState.interface';
import { CategoryInterface } from '../store/categories/initialState.interface';

export const setGameStatusHelper = (currentStatus: GameStatus): GameStatus => {
  if (currentStatus === GameStatus.Level1) return GameStatus.Level2;
  if (currentStatus === GameStatus.Level2) return GameStatus.Level3;
  if (currentStatus === GameStatus.Level3) return GameStatus.Summary;
  return GameStatus.NewGame;
};

export const setGameTitleHelper = (
  currentStatus: GameStatus,
  levels: CategoryInterface[],
): string => {
  if (currentStatus === GameStatus.Level1) return levels[0].name;
  if (currentStatus === GameStatus.Level2) return levels[1].name;
  if (currentStatus === GameStatus.Level3) return levels[2].name;
  return '';
};
