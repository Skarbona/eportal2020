import React, { FC, memo } from 'react';
import { useTranslation } from 'react-i18next';
import { LinearProgress, Typography } from '@material-ui/core';

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
    <div className="task-counter">
      <LinearProgress
        className="task-counter__line-progress"
        variant="determinate"
        color="primary"
        value={(currentTaskNoToDisplay / taskPerLevel) * 100}
      />
      <Typography className="task-counter__values">
        {t('Task No')}: {currentTaskNoToDisplay}/{taskPerLevel}
      </Typography>
    </div>
  );
};

export default memo(TaskCounterComponent);
