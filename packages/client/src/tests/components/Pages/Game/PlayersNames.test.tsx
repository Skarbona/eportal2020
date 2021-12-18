import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { TextField } from '@material-ui/core';

import * as gameActions from '../../../../store/game/action';
import {
  PlayersNamesComponent,
  Props,
} from '../../../../components/Pages/Game/GameSettings/PlayersNames';
import ExpansionPanelComponent from '../../../../components/Shared/UIElements/ExpansionPanel/ExpansionPanel';
import { chance } from '../../../../mocks/chance';
import { InputChangeEvent } from '../../../../models/typescript-events';

describe('<PlayersNames /> component', () => {
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
    props = { defaults: { she: chance.name(), he: chance.name() } };
    wrapper = shallow(<PlayersNamesComponent {...props} />);
    expect(wrapper.find(ExpansionPanelComponent)).toHaveLength(1);
    expect(wrapper.find(TextField)).toHaveLength(2);
  });

  it('should call setFormValues', () => {
    props = { defaults: { she: chance.name(), he: chance.name() } };
    wrapper = shallow(<PlayersNamesComponent {...props} />);
    expect(setFormValuesSpy).toHaveBeenCalled();
  });

  it('should handle onChange event', () => {
    props = { defaults: { she: chance.name(), he: chance.name() } };
    wrapper = shallow(<PlayersNamesComponent {...props} />);
    expect(setFormValuesSpy).toHaveBeenCalledTimes(1);
    const event = { target: { value: 0 } } as unknown as InputChangeEvent;
    wrapper.find(TextField).first().simulate('change', event);
    expect(setFormValuesSpy).toHaveBeenCalledTimes(2);
  });
});
