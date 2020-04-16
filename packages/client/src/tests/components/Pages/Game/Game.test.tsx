import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';

import { GameComponent } from '../../../../components/Pages/Game/Game';
import GameSettings from '../../../../components/Pages/Game/GameSettings/GameSettings';
import * as categoriesThunk from '../../../../store/categories/thunks/fetchCategories';

describe('<Game > component', () => {
  let wrapper: ShallowWrapper;
  let spyFetchCategories: any;

  beforeEach(() => {
    spyFetchCategories = jest.spyOn(categoriesThunk, 'fetchCategories');
  });

  afterEach(() => {
    spyFetchCategories.mockClear();
  });

  it.skip('should have all required elements', () => {
    wrapper = shallow(<GameComponent accessToken="TOKEN" />);
    expect(wrapper.find(GameSettings)).toHaveLength(1);
  });

  it('should call fetchCategories', () => {
    wrapper = shallow(<GameComponent accessToken="TOKEN" />);
    expect(spyFetchCategories).toHaveBeenCalled();
  });

  it('should not call fetchCategories', () => {
    wrapper = shallow(<GameComponent accessToken="" />);
    expect(spyFetchCategories).not.toHaveBeenCalled();
  });
});
