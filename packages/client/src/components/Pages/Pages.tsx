import React, { FC, Fragment, memo } from 'react';

import Game from './Game/Game';

// TODO: Add lazy loading for pages
// TODO: Add routing for pages
export const PagesComponent: FC<{}> = () => {
  return (
    <Fragment>
      <Game />
    </Fragment>
  );
};

export default memo(PagesComponent);
