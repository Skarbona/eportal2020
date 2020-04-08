import React, { FC, memo, useEffect } from 'react';
import { Container } from '@material-ui/core';

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
    <Container className="game">
      <GameSettings />
    </Container>
  );
};

export default memo(GameComponent);
