import React, { FC, memo, useEffect } from 'react';

import { fetchCategories } from '../../../store/categories/thunk';
import { useReduxDispatch } from '../../../store/helpers';
import GameSettings from './GameSettings/GameSettings';

// TODO: Add Auth wrapper for this page
export const Component: FC<{}> = () => {
  const dispatch = useReduxDispatch();

  useEffect(() => {
    dispatch(fetchCategories());
  }, []);

  return (
    <div>
      <GameSettings />
    </div>
  );
};

export default memo(Component);
