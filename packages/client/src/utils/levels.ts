import { GameStatus, Gender, Levels, TimeMode } from '../models/game-models';
import { CategoryInterface } from '../store/categories/initialState.interface';
import { GameStateInterface } from '../store/game/initialState.interface';
import { FormValues } from '../../../service/src/models/shared-interfaces/user';
import { GenderIds } from '../constants/categoriesIds';

export const setGameStatusHelper = (currentStatus: GameStatus): GameStatus => {
  if (currentStatus === GameStatus.Level1) return GameStatus.Level2;
  if (currentStatus === GameStatus.Level2) return GameStatus.Level3;
  if (currentStatus === GameStatus.Level3) return GameStatus.Summary;
  return GameStatus.NewGame;
};

export const getGameStatusIndex = (currentStatus: GameStatus): number => {
  if (currentStatus === GameStatus.Level1) return 0;
  if (currentStatus === GameStatus.Level2) return 1;
  return 2;
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

export const taskCounter = (
  gameStatus: GameStatus,
  posts: GameStateInterface['posts'],
  configLevels: FormValues['levels'],
): TaskCounter => {
  const taskCounterReturnHandler = (level: Levels): TaskCounter => ({
    currentTaskNo: posts[level].removedPosts.length,
    taskPerLevel: configLevels[level],
  });

  if (gameStatus === GameStatus.Level1) return taskCounterReturnHandler(Levels.L1);
  if (gameStatus === GameStatus.Level2) return taskCounterReturnHandler(Levels.L2);
  return taskCounterReturnHandler(Levels.L3);
};

export const randomizeTime = (
  time: GameStateInterface['config']['time'],
  isPremium: boolean,
): number => {
  if (!isPremium) return 2;
  if (time.type === TimeMode.Single) return time.value[0];

  return Math.floor(Math.random() * (time.value[1] - time.value[0] + 1)) + time.value[0];
};

export const convertSecondsToMinutes = (seconds: number): string => {
  const min = Math.floor(seconds / 60);
  const sec = Math.floor(seconds % 60);
  // eslint-disable-next-line: prefer-template
  return `${min < 10 ? `0${min}` : min}:${sec < 10 ? `0${sec}` : sec}`;
};

export const convertSecondsToPercent = (seconds: number, gameTimeInMinutes: number): number =>
  100 - (seconds / (gameTimeInMinutes * 60)) * 100;

export const pointsHandler = (cats: string[], points: number): GameStateInterface['points'] => {
  const taskGender = cats.includes(GenderIds.Woman) ? Gender.Woman : Gender.Man;
  return {
    man: taskGender === Gender.Man ? points : 0,
    woman: taskGender === Gender.Woman ? points : 0,
  };
};

export const whoIsWinnerHandler = (points: GameStateInterface['points']): Gender => {
  if (points.man === points.woman) return null;
  if (points.man > points.woman) return Gender.Man;
  return Gender.Woman;
};
