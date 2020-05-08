import React, { FC, memo } from 'react';
import { Grid, Button, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import './Main.scss';
import { ReactComponent as WomanSVG } from '../../../media/svg/woman.svg';
import { ReactComponent as ManSVG } from '../../../media/svg/man.svg';
import PageContainer from '../../Shared/PageElements/PageContainer/PageContainer';
import { PageParams } from '../../../models/page-types';

interface Props {
  isLoggedIn: boolean;
}

export const MainComponent: FC<Props> = ({ isLoggedIn }) => {
  const { t } = useTranslation();
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
            {t('Game for pairs!')}
          </Typography>
        </Grid>
        <Grid item xs={12} className="action-button">
          <Button
            color="primary"
            variant="contained"
            size="large"
            component={Link}
            to={isLoggedIn ? '/gra' : `/autentykacja/${PageParams.Register as string}`}
          >
            {t('Play for free!')}
          </Button>
        </Grid>
      </PageContainer>
    </>
  );
};

export default memo(MainComponent);
