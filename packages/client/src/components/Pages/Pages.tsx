import React, { FC, Fragment, memo } from 'react';
import { Switch, Route } from 'react-router-dom';

import Game from './Game/Game';
import AuthPage from './AuthPage/AuthPage';
import Main from './Main/Main';

// TODO: Add lazy loading for pages
// TODO: Add routing for pages
export const PagesComponent: FC<{}> = () => {
  return (
    <Fragment>
      <Switch>
        <Route path="/" exact>
          <Main />
        </Route>
        <Route path="/gra">
          <Game />
        </Route>
        <Route path="/autentykacja">
          <AuthPage />
        </Route>
      </Switch>
    </Fragment>
  );
};

export default memo(PagesComponent);
