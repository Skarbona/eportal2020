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
import { checkIfTokenIsValid } from '../../../utils/auth';
import { usePrevious } from '../../../hooks/previous-state';

export interface SelectorProps {
  gameStatus: GameStatus;
  config: FormValues;
  hasPosts: boolean;
  hasCategories: boolean;
  expirationDate: Date;
  accessToken: string;
}

export const GameComponent: FC = () => {
  const dispatch = useReduxDispatch();

  const { gameStatus, hasPosts, config, hasCategories, expirationDate, accessToken } = useSelector<
    RootState,
    SelectorProps
  >(({ game, categories, app }) => ({
    gameStatus: game.gameStatus,
    config: game.config,
    hasPosts: checkIfHasPosts(game.posts, game.loading, game.error),
    hasCategories: checkIfHasCategories(categories.categories),
    expirationDate: app.auth.accessTokenExpiration,
    accessToken: app.auth.accessToken,
  }));
  const previousProps = usePrevious<Partial<SelectorProps>>({ expirationDate, accessToken });

  useEffect(() => {
    const isValidToken = checkIfTokenIsValid(accessToken, expirationDate);
    const prevTokenWasNotValid =
      !!previousProps?.accessToken &&
      !checkIfTokenIsValid(previousProps?.accessToken, previousProps?.expirationDate) &&
      isValidToken;
    const firstLoadWithValidToken = previousProps?.accessToken === undefined && isValidToken;
    if (prevTokenWasNotValid || firstLoadWithValidToken) {
      dispatch(fetchCategories());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accessToken, expirationDate]);

  useEffect(() => {
    if (
      checkIfTokenIsValid(accessToken, expirationDate) &&
      config &&
      !hasPosts &&
      GameStatus.NewGame !== gameStatus
    ) {
      dispatch(fetchPostsForGame());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameStatus, config, hasPosts, expirationDate, accessToken]);

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

  return (
    <>
      {gameStatus === GameStatus.NewGame && <GameSettings />}
      {gameStatus !== GameStatus.NewGame && hasPosts && hasCategories && <Levels />}
    </>
  );
};

export default memo(GameComponent);
