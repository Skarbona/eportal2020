import React, { FC, memo, useEffect } from 'react';
import { Grid, Button, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import './Main.scss';
import { ReactComponent as WomanSVG } from '../../../media/svg/woman.svg';
import { ReactComponent as ManSVG } from '../../../media/svg/man.svg';
import PageContainer from '../../Shared/PageElements/PageContainer/PageContainer';
import { PageParams } from '../../../models/page-types';
import { PageNames } from '../../../store/pages/initialState.interface';
import { getPageData } from '../../../store/pages/thunks/getPageData';
import { useReduxDispatch } from '../../../store/helpers';
import { RootState } from '../../../store/store.interface';

interface SelectorProps {
  title: string;
}

interface Props {
  isLoggedIn: boolean;
}

export const MainComponent: FC<Props> = ({ isLoggedIn }) => {
  const dispatch = useReduxDispatch();
  const { t } = useTranslation();
  const { title } = useSelector<RootState, SelectorProps>(({ pages }) => ({
    title: pages.page[PageNames.Home]?.content.title,
  }));

  useEffect(() => {
    dispatch(getPageData('home'));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <PageContainer className="home-page" maxWidth="lg">
        <Grid container className="home-page__grid">
          <Grid item xs={6}>
            <WomanSVG />
          </Grid>
          <Grid item xs={6}>
            <ManSVG />
          </Grid>
        </Grid>
      </PageContainer>
      <PageContainer className="home-page__secondary" maxWidth="lg">
        <Grid item xs={12}>
          <Typography component="h1" className="title" color="primary">
            {title}
          </Typography>
        </Grid>
        <Grid item xs={12} className="action-button">
          <Button
            color="primary"
            variant="contained"
            size="large"
            component={Link}
            to={isLoggedIn ? PageParams.Game : PageParams.Register}
          >
            {t('Play for free!')}
          </Button>
        </Grid>
      </PageContainer>
    </>
  );
};

export default memo(MainComponent);
