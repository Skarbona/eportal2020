import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';

import { GameComponent } from '../../../../components/Pages/Game/Game';
import GameSettings from '../../../../components/Pages/Game/GameSettings/GameSettings';
import * as categoriesThunk from '../../../../store/categories/thunk';

jest.mock('../../../../store/categories/thunk', () => ({
  fetchCategories: jest.fn(),
}));

describe('<Game > component', () => {
  let wrapper: ShallowWrapper;

  beforeEach(() => {
    wrapper = shallow(<GameComponent />);
  });

  it('should have all required elements', () => {
    expect(wrapper.find(GameSettings)).toHaveLength(1);
  });

  it('should call fetchCategories', () => {
    expect(categoriesThunk.fetchCategories).toHaveBeenCalled();
  });
});
