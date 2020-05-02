import React, { FC, memo, useEffect } from 'react';
import { useSelector } from 'react-redux';

import { fetchCategories } from '../../../store/categories/thunks/fetchCategories';
import { setGameStatus } from '../../../store/game/thunks/setGameStatus';
import { useReduxDispatch } from '../../../store/helpers';
import GameSettings from './GameSettings/GameSettings';
import Levels from './Levels/Levels';
import { RootState } from '../../../store/store.interface';
import { GameStatus } from '../../../models/game-models';
import { LocalStorage } from '../../../models/local-storage';
import { saveActiveGameData, setFormValues } from '../../../store/game/action';
import { fetchPostsForGame } from '../../../store/game/thunks/fetchPostsForGame';
import { FormValues } from '../../../../../service/src/models/shared-interfaces/user';
import { checkIfHasPosts } from '../../../utils/posts';
import { checkIfHasCategories } from '../../../utils/categories';

interface Props {
  accessToken: string;
}

export interface SelectorProps {
  gameStatus: GameStatus;
  config: FormValues;
  hasPosts: boolean;
  hasCategories: boolean;
}

export const GameComponent: FC<Props> = ({ accessToken }) => {
  const dispatch = useReduxDispatch();

  const { gameStatus, hasPosts, config, hasCategories } = useSelector<RootState, SelectorProps>(
    ({ game, categories }) => ({
      gameStatus: game.gameStatus,
      config: game.config,
      hasPosts: checkIfHasPosts(game.posts, game.loading, game.error),
      hasCategories: checkIfHasCategories(categories.categories),
    }),
  );

  useEffect(() => {
    if (accessToken) {
      dispatch(fetchCategories(accessToken));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accessToken]);

  useEffect(() => {
    const statusOfGame = window.localStorage.getItem(LocalStorage.GameStatus || '{}');
    const gameConfig = window.localStorage.getItem(LocalStorage.GameConfig || '{}');

    if (!!statusOfGame && !!gameConfig) {
      dispatch(setGameStatus(statusOfGame as GameStatus));
      dispatch(setFormValues(JSON.parse(gameConfig)));
    } else {
      dispatch(setGameStatus(GameStatus.NewGame));
      dispatch(saveActiveGameData(null, [[], [], []]));
      window.localStorage.removeItem(LocalStorage.CurrentTask);
      window.localStorage.removeItem(LocalStorage.RemovedPosts);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (accessToken && config && !hasPosts && GameStatus.NewGame !== gameStatus) {
      dispatch(fetchPostsForGame());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameStatus, config, hasPosts]);

  return (
    <>
      {gameStatus === GameStatus.NewGame && <GameSettings />}
      {gameStatus !== GameStatus.NewGame && hasPosts && hasCategories && <Levels />}
    </>
  );
};

export default memo(GameComponent);
