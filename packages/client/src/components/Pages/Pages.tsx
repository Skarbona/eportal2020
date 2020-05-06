import React, { FC, memo } from 'react';
import { Switch, Route } from 'react-router-dom';

import Game from './Game/Game';
import AuthPage from './AuthPage/AuthPage';
import Main from './Main/Main';
import Profile from './Profile/Profile';
import NotFound from './404/404';

interface Props {
  accessToken: string;
}
// TODO: Add lazy loading for pages
// TODO: Scroll to TOP after page changed
export const PagesComponent: FC<Props> = ({ accessToken }) => {
  return (
    <>
      {accessToken && (
        <Switch>
          <Route path="/" exact>
            <Main />
          </Route>
          <Route path="/profil" exact>
            <Profile />
          </Route>
          <Route path="/gra" exact>
            <Game accessToken={accessToken} />
          </Route>
          <Route path="*">
            <NotFound />
          </Route>
        </Switch>
      )}
      {!accessToken && (
        <Switch>
          <Route path="/" exact>
            <Main />
          </Route>
          <Route path="/autentykacja/:mode" exact>
            <AuthPage />
          </Route>
          <Route path="*">
            <NotFound />
          </Route>
        </Switch>
      )}
    </>
  );
};

export const arePropsEqual = (prevProps: Props, nextProps: Props): boolean =>
  prevProps?.accessToken?.length > 0 && nextProps?.accessToken?.length > 0;

export default memo(PagesComponent, arePropsEqual);
