import '@testing-library/jest-dom/extend-expect';
import { configure } from 'enzyme';
import enableHooks from 'jest-react-hooks-shallow';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';

import { initialRootState as mockedState } from './store/store';

configure({ adapter: new Adapter() });

jest.mock('react-redux', () => ({
  useDispatch: () => jest.fn(),
  useReduxDispatch: () => jest.fn(),
  useSelector: jest.fn().mockImplementation(() => mockedState),
}));

enableHooks(jest as any);

// jest.spyOn(React, 'useRef').mockImplementation(() =>({ current: "current"}));
// jest.spyOn(React, 'useEffect').mockImplementation(f => f());
// jest.spyOn(React, 'useCallback').mockImplementation(f => f());
// jest.spyOn(React, 'useState').mockImplementation((init) => [init,jest.fn()]);
