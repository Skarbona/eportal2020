import React, { FC, memo } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import Game from './Game/Game';
import AuthPage from './AuthPage/AuthPage';
import Page from './Page/Page';
import Main from './Main/Main';
import Profile from './Profile/Profile';
import NotFound from './404/404';
import InitResetPassword from './ResetPassword/Init';
import SetNewPassword from './ResetPassword/SetNewPassword';
import { PageNames } from '../../store/pages/initialState.interface';
import { PageParams } from '../../models/page-types';

interface Props {
  accessToken: string;
  expirationDate: Date;
}
// TODO: Add lazy loading for pages
export const PagesComponent: FC<Props> = ({ accessToken, expirationDate }) => {
  return (
    <Switch>
      <Route path={PageParams.Home} exact>
        <Main isLoggedIn={!!accessToken?.length} />
      </Route>
      {accessToken && (
        <Route path={PageParams.Profile} exact>
          <Profile />
        </Route>
      )}
      {accessToken && (
        <Route path={PageParams.Game} exact>
          <Game accessToken={accessToken} expirationDate={expirationDate} />
        </Route>
      )}
      {!accessToken && (
        <Route path="/autentykacja/:mode" exact>
          <AuthPage />
        </Route>
      )}
      {!accessToken && (
        <Route path={PageParams.ResetPassword} exact>
          <InitResetPassword />
        </Route>
      )}
      {!accessToken && (
        <Route path={`${PageParams.ResetPassword}/:token`} exact>
          <SetNewPassword />
        </Route>
      )}
      <Route exact key="privacy-policy" path={PageParams.PrivacyPolice}>
        <Page slug={PageNames.PrivacyPolicy} />
      </Route>
      <Route exact key="rules" path={PageParams.Rules}>
        <Page slug={PageNames.Rules} />
      </Route>
      <Route path={PageParams.Page404}>
        <NotFound />
      </Route>
      <Redirect to={PageParams.Page404} />
    </Switch>
  );
};

export const arePropsEqual = (prevProps: Props, nextProps: Props): boolean =>
  prevProps?.accessToken?.length > 0 && nextProps?.accessToken?.length > 0;

export default memo(PagesComponent, arePropsEqual);
