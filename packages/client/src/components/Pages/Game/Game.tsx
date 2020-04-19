import React, { FC, memo, useEffect } from 'react';
import { useSelector } from 'react-redux';

import { fetchCategories } from '../../../store/categories/thunks/fetchCategories';
import { setGameStatus } from '../../../store/game/thunks/setGameStatus';
import { useReduxDispatch } from '../../../store/helpers';
import GameSettings from './GameSettings/GameSettings';
import Levels from './Levels/Levels';
import { RootState } from '../../../store/store.interface';
import { GameStatus } from '../../../store/game/initialState.interface';
import { LocalStorage } from '../../../models/local-storage';
import { setFormValues } from '../../../store/game/action';
import { fetchPostsForGame } from '../../../store/game/thunks/fetchPostsForGame';
import { FormValues } from '../../../../../service/src/models/shared-interfaces/user';

interface Props {
  accessToken: string;
}

interface SelectorProps {
  gameStatus: GameStatus;
  config: FormValues;
  hasPosts: boolean;
}

export const GameComponent: FC<Props> = ({ accessToken }) => {
  const dispatch = useReduxDispatch();

  const { gameStatus, hasPosts, config } = useSelector<RootState, SelectorProps>(({ game }) => ({
    gameStatus: game.gameStatus,
    config: game.config,
    hasPosts: !!game.posts.level1.data.man?.length,
  }));

  useEffect(() => {
    if (accessToken) {
      dispatch(fetchCategories(accessToken));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accessToken]);

  useEffect(() => {
    const statusOfGame = window.localStorage.getItem(LocalStorage.GameStatus || '{}');
    const gameConfig = window.localStorage.getItem(LocalStorage.GameConfig || '{}');
    if (statusOfGame && gameConfig) {
      dispatch(setGameStatus(statusOfGame as GameStatus));
      dispatch(setFormValues(JSON.parse(gameConfig)));
    } else {
      dispatch(setGameStatus(GameStatus.NewGame));
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (config && !hasPosts && ![GameStatus.NewGame, GameStatus.Summary].includes(gameStatus)) {
      dispatch(fetchPostsForGame());
    }
  }, [gameStatus, config, hasPosts, dispatch]);

  return (
    <>
      {gameStatus === GameStatus.NewGame && <GameSettings />}
      {gameStatus !== GameStatus.NewGame && <Levels />}
    </>
  );
};

export default memo(GameComponent);
