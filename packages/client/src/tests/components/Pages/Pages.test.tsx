import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';

import { PagesComponent } from '../../../components/Pages/Pages';
import Game from '../../../components/Pages/Game/Game';

describe('<Pages > component', () => {
  let wrapper: ShallowWrapper;

  beforeEach(() => {
    wrapper = shallow(<PagesComponent />);
  });

  it('should have all required elements', () => {
    expect(wrapper.find(Game)).toHaveLength(1);
  });
});
