import React, { FC, memo, Fragment } from 'react';
import { useTranslation } from 'react-i18next';
import { Grid, Typography, Chip, ButtonGroup, Button } from '@material-ui/core';
import { Archive as ArchiveIcon, Check as CheckIcon, Edit as EditIcon } from '@material-ui/icons';
import { formatDistanceToNowStrict, pl, enGB } from 'date-fns';

import { usePostsSelector } from './selector-hook';
import { LANGUAGE } from '../../../constants/envs';

export const PostsComponent: FC<Props> = ({ pageNumber }) => {
  const { posts, allCatsMap } = usePostsSelector(pageNumber);
  const { t } = useTranslation();
  // TODO: Sprawdzic skrypty!!!!;
  console.log(posts);
  return (
    <Fragment>
      {posts?.map(({ content, id, categories, author, date }) => (
        <Fragment key={id}>
          <Grid item xs={12}>
            <Grid container spacing={3} className="task-content">
              <Grid item xs={12} md={8}>
                <Typography variant="h2" color="primary" className="task-title">
                  <span dangerouslySetInnerHTML={{ __html: content?.title }} />
                  <Typography color="secondary">
                    {t('Created by')} <b>{author.name}</b> (
                    {formatDistanceToNowStrict(new Date(date), {
                      locale: LANGUAGE === 'pl' ? pl : enGB,
                    })}
                    )
                  </Typography>
                </Typography>
              </Grid>
              <Grid item xs={12} md={4}>
                <ButtonGroup variant="contained" color="primary">
                  <Button color="primary" startIcon={<EditIcon />}>
                    {t('Edit')}
                  </Button>
                  <Button startIcon={<CheckIcon />} className="success-button">
                    {t('Approve')}
                  </Button>
                  <Button color="primary" className="error-button" startIcon={<ArchiveIcon />}>
                    {t('Remove')}
                  </Button>
                </ButtonGroup>
              </Grid>
              <Grid item xs={12}>
                <Typography
                  dangerouslySetInnerHTML={{ __html: content?.content }}
                  color="primary"
                />
              </Grid>
              <Grid item xs={12} className="categories-badges">
                {categories?.map((cat) => (
                  <Chip key={cat} size="small" color="primary" label={allCatsMap?.get(cat)} />
                ))}
              </Grid>
            </Grid>
          </Grid>
        </Fragment>
      ))}
    </Fragment>
  );
};

interface Props {
  pageNumber: number;
}

export default memo(PostsComponent);
