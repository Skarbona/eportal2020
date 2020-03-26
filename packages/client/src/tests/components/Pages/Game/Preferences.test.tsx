import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { FormGroup } from '@material-ui/core';

import * as gameActions from '../../../../store/game/action';
import {
  PreferencesComponent,
  Props,
} from '../../../../components/Pages/Game/GameSettings/Preferences';
import ExpansionPanelComponent from '../../../../components/Shared/UIElements/ExpansionPanel/ExpansionPanel';
import { mockedStore } from '../../../../mocks/store';

jest.mock('../../../../store/game/action', () => ({
  setFormValues: jest.fn(),
}));

describe('<PreferencesComponent /> component', () => {
  let wrapper: ShallowWrapper;
  let props: Props;

  it('should render all required elements', () => {
    props = { preferences: null, setFormValidation: () => {}, defaults: null };
    wrapper = shallow(<PreferencesComponent {...props} />);
    expect(wrapper.find(ExpansionPanelComponent)).toHaveLength(1);
    expect(wrapper.find(FormGroup)).toHaveLength(0);
  });

  it('should render all required elements when props provided', () => {
    const { user, categories } = mockedStore();
    props = {
      defaults: user.userData.gameDefaults.catsQuery.catsInclude,
      preferences: categories.categories.preferences,
      setFormValidation: () => {},
    };
    wrapper = shallow(<PreferencesComponent {...props} />);
    expect(wrapper.find(ExpansionPanelComponent)).toHaveLength(1);
    expect(wrapper.find(FormGroup)).toHaveLength(12);
  });

  it('should call setFormValues', () => {
    const { user, categories } = mockedStore();
    props = {
      defaults: user.userData.gameDefaults.catsQuery.catsInclude,
      preferences: categories.categories.preferences,
      setFormValidation: () => {},
    };
    wrapper = shallow(<PreferencesComponent {...props} />);
    expect(gameActions.setFormValues).toHaveBeenCalled();
  });
});
