import React, { FC, memo } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import Game from './Game/Game';
import AuthPage from './AuthPage/AuthPage';
import Page from './Page/Page';
import Main from './Main/Main';
import Profile from './Profile/Profile';
import NotFound from './404/404';
import { PageNames } from '../../store/pages/initialState.interface';

interface Props {
  accessToken: string;
  expirationDate: Date;
}
// TODO: Add lazy loading for pages
export const PagesComponent: FC<Props> = ({ accessToken, expirationDate }) => {
  return (
    <Switch>
      <Route path="/" exact>
        <Main isLoggedIn={!!accessToken?.length} />
      </Route>
      {accessToken && (
        <Route path="/profil" exact>
          <Profile />
        </Route>
      )}
      {accessToken && (
        <Route path="/gra" exact>
          <Game accessToken={accessToken} expirationDate={expirationDate} />
        </Route>
      )}
      {!accessToken && (
        <Route path="/autentykacja/:mode" exact>
          <AuthPage />
        </Route>
      )}
      <Route exact key="privacy-policy" path="/polityka-prywatnosci">
        <Page slug={PageNames.PrivacyPolicy} />
      </Route>
      <Route exact key="rules" path="/zasady">
        <Page slug={PageNames.Rules} />
      </Route>
      <Route path="/404">
        <NotFound />
      </Route>
      <Redirect to="/404" />
    </Switch>
  );
};

export const arePropsEqual = (prevProps: Props, nextProps: Props): boolean =>
  prevProps?.accessToken?.length > 0 && nextProps?.accessToken?.length > 0;

export default memo(PagesComponent, arePropsEqual);
