import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import * as redux from 'react-redux';

import { PostsComponent as Posts } from '../../../../components/Pages/WaitingRoom/Posts';
import Post from '../../../../components/Pages/WaitingRoom/Post';
import { mockedStore } from '../../../../mocks/store';

describe('<Posts > component', () => {
  let wrapper: ShallowWrapper;
  let spyStore: any;

  beforeEach(() => {
    spyStore = jest.spyOn(redux, 'useSelector');
  });

  afterEach(() => {
    spyStore.mockClear();
  });

  it('should have all required elements', () => {
    wrapper = shallow(<Posts pageNumber={2} />);
    expect(wrapper.find(Post)).toHaveLength(0);
  });

  it('should have all required elements for proper props', () => {
    const { categories, waitingRoom } = mockedStore();
    spyStore.mockReturnValue({
      posts: waitingRoom.posts,
      allCatsMap: categories.allCatsMap,
      cats: categories.categories,
      isAdmin: true,
    });
    wrapper = shallow(<Posts pageNumber={2} />);
    expect(wrapper.find(Post)).toHaveLength(3);
  });
});
