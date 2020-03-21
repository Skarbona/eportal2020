import { Container } from '@material-ui/core';
import React, { FC, memo, useEffect } from 'react';

import { fetchCategories } from '../../../store/categories/thunk';
import { useReduxDispatch } from '../../../store/helpers';
import GameSettings from './GameSettings/GameSettings';

// TODO: Add Auth wrapper for this page
export const GameComponent: FC<{}> = () => {
  const dispatch = useReduxDispatch();

  useEffect(() => {
    dispatch(fetchCategories());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container className="game">
      <GameSettings />
    </Container>
  );
};

export default memo(GameComponent);
