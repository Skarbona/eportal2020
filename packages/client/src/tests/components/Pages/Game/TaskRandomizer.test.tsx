import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { Button } from '@material-ui/core';
import * as redux from 'react-redux';

import {
  Props,
  TaskRandomizationComponent,
} from '../../../../components/Pages/Game/Levels/TaskRandomizer';
import { PropsTaskRandomizationSelector } from '../../../../components/Pages/Game/Levels/selector-hooks';
import { mockedStore } from '../../../../mocks/store';
import { GameStatus, Gender } from '../../../../models/game-models';
import * as GameActions from '../../../../store/game/action';

describe('<TaskRandomizer > component', () => {
  let wrapper: ShallowWrapper;
  let props: Props;
  let selectorProps: PropsTaskRandomizationSelector;
  let spyStore: any;
  let randomizeTaskSpy: any;

  beforeEach(() => {
    spyStore = jest.spyOn(redux, 'useSelector');
    randomizeTaskSpy = jest.spyOn(GameActions, 'randomizeTask');
    const { game } = mockedStore();
    props = {
      currentTaskNo: 2,
    };
    selectorProps = {
      she: game.config?.names.she,
      he: game.config?.names.he,
      gameStatus: GameStatus.Level3,
      points: game.points,
    };
  });

  afterEach(() => {
    spyStore.mockRestore();
    randomizeTaskSpy.mockClear();
  });

  it('should render all required items', () => {
    spyStore.mockReturnValue(selectorProps);
    wrapper = shallow(<TaskRandomizationComponent {...props} />);
    expect(wrapper.find('.task-randomization')).toHaveLength(1);
    expect(wrapper.find(Button)).toHaveLength(3);
  });

  it('should call randomizeTask with proper values', () => {
    spyStore.mockReturnValue(selectorProps);
    wrapper = shallow(<TaskRandomizationComponent {...props} />);
    const Buttons = wrapper.find(Button);

    Buttons.at(0).simulate('click');
    expect(randomizeTaskSpy).toHaveBeenCalled();

    Buttons.at(1).simulate('click');
    expect(randomizeTaskSpy).toHaveBeenCalledWith(Gender.Woman);

    Buttons.at(2).simulate('click');
    expect(randomizeTaskSpy).toHaveBeenCalledWith(Gender.Man);
  });

  it('should display correct items if it is draw on first task of 3rd level', () => {
    spyStore.mockReturnValue({ ...selectorProps, points: { man: 3, woman: 3 } });
    props = { currentTaskNo: 0 };
    wrapper = shallow(<TaskRandomizationComponent {...props} />);
    expect(wrapper.find(Button)).toHaveLength(1);
    expect(wrapper.find(Button).props().name).toEqual('random');
  });

  it('should display correct items if man is a winner  on first task of 3rd level', () => {
    spyStore.mockReturnValue({ ...selectorProps, points: { man: 5, woman: 3 } });
    props = { currentTaskNo: 0 };
    wrapper = shallow(<TaskRandomizationComponent {...props} />);
    expect(wrapper.find(Button)).toHaveLength(1);
    expect(wrapper.find(Button).props().name).toEqual('she');
  });

  it('should display correct items if man is a winner  on first task of 3rd level', () => {
    spyStore.mockReturnValue({ ...selectorProps, points: { man: 5, woman: 8 } });
    props = { currentTaskNo: 0 };
    wrapper = shallow(<TaskRandomizationComponent {...props} />);
    expect(wrapper.find(Button)).toHaveLength(1);
    expect(wrapper.find(Button).props().name).toEqual('he');
  });
});
