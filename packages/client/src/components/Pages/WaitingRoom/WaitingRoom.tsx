import React, { FC, memo, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Grid, Button, Typography } from '@material-ui/core';
import { Add as AddIcon } from '@material-ui/icons';
import { useTranslation } from 'react-i18next';

import './WaitingRoom.scss';
import PageHeading from '../../Shared/PageElements/PageHeading/PageHeading';
import PageContainer from '../../Shared/PageElements/PageContainer/PageContainer';
import Posts from './Posts';
import SaveTaskForm from './SaveTaskForm';
import { getPosts } from '../../../store/waitingRoom/thunks/getPosts';
import { useReduxDispatch } from '../../../store/helpers';
import { PageParams } from '../../../models/page-types';
import { fetchCategories } from '../../../store/categories/thunks/fetchCategories';
import { useWaitingRoomSelector } from './selector-hook';

export const WaitingRoomComponent: FC = () => {
  const dispatch = useReduxDispatch();
  const { t } = useTranslation();
  const [showAddPost, setShowAddPost] = useState<boolean>(false);
  const { catsLoaded } = useWaitingRoomSelector();
  const location = useLocation();
  const isWaitingRoomMode = location.pathname.includes(PageParams.WaitingRoom);

  useEffect(() => {
    dispatch(getPosts(location.search || (!isWaitingRoomMode && '?status=publish')));
    dispatch(fetchCategories());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const title = isWaitingRoomMode ? 'Waiting Room' : 'Posts';

  return (
    <>
      <PageHeading title={title} disableBreadCrumbs />
      <PageContainer className="waiting-room">
        <Grid container spacing={2}>
          {isWaitingRoomMode && (
            <>
              <Grid item sm={12} md={4}>
                <Button
                  color="primary"
                  fullWidth
                  variant="contained"
                  startIcon={<AddIcon />}
                  onClick={(): void => setShowAddPost((prevState) => !prevState)}
                >
                  {t('Add post')}
                </Button>
              </Grid>
              <Grid item sm={12} md={12}>
                <Typography variant="body1" component="p" color="secondary">
                  {t('Add new subtitle')}
                </Typography>
              </Grid>
            </>
          )}
          <Grid item sm={12} md={12}>
            {catsLoaded && showAddPost && <SaveTaskForm setShowAddPost={setShowAddPost} />}
          </Grid>
          <Grid item sm={12} md={12}>
            <Posts isWaitingRoomMode={isWaitingRoomMode} />
          </Grid>
        </Grid>
      </PageContainer>
    </>
  );
};

export default memo(WaitingRoomComponent);
