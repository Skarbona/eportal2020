import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';

import * as gameActions from '../../../../store/game/action';
import { PlacesComponent, Props } from '../../../../components/Pages/Game/GameSettings/Places';
import ExpansionPanelComponent from '../../../../components/Shared/UIElements/ExpansionPanel/ExpansionPanel';
import Places from '../../../../components/Shared/Form/Places';
import { mockedStore } from '../../../../mocks/store';
import { InputChangeEvent } from '../../../../models/typescript-events';

describe('<Places /> component', () => {
  let wrapper: ShallowWrapper;
  let props: Props;
  let setFormValuesSpy: any;

  beforeEach(() => {
    setFormValuesSpy = jest.spyOn(gameActions, 'setFormValues');
  });

  afterEach(() => {
    setFormValuesSpy.mockClear();
  });

  it('should render all required elements', () => {
    props = { defaults: null, places: null };
    wrapper = shallow(<PlacesComponent {...props} />);
    expect(wrapper.find(ExpansionPanelComponent)).toHaveLength(1);
    expect(wrapper.find(Places)).toHaveLength(0);
  });

  it('should render all required elements when props provided', () => {
    const { user, categories } = mockedStore();
    const props = {
      defaults: user.userData.gameDefaults.place,
      places: categories.categories.places,
    };
    wrapper = shallow(<PlacesComponent {...props} />);
    expect(wrapper.find(ExpansionPanelComponent)).toHaveLength(1);
    expect(wrapper.find(Places)).toHaveLength(1);
  });

  it('should call setFormValues', () => {
    const { user, categories } = mockedStore();
    const props = {
      defaults: user.userData.gameDefaults.place,
      places: categories.categories.places,
    };
    wrapper = shallow(<PlacesComponent {...props} />);
    expect(setFormValuesSpy).toHaveBeenCalled();
  });
});
