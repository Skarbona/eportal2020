import '@testing-library/jest-dom/extend-expect';
import { configure } from 'enzyme';
import enableHooks from 'jest-react-hooks-shallow';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import React from 'react';

import { initialRootState as mockedState } from './store/store';

configure({ adapter: new Adapter() });

jest.mock('react-ga', () => ({
  initialize: () => jest.fn(),
  pageview: () => jest.fn(),
}));

jest.mock('react-redux', () => ({
  useDispatch: () => jest.fn(),
  useSelector: jest.fn(() => mockedState),
}));

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory: jest.fn(() => ({
    push: (path: string) => {},
  })),
}));

jest.mock('./store/helpers', () => ({
  useReduxDispatch: () => jest.fn(),
}));

jest.mock('./settings/translation-settings', () => ({
  t: jest.fn((string) => string),
  on: jest.fn((method, callback) => callback()),
  isInitialized: true,
}));

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: jest.fn((string) => string),
  }),
}));

enableHooks(jest as any);
// jest.spyOn(React, 'useCallback').mockImplementation((f) => f());
// jest.spyOn(React, 'useRef').mockImplementation(() =>({ current: "current"}));
// jest.spyOn(React, 'useEffect').mockImplementation(f => f());
// jest.spyOn(React, 'useState').mockImplementation((init) => [init,jest.fn()]);
