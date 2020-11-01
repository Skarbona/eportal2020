import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { createShallow } from '@material-ui/core/test-utils';

import * as gameActions from '../../../../store/game/action';
import {
  PreferencesComponent,
  Props,
} from '../../../../components/Pages/Game/GameSettings/Preferences';
import ExpansionPanelComponent from '../../../../components/Shared/UIElements/ExpansionPanel/ExpansionPanel';
import { mockedStore } from '../../../../mocks/store';
import NestedCategories from '../../../../components/Shared/Form/NestedCategories';

describe('<PreferencesComponent /> component', () => {
  let wrapper: ShallowWrapper;
  let materialShallow: any;
  let props: Props;
  let setFormValuesSpy: any;

  beforeEach(() => {
    materialShallow = createShallow();
    setFormValuesSpy = jest.spyOn(gameActions, 'setFormValues');
  });

  afterEach(() => {
    setFormValuesSpy.mockClear();
  });

  it('should render all required elements', () => {
    props = { preferences: null, setFormValidation: () => {}, defaults: null };
    wrapper = shallow(<PreferencesComponent {...props} />);
    expect(wrapper.find(ExpansionPanelComponent)).toHaveLength(1);
    expect(wrapper.find(NestedCategories)).toHaveLength(0);
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
    expect(wrapper.find(NestedCategories)).toHaveLength(1);
  });

  it('should call setFormValues', () => {
    const { user, categories } = mockedStore();
    props = {
      defaults: user.userData.gameDefaults.catsQuery.catsInclude,
      preferences: categories.categories.preferences,
      setFormValidation: () => {},
    };
    wrapper = shallow(<PreferencesComponent {...props} />);
    expect(setFormValuesSpy).toHaveBeenCalled();
  });
});
