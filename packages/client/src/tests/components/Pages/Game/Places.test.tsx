import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { Select } from '@material-ui/core';

import * as gameActions from '../../../../store/game/action';
import { PlacesComponent, Props } from '../../../../components/Pages/Game/GameSettings/Places';
import ExpansionPanelComponent from '../../../../components/Shared/UIElements/ExpansionPanel/ExpansionPanel';
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
    expect(wrapper.find(Select)).toHaveLength(0);
  });

  it('should render all required elements when props provided', () => {
    const { user, categories } = mockedStore();
    const props = {
      defaults: user.userData.gameDefaults.place,
      places: categories.categories.places,
    };
    wrapper = shallow(<PlacesComponent {...props} />);
    expect(wrapper.find(ExpansionPanelComponent)).toHaveLength(1);
    expect(wrapper.find(Select)).toHaveLength(1);
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

  it('should handle onChange events', () => {
    const { user, categories } = mockedStore();
    const props = {
      defaults: user.userData.gameDefaults.place,
      places: categories.categories.places,
    };
    wrapper = shallow(<PlacesComponent {...props} />);
    expect(setFormValuesSpy).toHaveBeenCalledTimes(2);
    const event = ({ target: { value: 0 } } as unknown) as InputChangeEvent;
    const value = { props: { children: [''] } };
    wrapper.find(Select).simulate('change', event, value);
    expect(setFormValuesSpy).toHaveBeenCalledTimes(3);
  });
});
