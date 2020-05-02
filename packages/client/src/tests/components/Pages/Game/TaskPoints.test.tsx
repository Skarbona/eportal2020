import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { Avatar, Chip, Typography } from '@material-ui/core';
import * as redux from 'react-redux';

import { TaskPointsComponent } from '../../../../components/Pages/Game/Levels/TaskPoints';
import * as GameActions from '../../../../store/game/action';
import { PropsTaskPointsSelector } from '../../../../components/Pages/Game/Levels/selector-hooks';

describe('<TaskPoints > component', () => {
  let wrapper: ShallowWrapper;
  let setPointsSpy: any;
  let getItemLocalStorageSpy: any;
  let setItemLocalStorageSpy: any;
  let spyStore: any;
  let selectorProps: PropsTaskPointsSelector;

  beforeEach(() => {
    setPointsSpy = jest.spyOn(GameActions, 'setPoints');
    spyStore = jest.spyOn(redux, 'useSelector');
    selectorProps = {
      she: 'she',
      he: 'he',
      points: {
        man: 2,
        woman: 3,
      },
    };
    spyStore.mockReturnValue(selectorProps);
    getItemLocalStorageSpy = jest
      .spyOn(window.localStorage.__proto__, 'getItem')
      .mockImplementation(() => true);
    setItemLocalStorageSpy = jest.spyOn(window.localStorage.__proto__, 'setItem');
  });

  afterEach(() => {
    spyStore.mockRestore();
    setPointsSpy.mockClear();
    getItemLocalStorageSpy.mockClear();
    setItemLocalStorageSpy.mockClear();
  });

  it('should render all required items', () => {
    wrapper = shallow(<TaskPointsComponent />);
    expect(wrapper.find(Avatar)).toHaveLength(2);
    expect(wrapper.find(Chip)).toHaveLength(2);
    expect(wrapper.find(Typography)).toHaveLength(2);
  });

  it('should dispatch setPoints on first load', () => {
    wrapper = shallow(<TaskPointsComponent />);
    expect(setPointsSpy).toHaveBeenCalled();
    expect(getItemLocalStorageSpy).toHaveBeenCalled();
  });

  it('should set Points in LocalStorage', () => {
    wrapper = shallow(<TaskPointsComponent />);
    expect(setItemLocalStorageSpy).toHaveBeenCalled();
  });
});
