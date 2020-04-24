import { GameStatus, Gender, Levels } from '../models/game-models';
import { CategoryInterface } from '../store/categories/initialState.interface';
import { GameStateInterface } from '../store/game/initialState.interface';

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

export const randomizeUser = (): Gender => {
  const random = Math.random();
  return random > 0.5 ? Gender.Woman : Gender.Man;
};

interface TaskCounter {
  currentTaskNo: number;
  taskPerLevel: number;
}

export const taskCounter = ({ gameStatus, posts, config }: GameStateInterface): TaskCounter => {
  const taskCounterReturnHandler = (level: Levels) => ({
    currentTaskNo: posts[level].removedPosts.length,
    taskPerLevel: config.levels[level],
  });

  if (gameStatus === GameStatus.Level1) return taskCounterReturnHandler(Levels.L1);
  if (gameStatus === GameStatus.Level2) return taskCounterReturnHandler(Levels.L2);
  if (gameStatus === GameStatus.Level3) return taskCounterReturnHandler(Levels.L3);
};
