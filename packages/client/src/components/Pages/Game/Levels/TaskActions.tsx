import React, { FC, memo } from 'react';
import { Grid } from '@material-ui/core';

export const TaskActionsComponent: FC<{}> = () => {
  return (
    <Grid container spacing={3} className="task-actions">
      <Grid item xs={12}>
        TASK ACTIONS
      </Grid>
    </Grid>
  );
};

export default memo(TaskActionsComponent);
