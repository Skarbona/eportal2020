import React, { FC, memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { useReduxDispatch } from '../../../../store/helpers';

import { setGameStatus } from '../../../../store/game/thunks/setGameStatus';
import { RootState } from '../../../../store/store.interface';
import { GameStatus } from '../../../../store/game/initialState.interface';
import { setGameStatusHelper } from '../../../../utils/levels';
import { cleanGameData } from '../../../../store/game/action';

interface PropsSelector {
  currentGameStatus: GameStatus;
}

export const LevelsNavigationComponent: FC = () => {
  const dispatch = useReduxDispatch();
  const { t } = useTranslation();
  const { currentGameStatus } = useSelector<RootState, PropsSelector>(({ game }) => ({
    currentGameStatus: game.gameStatus,
  }));

  const setGameStatusHandler = useCallback(
    () => dispatch(setGameStatus(setGameStatusHelper(currentGameStatus))),
    [currentGameStatus, dispatch],
  );

  const finishGameHandler = useCallback(() => {
    dispatch(setGameStatus(setGameStatusHelper(GameStatus.NewGame)));
    dispatch(cleanGameData);
  }, [dispatch]);

  return (
    <div>
      {[GameStatus.Level1, GameStatus.Level2].includes(currentGameStatus) && (
        <>
          <Button onClick={setGameStatusHandler} color="primary">
            {t('Ignore current level and go to the next level')}
          </Button>
          <Button color="primary">{t('Ignore current task and go to the next task')}</Button>
        </>
      )}

      {currentGameStatus === GameStatus.Level3 && (
        <Button onClick={setGameStatusHandler} color="primary">
          {t('Go to Summary')}
        </Button>
      )}
      <Button onClick={finishGameHandler} color="primary">
        {t('Finish the Game')}
      </Button>
    </div>
  );
};

export default memo(LevelsNavigationComponent);
