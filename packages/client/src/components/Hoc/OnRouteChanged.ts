import { useEffect, FC, memo } from 'react';
import { useHistory } from 'react-router-dom';

import { cleanAlertsHandler } from '../../store/app/thunks/cleanAlerts';
import { useReduxDispatch } from '../../store/helpers';

export const OnRouteChangedComponent: FC = () => {
  const history = useHistory();
  const dispatch = useReduxDispatch();
  useEffect(() => {
    const unListen = history.listen(() => {
      window.scrollTo(0, 0);
      dispatch(cleanAlertsHandler());
    });
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    return () => unListen();
  }, [dispatch, history]);

  return null;
};

export default memo(OnRouteChangedComponent);
