import React, { FC, memo, useEffect, useState, useCallback } from 'react';
import { Grid, Button, Slider, Typography, LinearProgress } from '@material-ui/core';
import {
  PlayCircleOutline as StartIcon,
  PauseCircleFilled as PauseIcon,
  DoneAll as DoneIcon,
  SentimentDissatisfied,
  SentimentSatisfied,
  SentimentVeryDissatisfied,
} from '@material-ui/icons';
import { useTranslation } from 'react-i18next';

import './scss/TaskActions.scss';
import * as U from '../../../../utils/levels';
import Fade from '../../../Shared/UIElements/Animations/Fade';
import { setGameStatus } from '../../../../store/game/thunks/setGameStatus';
import { cleanCurrentTask, setPoints } from '../../../../store/game/action';
import { useReduxDispatch } from '../../../../store/helpers';
import { TaskGameStatus } from '../../../../models/game-models';
import { useTaskActionsSelector } from './selector-hooks';
import { usePremiumUser } from '../../../../hooks/usePremiumUser';
import { PremiumStar } from '../../../Shared/UIElements/PremiumStar';

let interval: NodeJS.Timeout;

interface Props {
  isTheLastTask: boolean;
}

export const TaskActionsComponent: FC<Props> = ({ isTheLastTask }) => {
  const { t } = useTranslation();
  const dispatch = useReduxDispatch();
  const { time, gameStatus, currentTask } = useTaskActionsSelector();
  const [gameTime, setGameTime] = useState<number>(2);
  const [taskGameStatus, setTaskGameStatus] = useState<TaskGameStatus>(TaskGameStatus.BeforeGame);
  const [seconds, setSeconds] = useState(2 * 60);
  const { isPremium } = usePremiumUser();

  /* eslint-disable @typescript-eslint/no-explicit-any */
  const setGameTimeHandler = (event: any, newValue: number | number[]): void => {
    setGameTime(newValue as number);
    setSeconds((newValue as number) * 60);
  };

  const pauseTimerHandler = useCallback(() => {
    setTaskGameStatus(TaskGameStatus.TimerPaused);
    clearInterval(interval);
  }, []);

  const endTimerHandler = useCallback(() => {
    setTaskGameStatus(TaskGameStatus.TimeEnd);
    clearInterval(interval);
  }, []);

  const finishTaskHandler = useCallback(
    (points: number) => {
      const payload = U.pointsHandler(currentTask.categories, points);
      dispatch(setPoints(payload));
      dispatch(cleanCurrentTask());
      if (isTheLastTask) {
        dispatch(setGameStatus(U.setGameStatusHelper(gameStatus)));
      }
    }, // eslint-disable-next-line react-hooks/exhaustive-deps
    [isTheLastTask, gameStatus, currentTask],
  );

  const startTimerHandler = useCallback(() => {
    setTaskGameStatus(TaskGameStatus.TimerInProgress);
    interval = setInterval(() => {
      setSeconds((prevState) => prevState - 1);
    }, 1000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const initialTime = U.randomizeTime(time);
    setGameTime(initialTime);
    setSeconds(initialTime * 60);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (seconds <= 0) {
      endTimerHandler();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [seconds]);

  return (
    <Grid item xs={12}>
      <Grid container spacing={3} className="task-actions primary-gradient-bg">
        {taskGameStatus === TaskGameStatus.BeforeGame && (
          <>
            <Grid item xs={12} className="before-game">
              <>
                <Typography className="personalize-time">
                  <span>
                    {t('Personalize time if you want')}: {gameTime} min
                  </span>
                  <PremiumStar />
                </Typography>
                <Slider
                  disabled={!isPremium}
                  value={gameTime}
                  onChange={setGameTimeHandler}
                  valueLabelDisplay="auto"
                  step={1}
                  min={1}
                  max={10}
                  marks
                />
              </>
            </Grid>
            <Grid item xs={12}>
              <Button
                onClick={startTimerHandler}
                className="success-button"
                variant="contained"
                startIcon={<StartIcon />}
              >
                {t('Start a Task!')}
              </Button>
            </Grid>
          </>
        )}
        <Fade
          show={[TaskGameStatus.TimerInProgress, TaskGameStatus.TimerPaused].includes(
            taskGameStatus,
          )}
          classNames="transition-quick-exit"
          timeout={0}
        >
          <Grid item xs={12} className="line-progress__wrapper">
            <LinearProgress
              className="line-progress"
              variant="determinate"
              color={taskGameStatus === TaskGameStatus.TimerPaused ? 'secondary' : 'primary'}
              value={U.convertSecondsToPercent(seconds, gameTime)}
            />
            <Typography className="values">{U.convertSecondsToMinutes(seconds)}</Typography>
          </Grid>
        </Fade>
        {taskGameStatus === TaskGameStatus.TimerInProgress && (
          <Grid item xs={12} md={4} className="timer-in-progress">
            <Button
              onClick={pauseTimerHandler}
              className="warning-button"
              variant="contained"
              startIcon={<PauseIcon />}
            >
              {t('Pause')}
            </Button>
          </Grid>
        )}
        {taskGameStatus === TaskGameStatus.TimerPaused && (
          <Grid item xs={12} md={4} className="timer-paused">
            <Button
              onClick={startTimerHandler}
              className="warning-button"
              variant="contained"
              startIcon={<StartIcon />}
            >
              {t('Start timer')}
            </Button>
          </Grid>
        )}
        {[TaskGameStatus.TimerInProgress, TaskGameStatus.TimerPaused].includes(taskGameStatus) && (
          <Grid item xs={12} md={4} className="task-is-done">
            <Button
              onClick={endTimerHandler}
              className="success-button"
              variant="contained"
              startIcon={<DoneIcon />}
            >
              {t('Task is done!')}
            </Button>
          </Grid>
        )}
        <Fade show={taskGameStatus === TaskGameStatus.TimeEnd}>
          <Grid item xs={12}>
            <Typography variant="h3" className="completed-header">
              {t('Has been task completed?')}
            </Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Button
              onClick={(): void => finishTaskHandler(3)}
              className="success-button"
              variant="contained"
              startIcon={<SentimentSatisfied />}
            >
              {t('Fully (3 points)')}
            </Button>
          </Grid>
          <Grid item xs={12} md={4}>
            <Button
              onClick={(): void => finishTaskHandler(1)}
              className="warning-button"
              variant="contained"
              startIcon={<SentimentDissatisfied />}
            >
              {t('Partly (1 point)')}
            </Button>
          </Grid>
          <Grid item xs={12} md={4}>
            <Button
              onClick={(): void => finishTaskHandler(0)}
              className="error-button"
              variant="contained"
              startIcon={<SentimentVeryDissatisfied />}
            >
              {t('Task was not completed (0 points)')}
            </Button>
          </Grid>
        </Fade>
      </Grid>
    </Grid>
  );
};

export default memo(TaskActionsComponent);
