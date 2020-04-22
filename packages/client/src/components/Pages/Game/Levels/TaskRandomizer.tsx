import React, { FC, memo, useCallback } from 'react';
import { Button, Grid, Typography } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';

import { Replay as ReplayIcon } from '@material-ui/icons';

import { RootState } from '../../../../store/store.interface';
import { randomizeTask } from '../../../../store/game/action';
import { ActivePerson } from '../../../../models/game-models';
import { randomizeUser } from '../../../../utils/levels';

interface SelectorProps {
  she: string;
  he: string;
}

export const TaskRandomizationComponent: FC = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { she, he } = useSelector<RootState, SelectorProps>(({ game }) => ({
    she: game.config?.names.she,
    he: game.config?.names.he,
  }));

  const randomizeTaskHandler = useCallback(
    (activePerson) => dispatch(randomizeTask(activePerson)),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  return (
    <Grid container spacing={3} className="task-randomization__grid">
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
        >
          <ReplayIcon /> {t('Randomize person')}
        </Button>
      </Grid>
      <Grid item xs={12} sm={4}>
        <Button
          color="primary"
          name="she"
          variant="contained"
          onClick={() => randomizeTaskHandler(ActivePerson.She)}
        >
          {she}
        </Button>
      </Grid>
      <Grid item xs={12} sm={4}>
        <Button
          color="primary"
          name="he"
          variant="contained"
          onClick={() => randomizeTaskHandler(ActivePerson.He)}
        >
          {he}
        </Button>
      </Grid>
    </Grid>
  );
};

export default memo(TaskRandomizationComponent);
