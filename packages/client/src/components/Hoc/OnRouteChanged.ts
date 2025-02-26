import { useEffect, FC, memo } from 'react';
import { useHistory } from 'react-router-dom';
import ReactGA from 'react-ga4';

import { cleanAlertsHandler } from '../../store/app/thunks/cleanAlerts';
import { useReduxDispatch } from '../../store/helpers';
import { GOOGLE_ANALYTICS } from '../../constants/envs';

ReactGA.initialize(GOOGLE_ANALYTICS);

export const OnRouteChangedComponent: FC = () => {
  const history = useHistory();
  const dispatch = useReduxDispatch();
  useEffect(() => {
    const unListen = history.listen(() => {
      ReactGA.send({
        hitType: 'pageview',
        page: window.location.pathname + window.location.search,
      });
      window.scrollTo(0, 0);
      dispatch(cleanAlertsHandler());
    });
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    return () => unListen();
  }, [dispatch, history]);

  return null;
};

export default memo(OnRouteChangedComponent);
