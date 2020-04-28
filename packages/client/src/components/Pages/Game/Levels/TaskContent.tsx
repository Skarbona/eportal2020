import React, { FC, memo } from 'react';
import { Typography, Chip, Grid } from '@material-ui/core';
import { useTranslation } from 'react-i18next';

import { useTaskContentSelector } from './selector-hooks';
import { GenderIds } from '../../../../constants/categoriesIds';

export const TaskContentComponent: FC = () => {
  const { t } = useTranslation();
  const { currentTask, she, he, allCatsMap } = useTaskContentSelector();
  const taskGender = currentTask.categories.includes(GenderIds.Woman) ? she : he;
  return (
    <Grid container xs={12} spacing={3} className="task-content">
      {currentTask.image && (
        <Grid item xs={12} md={4}>
          <img src={currentTask.image} alt={currentTask.content.title} />
        </Grid>
      )}
      <Grid item xs={12} md={currentTask.image ? 8 : 12}>
        <Typography variant="h2" color="primary" className="task-title">
          {currentTask.content.title}
          <Typography color="secondary">
            {t('The task is performed by')} <b>{taskGender}</b>
          </Typography>
        </Typography>
        <Typography
          dangerouslySetInnerHTML={{ __html: currentTask.content.content }}
          color="primary"
        />
      </Grid>
      <Grid item xs={12} className="categories-badges">
        {currentTask.categories.map((cat) => (
          <Chip key={cat} size="small" color="primary" label={allCatsMap.get(cat)} />
        ))}
      </Grid>
    </Grid>
  );
};

export default memo(TaskContentComponent);
