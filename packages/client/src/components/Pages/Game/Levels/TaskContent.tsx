import React, { FC, memo } from 'react';
import { Typography, Chip, Grid } from '@material-ui/core';
import { useTranslation } from 'react-i18next';

import './scss/TaskContent.scss';
import { useTaskContentSelector } from './selector-hooks';
import { GenderIds } from '../../../../constants/categoriesIds';
import { PHOTOS_URL } from '../../../../constants/envs';

export const TaskContentComponent: FC = () => {
  const { t } = useTranslation();
  const { categories, content, image, she, he, allCatsMap } = useTaskContentSelector();

  const taskGender = categories?.includes(GenderIds.Woman) ? she : he;
  return (
    <Grid item xs={12}>
      <Grid container spacing={3} className="task-content">
        {image && (
          <Grid item xs={12} md={4}>
            <img src={PHOTOS_URL + image} alt={content?.title} />
          </Grid>
        )}
        <Grid item xs={12} md={image ? 8 : 12}>
          <Typography variant="h2" color="primary" className="task-title">
            <span dangerouslySetInnerHTML={{ __html: content?.title }} />
            <Typography color="secondary">
              {t('The task is performed by')} <b>{taskGender}</b>
            </Typography>
          </Typography>
          <Typography dangerouslySetInnerHTML={{ __html: content?.content }} color="primary" />
        </Grid>
        <Grid item xs={12} className="categories-badges">
          {categories?.map((cat) => (
            <Chip key={cat} size="small" color="primary" label={allCatsMap.get(cat)} />
          ))}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default memo(TaskContentComponent);
