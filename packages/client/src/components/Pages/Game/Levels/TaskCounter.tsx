import React, { FC, memo } from 'react';
import { useTranslation } from 'react-i18next';
import { LinearProgress, Typography, Grid } from '@material-ui/core';

import './scss/TaskCounter.scss';

interface Props {
  currentTaskNo: number;
  taskPerLevel: number;
  isCurrentTaskVisible: boolean;
}

export const TaskCounterComponent: FC<Props> = ({
  currentTaskNo,
  taskPerLevel,
  isCurrentTaskVisible,
}) => {
  const { t } = useTranslation();
  const currentTaskNoToDisplay = isCurrentTaskVisible ? currentTaskNo : currentTaskNo + 1;
  return (
    <Grid container spacing={3} className="task-counter">
      <Grid item xs={12} className="task-counter-wrapper">
        <LinearProgress
          className="task-counter__line-progress"
          variant="determinate"
          color="primary"
          value={(currentTaskNoToDisplay / taskPerLevel) * 100}
        />
        <Typography className="task-counter__values">
          {t('Task No')}: {currentTaskNoToDisplay}/{taskPerLevel}
        </Typography>
      </Grid>
    </Grid>
  );
};

export default memo(TaskCounterComponent);
