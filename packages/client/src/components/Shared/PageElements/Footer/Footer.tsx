import React, { FC, memo } from 'react';
import { Container, Typography, Grid, Link } from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import './Footer.scss';
import { ReactComponent as WaveSVG } from '../../../../media/svg/revert-wave1.svg';

export const FooterComponent: FC = () => {
  const { t } = useTranslation();
  return (
    <footer className="footer">
      <WaveSVG />
      <Container className="footer-container">
        <Grid container spacing={6}>
          <Grid item xs={12} md={6}>
            <Typography variant="h4" gutterBottom>
              {t('Privacy Policy')}
            </Typography>
            <Typography gutterBottom>{t('Cookies policy short description')}</Typography>
            <Typography gutterBottom>
              <Link to="/polityka-prywatnosci" component={RouterLink} color="inherit">
                {t('More info in Privacy Policy')}
              </Link>
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="h4" gutterBottom>
              {t('Short menu')}
            </Typography>
            <Typography gutterBottom>
              <Link to="/polityka-prywatnosci" component={RouterLink} color="inherit">
                {t('Privacy Policy')}
              </Link>
            </Typography>
            <Typography gutterBottom>
              <Link to="/zasady" component={RouterLink} color="inherit">
                {t('Rules')}
              </Link>
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </footer>
  );
};

export default memo(FooterComponent);
