import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { FormControlLabel } from '@material-ui/core';

import * as gameActions from '../../../../store/game/action';
import { DefaultSettingsComponent } from '../../../../components/Pages/Game/GameSettings/DefaultSettings';

jest.mock('../../../../store/game/action', () => ({
  setFormValues: jest.fn(),
}));

describe('<DefaultSettings /> component', () => {
  let wrapper: ShallowWrapper;
  beforeEach(() => {
    wrapper = shallow(<DefaultSettingsComponent />);
  });

  it('should render all required elements', () => {
    expect(wrapper.find(FormControlLabel)).toHaveLength(1);
  });

  it('should call setFormValues with defaults', () => {
    expect(gameActions.setFormValues).toHaveBeenCalledWith({ saveAsDefault: false });
  });
});
