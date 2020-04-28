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

import { GameStateInterface } from '../../../../store/game/initialState.interface';
import {
  randomizeTime,
  convertSecondsToMinutes,
  convertSecondsToPercent,
  setGameStatusHelper,
} from '../../../../utils/levels';
import { setGameStatus } from '../../../../store/game/thunks/setGameStatus';
import { cleanCurrentTask } from '../../../../store/game/action';
import { useReduxDispatch } from '../../../../store/helpers';
import { GameStatus, TaskGameStatus } from '../../../../models/game-models';

interface Props {
  time: GameStateInterface['config']['time'];
  isTheLastTask: boolean;
  gameStatus: GameStatus;
}

let interval: any;

export const TaskActionsComponent: FC<Props> = ({ time, isTheLastTask, gameStatus }) => {
  const { t } = useTranslation();
  const dispatch = useReduxDispatch();
  const [gameTime, setGameTime] = useState<number>(2);
  const [taskGameStatus, setTaskGameStatus] = useState<TaskGameStatus>(TaskGameStatus.BeforeGame);
  const [seconds, setSeconds] = useState(2 * 60);

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

  const finishTaskHandler = useCallback(() => {
    dispatch(cleanCurrentTask());
    if (isTheLastTask) {
      dispatch(setGameStatus(setGameStatusHelper(gameStatus)));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isTheLastTask, gameStatus]);

  const startTimerHandler = useCallback(() => {
    setTaskGameStatus(TaskGameStatus.TimerInProgress);
    interval = setInterval(() => {
      setSeconds((prevState) => prevState - 1);
    }, 1000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const initialTime = randomizeTime(time);
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
    <Grid container spacing={3} className="task-actions primary-gradient-bg">
      {taskGameStatus === TaskGameStatus.BeforeGame && (
        <>
          <Grid item xs={12}>
            <>
              <Typography>
                {t('Personalize time if you want')}: {gameTime} min
              </Typography>
              <Slider
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
      {[TaskGameStatus.TimerInProgress, TaskGameStatus.TimerPaused].includes(taskGameStatus) && (
        <Grid item xs={12} className="line-progress__wrapper">
          <LinearProgress
            className="line-progress"
            variant="determinate"
            color={taskGameStatus === TaskGameStatus.TimerPaused ? 'secondary' : 'primary'}
            value={convertSecondsToPercent(seconds, gameTime)}
          />
          <Typography className="values">{convertSecondsToMinutes(seconds)}</Typography>
        </Grid>
      )}
      {taskGameStatus === TaskGameStatus.TimerInProgress && (
        <Grid item xs={12} md={4}>
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
        <Grid item xs={12} md={4}>
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
        <Grid item xs={12} md={4}>
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
      {taskGameStatus === TaskGameStatus.TimeEnd && (
        <>
          <Grid item xs={12} md={4}>
            <Typography variant="h3" className="completed-header">
              {t('Has been task completed?')}
            </Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Button
              onClick={finishTaskHandler}
              className="success-button"
              variant="contained"
              startIcon={<SentimentSatisfied />}
            >
              {t('Fully (3 points)')}
            </Button>
          </Grid>
          <Grid item xs={12} md={4}>
            <Button
              onClick={finishTaskHandler}
              className="warning-button"
              variant="contained"
              startIcon={<SentimentDissatisfied />}
            >
              {t('Partly (1 point)')}
            </Button>
          </Grid>
          <Grid item xs={12} md={4}>
            <Button
              onClick={finishTaskHandler}
              className="error-button"
              variant="contained"
              startIcon={<SentimentVeryDissatisfied />}
            >
              {t('Task was not completed (0 points)')}
            </Button>
          </Grid>
        </>
      )}
    </Grid>
  );
};

export default memo(TaskActionsComponent);
