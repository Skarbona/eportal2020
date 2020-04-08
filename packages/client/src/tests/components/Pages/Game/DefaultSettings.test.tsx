import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { FormControlLabel } from '@material-ui/core';

import * as gameActions from '../../../../store/game/action';
import { DefaultSettingsComponent } from '../../../../components/Pages/Game/GameSettings/DefaultSettings';

describe('<DefaultSettings /> component', () => {
  let wrapper: ShallowWrapper;
  let setFormValuesSpy: any;

  beforeEach(() => {
    wrapper = shallow(<DefaultSettingsComponent />);
    setFormValuesSpy = jest.spyOn(gameActions, 'setFormValues');
  });

  afterEach(() => {
    setFormValuesSpy.mockClear();
  });

  it('should render all required elements', () => {
    expect(wrapper.find(FormControlLabel)).toHaveLength(1);
  });

  it('should call setFormValues with defaults', () => {
    expect(setFormValuesSpy).toHaveBeenCalledWith({ saveAsDefault: false });
  });
});
