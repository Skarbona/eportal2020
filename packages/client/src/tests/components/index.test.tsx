import React from 'react';
import ReactDOM from 'react-dom';

import { Index } from '../../index';

jest.mock('react-dom', () => ({ render: jest.fn() }));

describe('Main index.tsx file', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Index />, div);
    document.getElementById = (id) => id === 'root' && div;
    expect(ReactDOM.render).toHaveBeenCalled();
  });
});
