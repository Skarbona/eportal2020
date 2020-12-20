/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React, { FC, memo, useCallback } from 'react';
import { Button, Grid, Typography } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { Replay as ReplayIcon } from '@material-ui/icons';

import './scss/TaskRandomizer.scss';
import { randomizeTask } from '../../../../store/game/action';
import { Gender, GameStatus } from '../../../../models/game-models';
import { randomizeUser, whoIsWinnerHandler } from '../../../../utils/levels';
import { useTaskRandomizationSelector } from './selector-hooks';

export interface Props {
  currentTaskNo: number;
}

export const TaskRandomizationComponent: FC<Props> = ({ currentTaskNo }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const {
    she,
    he,
    points,
    gameStatus,
    favouritesPosts,
    onlyFavourites,
  } = useTaskRandomizationSelector();

  const randomizeTaskHandler = useCallback(
    (activePerson) => dispatch(randomizeTask({ activePerson, favouritesPosts, onlyFavourites })),
    [dispatch, favouritesPosts, onlyFavourites],
  );

  const isTheFirstTaskForLevel3 = gameStatus === GameStatus.Level3 && currentTaskNo === 0;
  const whoIsWinner = isTheFirstTaskForLevel3 && whoIsWinnerHandler(points);

  const randomButton = (
    <Grid item xs={12} sm={4}>
      <Button
        onClick={() => randomizeTaskHandler(randomizeUser())}
        color="primary"
        variant="contained"
        name="random"
        className="success-button"
        autoFocus
        startIcon={<ReplayIcon />}
      >
        {t('Randomize person')} {isTheFirstTaskForLevel3 && t('who will do the last task')}
      </Button>
    </Grid>
  );

  const womanButton = (
    <Grid item xs={12} sm={4}>
      <Button
        color="primary"
        name="she"
        variant="contained"
        onClick={() => randomizeTaskHandler(Gender.Woman)}
      >
        {she} {isTheFirstTaskForLevel3 && t('will do the last task')}
      </Button>
    </Grid>
  );

  const manButton = (
    <Grid item xs={12} sm={4}>
      <Button
        color="primary"
        name="he"
        variant="contained"
        onClick={() => randomizeTaskHandler(Gender.Man)}
      >
        {he} {isTheFirstTaskForLevel3 && t('will do the last task')}
      </Button>
    </Grid>
  );

  return (
    <Grid item xs={12}>
      <Grid
        container
        spacing={3}
        className={`task-randomization ${isTheFirstTaskForLevel3 ? 'level3-first-task' : ''}`}
      >
        {!isTheFirstTaskForLevel3 && (
          <>
            <Grid item xs={12}>
              <Typography variant="h5" color="primary">
                {t('Select the person for the next task')}
              </Typography>
            </Grid>
            {randomButton}
            {womanButton}
            {manButton}
          </>
        )}
        {isTheFirstTaskForLevel3 && (
          <>
            <Grid item xs={12}>
              <Typography variant="h5" color="primary">
                {!whoIsWinner && t('We do not have winner')}
                {!!whoIsWinner &&
                  `${t('The winner is')}: ${whoIsWinner === Gender.Woman ? she : he}`}
              </Typography>
            </Grid>
            {!whoIsWinner && randomButton}
            {whoIsWinner === Gender.Woman && manButton}
            {whoIsWinner === Gender.Man && womanButton}
          </>
        )}
      </Grid>
    </Grid>
  );
};

export default memo(TaskRandomizationComponent);
