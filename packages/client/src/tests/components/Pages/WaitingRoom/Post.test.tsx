import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { Typography, Chip, Button } from '@material-ui/core';
import * as redux from 'react-redux';

import { PostComponent as Post, Props } from '../../../../components/Pages/WaitingRoom/Post';
import { mockedStore } from '../../../../mocks/store';
import Title from '../../../../components/Shared/Form/Title';
import Message from '../../../../components/Shared/Form/Message';
import Places from '../../../../components/Shared/Form/Places';
import Levels from '../../../../components/Shared/Form/Levels';
import NestedCategories from '../../../../components/Shared/Form/NestedCategories';
import * as savePostThunk from '../../../../store/waitingRoom/thunks/savePost';
import { mockedEvent } from '../../../../mocks/event';

describe('<Posts > component', () => {
  let wrapper: ShallowWrapper;
  let spyStore: any;
  let props: Props;
  let savePostSpy: any;

  beforeEach(() => {
    spyStore = jest.spyOn(redux, 'useSelector');
    savePostSpy = jest.spyOn(savePostThunk, 'savePost');
    const { categories, waitingRoom } = mockedStore();
    props = {
      post: waitingRoom.posts[0],
      allCatsMap: categories.allCatsMap,
      cats: categories.categories,
      isAdmin: false,
      edit: '',
      setEdit: jest.fn(),
    };
  });

  afterEach(() => {
    spyStore.mockClear();
    savePostSpy.mockClear();
  });

  it('should have all required elements for [USER]', () => {
    wrapper = shallow(<Post {...props} />);
    expect(wrapper.find('form')).toHaveLength(1);
    expect(wrapper.find(Typography)).toHaveLength(3);
    expect(wrapper.find(Chip)).toHaveLength(3);
  });

  it('should have all required elements for [ADMIN] [NO_EDIT]', () => {
    props.isAdmin = true;
    wrapper = shallow(<Post {...props} />);
    expect(wrapper.find('form')).toHaveLength(1);
    expect(wrapper.find(Typography)).toHaveLength(3);
    expect(wrapper.find(Chip)).toHaveLength(3);
    expect(wrapper.find(Button)).toHaveLength(3);
    expect(wrapper.find(Title)).toHaveLength(0);
    expect(wrapper.find(Message)).toHaveLength(0);
    expect(wrapper.find(Levels)).toHaveLength(0);
    expect(wrapper.find(Places)).toHaveLength(0);
    expect(wrapper.find(NestedCategories)).toHaveLength(0);
  });

  it('should have all required elements for [ADMIN] [EDIT]', () => {
    props.isAdmin = true;
    props.edit = props.post.id;
    wrapper = shallow(<Post {...props} />);
    expect(wrapper.find('form')).toHaveLength(1);
    expect(wrapper.find(Title)).toHaveLength(1);
    expect(wrapper.find(Message)).toHaveLength(1);
    expect(wrapper.find(Typography)).toHaveLength(2);
    expect(wrapper.find(Levels)).toHaveLength(1);
    expect(wrapper.find(Places)).toHaveLength(1);
    expect(wrapper.find(NestedCategories)).toHaveLength(1);
    expect(wrapper.find(Chip)).toHaveLength(0);
    expect(wrapper.find(Button)).toHaveLength(4);
  });

  it('should call setEdit button click [ADMIN] [NO_EDIT]', () => {
    props.isAdmin = true;
    props.edit = '';
    wrapper = shallow(<Post {...props} />);
    wrapper.find(Button).first().simulate('click');
    expect(props.setEdit).toHaveBeenCalledWith(props.post.id);
  });

  it('should call savePost onSubmit [ADMIN] [EDIT]', async () => {
    props.isAdmin = true;
    props.edit = props.post.id;
    wrapper = shallow(<Post {...props} />);
    wrapper.find('form').simulate('submit', mockedEvent);
    await expect(savePostSpy).toHaveBeenCalledTimes(1);
    expect(props.setEdit).toHaveBeenCalledWith('');
  });
});
