import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { IconButton } from '@material-ui/core';
import { FavoriteBorder, Favorite } from '@material-ui/icons';

import * as thunk from '../../../store/user/thunks/saveFavourites';
import { FavouriteComponent } from '../../../components/Shared/UIElements/Favourite/Favourite';

describe('<Favourite /> component', () => {
  let wrapper: ShallowWrapper;
  let saveFavouritesSpy: any;

  beforeEach(() => {
    wrapper = shallow(<FavouriteComponent postId="postId" />);
    saveFavouritesSpy = jest.spyOn(thunk, 'saveFavourites');
  });

  afterEach(() => {
    saveFavouritesSpy.mockClear();
  });

  it('should render all required elements', () => {
    expect(wrapper.find(IconButton)).toHaveLength(1);
    expect(wrapper.find(FavoriteBorder)).toHaveLength(1);
    expect(wrapper.find(Favorite)).toHaveLength(0);
  });

  it('should call setFormValues with defaults', () => {
    wrapper.find(IconButton).simulate('click');
    expect(saveFavouritesSpy).toHaveBeenCalledWith('postId');
    expect(wrapper.find(FavoriteBorder)).toHaveLength(0);
    expect(wrapper.find(Favorite)).toHaveLength(1);
  });
});
