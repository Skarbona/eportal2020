import React, { FC, memo, useEffect, Fragment } from 'react';

import { fetchCategories } from '../../../store/categories/thunks/fetchCategories';
import { useReduxDispatch } from '../../../store/helpers';
import GameSettings from './GameSettings/GameSettings';

interface Props {
  accessToken: string;
}

export const GameComponent: FC<Props> = ({ accessToken }) => {
  const dispatch = useReduxDispatch();

  useEffect(() => {
    if (accessToken) {
      dispatch(fetchCategories(accessToken));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accessToken]);

  return (
    <Fragment>
      <GameSettings />
    </Fragment>
  );
};

export default memo(GameComponent);
