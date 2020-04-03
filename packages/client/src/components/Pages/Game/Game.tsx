import React, { FC, memo, useContext, useEffect } from 'react';
import { Container } from '@material-ui/core';

import { fetchCategories } from '../../../store/categories/thunk';
import { useReduxDispatch } from '../../../store/helpers';
import GameSettings from './GameSettings/GameSettings';
import { AuthContext } from '../../../context/auth-context';

// TODO: Add Auth wrapper for this page
export const GameComponent: FC<{}> = () => {
  const { token } = useContext(AuthContext);
  const dispatch = useReduxDispatch();

  useEffect(() => {
    dispatch(fetchCategories(token));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  return (
    <Container className="game">
      <GameSettings />
    </Container>
  );
};

export default memo(GameComponent);
