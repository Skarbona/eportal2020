import React, { FC, memo, useCallback } from 'react';
import { Button, Grid, Typography } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';

import { Replay as ReplayIcon } from '@material-ui/icons';

import { randomizeTask } from '../../../../store/game/action';
import { Gender } from '../../../../models/game-models';
import { randomizeUser } from '../../../../utils/levels';
import { useTaskRandomizationSelector } from './selector-hooks';

export const TaskRandomizationComponent: FC = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { she, he } = useTaskRandomizationSelector();

  const randomizeTaskHandler = useCallback(
    (gender) => dispatch(randomizeTask(gender)),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  return (
    <Grid container xs={12} spacing={3} className="task-randomization">
      <Grid item xs={12}>
        <Typography variant="h5" color="primary">
          {t('Select the person for the next task')}:
        </Typography>
      </Grid>
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
          {t('Randomize person')}
        </Button>
      </Grid>
      <Grid item xs={12} sm={4}>
        <Button
          color="primary"
          name="she"
          variant="contained"
          onClick={() => randomizeTaskHandler(Gender.Woman)}
        >
          {she}
        </Button>
      </Grid>
      <Grid item xs={12} sm={4}>
        <Button
          color="primary"
          name="he"
          variant="contained"
          onClick={() => randomizeTaskHandler(Gender.Man)}
        >
          {he}
        </Button>
      </Grid>
    </Grid>
  );
};

export default memo(TaskRandomizationComponent);
