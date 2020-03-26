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

jest.mock('../../../../store/game/action', () => ({
  setFormValues: jest.fn(),
}));

describe('<PlayersNames /> component', () => {
  let wrapper: ShallowWrapper;
  let props: Props;
  it('should render all required elements', () => {
    props = { defaults: { she: chance.name(), he: chance.name() } };
    wrapper = shallow(<PlayersNamesComponent {...props} />);
    expect(wrapper.find(ExpansionPanelComponent)).toHaveLength(1);
    expect(wrapper.find(TextField)).toHaveLength(2);
  });

  it('should call setFormValues', () => {
    props = { defaults: { she: chance.name(), he: chance.name() } };
    wrapper = shallow(<PlayersNamesComponent {...props} />);
    expect(gameActions.setFormValues).toHaveBeenCalled();
  });
});
