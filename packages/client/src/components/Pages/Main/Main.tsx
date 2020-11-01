import React, { FC, memo, useEffect } from 'react';
import { Grid, Button, Typography, Card, CardContent } from '@material-ui/core';
import { Add as AddIcon, Games as GameIcon } from '@material-ui/icons';
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
            startIcon={<GameIcon />}
            to={isLoggedIn ? PageParams.Game : PageParams.Register}
          >
            {t('Play for free!')}
          </Button>
        </Grid>
      </PageContainer>
      <PageContainer className="home-page__play-for-free" maxWidth="lg">
        <Grid container alignItems="stretch">
          <Grid item xs={12} md={6}>
            <Card className="primary-gradient-bg">
              <CardContent className="home__extras__content">
                <Typography variant="h4" component="h2" gutterBottom>
                  {t('Play for free!')}
                </Typography>
                <Typography variant="body1" component="p" align="center">
                  {t('Game rules')}
                </Typography>
              </CardContent>
              <CardContent className="home__extras__content">
                <Button
                  color="primary"
                  className="success-button"
                  variant="contained"
                  size="large"
                  startIcon={<GameIcon />}
                  component={Link}
                  to={isLoggedIn ? `${PageParams.Game}` : PageParams.Register}
                >
                  {t('Play!')}
                </Button>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={6} className="extras__content--bg">
            <div />
          </Grid>
        </Grid>
      </PageContainer>
      <PageContainer className="home-page__add-tasks" maxWidth="lg">
        <Grid container alignItems="stretch">
          <Grid item xs={12} md={6} className="extras__content--bg">
            <div />
          </Grid>
          <Grid item xs={12} md={6}>
            <Card className="primary-gradient-bg">
              <CardContent className="home__extras__content">
                <Typography variant="h4" component="h2" gutterBottom>
                  {t('Add new posts!')}
                </Typography>
                <Typography variant="body1" component="p" align="center">
                  {t('Add new subtitle')}
                </Typography>
              </CardContent>
              <CardContent className="home__extras__content">
                <Button
                  color="primary"
                  className="success-button"
                  variant="contained"
                  size="large"
                  startIcon={<AddIcon />}
                  component={Link}
                  to={isLoggedIn ? `${PageParams.WaitingRoom}/1` : PageParams.Register}
                >
                  {t('Add post')}
                </Button>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </PageContainer>
    </>
  );
};

export default memo(MainComponent);
