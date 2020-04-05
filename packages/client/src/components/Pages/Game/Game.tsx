import React, { FC, memo, useEffect } from 'react';
import { Container } from '@material-ui/core';

import { fetchCategories } from '../../../store/categories/thunk';
import { useReduxDispatch } from '../../../store/helpers';
import GameSettings from './GameSettings/GameSettings';

// TODO: Add Auth wrapper for this page
export const GameComponent: FC<{ accessToken: string }> = ({ accessToken }) => {
  const dispatch = useReduxDispatch();

  useEffect(() => {
    dispatch(fetchCategories(accessToken));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accessToken]);

  return (
    <Container className="game">
      <GameSettings />
    </Container>
  );
};

export default memo(GameComponent);
