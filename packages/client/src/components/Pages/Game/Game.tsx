import React, { FC, memo, useEffect } from 'react';
import { Container } from '@material-ui/core';
import { useSelector } from 'react-redux';

import { fetchCategories } from '../../../store/categories/thunk';
import { useReduxDispatch } from '../../../store/helpers';
import GameSettings from './GameSettings/GameSettings';
import { RootState } from '../../../store/store.interface';

// TODO: Add Auth wrapper for this page
export const GameComponent: FC = () => {
  const { accessToken } = useSelector<RootState, { accessToken: string }>(({ app: { auth } }) => ({
    accessToken: auth.accessToken,
  }));
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
