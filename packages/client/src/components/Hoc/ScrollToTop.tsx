import React, { useEffect, FC, memo } from 'react';
import { useHistory } from 'react-router-dom';

export const ScrollToTopComponent: FC = () => {
  const history = useHistory();
  useEffect(() => {
    const unListen = history.listen(() => {
      window.scrollTo(0, 0);
    });
    return () => unListen();
  }, [history]);

  return null;
};

export default memo(ScrollToTopComponent);
