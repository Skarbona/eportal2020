import React, { FC, memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Grid } from '@material-ui/core';
import { useSelector } from 'react-redux';
import {
  DoubleArrow as DoubleArrowIcon,
  ArrowForwardIos as SingleArrowIcon,
  HighlightOff as FinishIcon,
} from '@material-ui/icons';

import { useReduxDispatch } from '../../../../store/helpers';
import { setGameStatus } from '../../../../store/game/thunks/setGameStatus';
import { RootState } from '../../../../store/store.interface';
import { GameStatus } from '../../../../models/game-models';
import { setGameStatusHelper } from '../../../../utils/levels';
import { cleanGameData, cleanCurrentTask } from '../../../../store/game/action';
import { LocalStorage } from '../../../../models/local-storage';

interface PropsSelector {
  currentGameStatus: GameStatus;
}

export const LevelsNavigationComponent: FC = () => {
  const dispatch = useReduxDispatch();
  const { t } = useTranslation();
  const { currentGameStatus } = useSelector<RootState, PropsSelector>(({ game }) => ({
    currentGameStatus: game.gameStatus,
  }));

  const setGameStatusHandler = useCallback(() => {
    dispatch(setGameStatus(setGameStatusHelper(currentGameStatus)));
    dispatch(cleanCurrentTask());
  }, [currentGameStatus, dispatch]);

  const finishGameHandler = useCallback(() => {
    dispatch(setGameStatus(setGameStatusHelper(GameStatus.NewGame)));
    dispatch(cleanGameData());
    window.localStorage.removeItem(LocalStorage.CurrentTask);
    window.localStorage.removeItem(LocalStorage.RemovedPosts);
  }, [dispatch]);

  return (
    <Grid container spacing={3} className="task-randomization__grid">
      {[GameStatus.Level1, GameStatus.Level2].includes(currentGameStatus) && (
        <>
          <Grid item xs={12} md={4}>
            <Button color="primary" variant="contained">
              <SingleArrowIcon /> {t('Ignore current task and go to the next task')}
            </Button>
          </Grid>
          <Grid item xs={12} md={4}>
            <Button onClick={setGameStatusHandler} color="primary" variant="contained">
              <DoubleArrowIcon /> {t('Ignore current level and go to the next level')}
            </Button>
          </Grid>
        </>
      )}
      {currentGameStatus === GameStatus.Level3 && (
        <Grid item xs={12} md={4}>
          <Button
            onClick={setGameStatusHandler}
            color="primary"
            className="warning-button"
            variant="contained"
          >
            {t('Go to Summary')}
          </Button>
        </Grid>
      )}

      <Grid item xs={12} md={4}>
        <Button
          onClick={finishGameHandler}
          color="primary"
          className="delete-button"
          variant="contained"
        >
          <FinishIcon />
          {t('Finish the Game')}
        </Button>
      </Grid>
    </Grid>
  );
};

export default memo(LevelsNavigationComponent);
