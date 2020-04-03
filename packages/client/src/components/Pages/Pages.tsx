import React, { FC, Fragment, memo, useContext } from 'react';
import { Switch, Route } from 'react-router-dom';

import Game from './Game/Game';
import AuthPage from './AuthPage/AuthPage';
import Main from './Main/Main';
import { AuthContext } from '../../context/auth-context';

// TODO: Add lazy loading for pages
export const PagesComponent: FC<{}> = () => {
  const { token } = useContext(AuthContext);
  return (
    <Fragment>
      {token && (
        <Switch>
          <Route path="/" exact>
            <Main />
          </Route>
          <Route path="/gra">
            <Game />
          </Route>
        </Switch>
      )}
      {!token && (
        <Switch>
          <Route path="/" exact>
            <Main />
          </Route>
          <Route path="/autentykacja">
            <AuthPage />
          </Route>
        </Switch>
      )}
    </Fragment>
  );
};

export default memo(PagesComponent);
