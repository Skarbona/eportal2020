import { useEffect, FC, memo } from 'react';
import { useHistory } from 'react-router-dom';

export const ScrollToTopComponent: FC = () => {
  const history = useHistory();
  useEffect(() => {
    const unListen = history.listen(() => {
      window.scrollTo(0, 0);
    });
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    return () => unListen();
  }, [history]);

  return null;
};

export default memo(ScrollToTopComponent);
