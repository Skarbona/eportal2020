import React, { FC, memo, useEffect, Fragment } from 'react';
import { useSelector } from 'react-redux';

import { fetchCategories } from '../../../store/categories/thunks/fetchCategories';
import { setGameStatus } from '../../../store/game/thunks/setGameStatus';
import { useReduxDispatch } from '../../../store/helpers';
import GameSettings from './GameSettings/GameSettings';
import Levels from './Levels/Levels';
import { RootState } from '../../../store/store.interface';
import { GameStatus } from '../../../store/game/initialState.interface';
import { LocalStorage } from '../../../models/local-storage';

interface Props {
  accessToken: string;
}

interface SelectorProps {
  gameStatus: GameStatus;
}

export const GameComponent: FC<Props> = ({ accessToken }) => {
  const dispatch = useReduxDispatch();

  const { gameStatus } = useSelector<RootState, SelectorProps>(({ game }) => ({
    gameStatus: game.gameStatus,
  }));

  useEffect(() => {
    if (accessToken) {
      dispatch(fetchCategories(accessToken));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accessToken]);

  useEffect(() => {
    const status = window.localStorage.getItem(LocalStorage.GameStatus || '{}');
    if (status) {
      dispatch(setGameStatus(status as GameStatus));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Fragment>
      {gameStatus === GameStatus.NewGame && <GameSettings />}
      {gameStatus !== GameStatus.NewGame && <Levels />}
    </Fragment>
  );
};

export default memo(GameComponent);
