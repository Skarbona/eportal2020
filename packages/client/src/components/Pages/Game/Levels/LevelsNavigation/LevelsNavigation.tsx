import React, { FC, memo, useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Grid, Step, StepLabel, Stepper, StepConnector } from '@material-ui/core';

import { ArrowForwardIos as SingleArrowIcon, HighlightOff as FinishIcon } from '@material-ui/icons';

import { StepperIcons } from './StepperIcons';
import { useReduxDispatch } from '../../../../../store/helpers';
import { setGameStatus } from '../../../../../store/game/thunks/setGameStatus';
import { GameStatus } from '../../../../../models/game-models';
import { setGameStatusHelper, getGameStatusIndex } from '../../../../../utils/levels';
import { cleanGameData, cleanCurrentTask } from '../../../../../store/game/action';
import { LocalStorage } from '../../../../../models/local-storage';
import { GameStateInterface } from '../../../../../store/game/initialState.interface';
import { CategoryInterface } from '../../../../../store/categories/initialState.interface';

interface Props {
  isTheLastTask: boolean;
  currentGameStatus: GameStatus;
  currentTask: GameStateInterface['currentTask'];
  levels: CategoryInterface[];
}

export const LevelsNavigationComponent: FC<Props> = ({
  isTheLastTask,
  currentGameStatus,
  currentTask,
  levels,
}) => {
  const dispatch = useReduxDispatch();
  const { t } = useTranslation();
  const [activeStep, setActiveStep] = useState<number>(1);

  const setGameStatusHandler = useCallback(() => {
    dispatch(setGameStatus(setGameStatusHelper(currentGameStatus)));
    dispatch(cleanCurrentTask());
  }, [currentGameStatus, dispatch]);

  const ignoreCurrentTaskHandler = useCallback(() => {
    dispatch(cleanCurrentTask());
    if (isTheLastTask) {
      dispatch(setGameStatus(setGameStatusHelper(currentGameStatus)));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isTheLastTask, currentGameStatus]);

  const finishGameHandler = useCallback(() => {
    dispatch(setGameStatus(setGameStatusHelper(GameStatus.NewGame)));
    dispatch(cleanGameData());
    window.localStorage.removeItem(LocalStorage.CurrentTask);
    window.localStorage.removeItem(LocalStorage.RemovedPosts);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setActiveStep(getGameStatusIndex(currentGameStatus));
  }, [currentGameStatus]);

  return (
    <Grid container spacing={3} xs={12} className="levels-navigation">
      {currentTask?.id && (
        <Grid item xs={12} md={4}>
          <Button
            color="primary"
            variant="contained"
            onClick={ignoreCurrentTaskHandler}
            startIcon={<SingleArrowIcon />}
          >
            {t('Ignore current task and go to the next task')}
          </Button>
        </Grid>
      )}
      {currentGameStatus !== GameStatus.Summary && (
        <Grid item xs={12}>
          <Stepper
            alternativeLabel
            activeStep={activeStep}
            className="levels-stepper"
            connector={<StepConnector className="connector" />}
          >
            {levels.map((level) => (
              <Step key={level.name}>
                <StepLabel StepIconComponent={StepperIcons}>{level.name}</StepLabel>
              </Step>
            ))}
          </Stepper>
        </Grid>
      )}
      {!currentTask?.id && [GameStatus.Level1, GameStatus.Level2].includes(currentGameStatus) && (
        <Grid item xs={12} md={4}>
          <Button onClick={setGameStatusHandler} color="primary" variant="contained">
            {t('Ignore current level and go to the next level')}
          </Button>
        </Grid>
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
          className="error-button"
          variant="contained"
          startIcon={<FinishIcon />}
        >
          {t('Finish the Game')}
        </Button>
      </Grid>
    </Grid>
  );
};

export default memo(LevelsNavigationComponent);
