import React from 'react';
import { ShallowWrapper, shallow } from 'enzyme';
import { ListItem, ListItemText } from '@material-ui/core';

import {
  WhatWeHaveComponent,
  Props,
} from '../../../../components/Pages/Game/GameSettings/GameStartDialog/WhatWeHave';
import { CheckIfHasEnoughPostsMock } from '../../../../mocks/store';

describe('<WhatWeHave /> component', () => {
  let wrapper: ShallowWrapper;
  let props: Props;

  it('should render all required items with correct state', () => {
    const { level1, level2, level3 } = CheckIfHasEnoughPostsMock();

    // Warning state
    level2.hasEnough = false;
    level2.has = 4;

    // Error state
    level3.hasEnough = false;
    level3.has = 0;

    props = {
      isReadyToStartGame: [level1, level2, level3],
      levels: ['level1', 'level2', 'level3'],
    };
    wrapper = shallow(<WhatWeHaveComponent {...props} />);
    const ListItemTextWrapper = wrapper.find(ListItemText);
    const ListItemWrapper = wrapper.find(ListItem);
    expect(ListItemWrapper).toHaveLength(3);
    expect(ListItemTextWrapper).toHaveLength(3);

    expect(ListItemWrapper.at(0).props().className).toEqual('task-success');
    expect(ListItemTextWrapper.at(0).props().primary).toEqual('level1');
    expect(shallow(ListItemTextWrapper.at(0).props().secondary as any).text()).toEqual(
      '20 tasks (expected: 10)',
    );

    expect(ListItemWrapper.at(1).props().className).toEqual('task-warning');
    expect(ListItemTextWrapper.at(1).props().primary).toEqual('level2');
    expect(shallow(ListItemTextWrapper.at(1).props().secondary as any).text()).toEqual(
      '4 tasks (expected: 5)',
    );

    expect(ListItemWrapper.at(2).props().className).toEqual('task-error');
    expect(ListItemTextWrapper.at(2).props().primary).toEqual('level3');
    expect(shallow(ListItemTextWrapper.at(2).props().secondary as any).text()).toEqual(
      '0 tasks (expected: 12)',
    );
  });
});
