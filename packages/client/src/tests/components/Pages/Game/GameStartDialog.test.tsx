import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { Alert } from '@material-ui/lab';
import * as redux from 'react-redux';

import { GameStartComponent } from '../../../../components/Pages/Game/GameSettings/GameStartDialog/GameStartDialog';
import WhatWeHave from '../../../../components/Pages/Game/GameSettings/GameStartDialog/WhatWeHave';
import Dialog from '../../../../components/Shared/UIElements/Dialog/Dialog';
import * as gameActions from '../../../../store/game/action';
import { CheckIfHasEnoughPostsMock } from '../../../../mocks/store';

describe('<GameStart /> component', () => {
  let wrapper: ShallowWrapper;
  let spyStore: any;
  let setFormValuesSpy: any;

  beforeEach(() => {
    spyStore = jest.spyOn(redux, 'useSelector');
    setFormValuesSpy = jest.spyOn(gameActions, 'setFormValues');
  });

  afterEach(() => {
    spyStore.mockRestore();
    setFormValuesSpy.mockClear();
  });

  it('should not render anything if not required props were provided', () => {
    spyStore.mockReturnValue({
      isReadyToStartGame: null,
      levelsValues: [10, 10, 10],
      levels: ['1', '2', '3'],
    });
    wrapper = shallow(<GameStartComponent />);
    expect(wrapper.find(Dialog)).toHaveLength(0);
  });

  it('should show all required items if required props were provided', () => {
    const isReadyToStartGame = CheckIfHasEnoughPostsMock();
    isReadyToStartGame.hasEnough = false;
    spyStore.mockReturnValue({
      isReadyToStartGame,
      levelsValues: [10, 10, 10],
      levels: ['1', '2', '3'],
    });
    wrapper = shallow(<GameStartComponent />);
    expect(wrapper.find(Dialog)).toHaveLength(1);
    expect(wrapper.find(WhatWeHave)).toHaveLength(1);
    expect(wrapper.find(Alert)).toHaveLength(1);
    expect(wrapper.find(Alert).text()).toMatch('You can still start game');
  });

  it('should render error if not task at all', () => {
    const isReadyToStartGame = CheckIfHasEnoughPostsMock();
    isReadyToStartGame.hasEnough = false;
    isReadyToStartGame.canStartWithSmallerAmount = false;
    spyStore.mockReturnValue({
      isReadyToStartGame,
      levelsValues: [10, 10, 10],
      levels: ['1', '2', '3'],
    });
    wrapper = shallow(<GameStartComponent />);
    expect(wrapper.find(Dialog)).toHaveLength(1);
    expect(wrapper.find(WhatWeHave)).toHaveLength(1);
    expect(wrapper.find(Alert)).toHaveLength(1);
    expect(wrapper.find(Alert).text()).toMatch('Try change params');
  });
});
