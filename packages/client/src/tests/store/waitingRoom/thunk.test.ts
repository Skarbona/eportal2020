import axios from 'axios';

import * as savePostThunk from '../../../store/waitingRoom/thunks/savePost';
import * as getPostsThunk from '../../../store/waitingRoom/thunks/getPosts';
import * as createPostThunk from '../../../store/waitingRoom/thunks/createPost';
import * as waitingRoomActions from '../../../store/waitingRoom/action';
import { initialRootState } from '../../../store/store';
import { successSavePosts } from '../../../store/waitingRoom/action';
import { initGetPosts } from '../../../store/waitingRoom/action';
import { successGetPosts } from '../../../store/waitingRoom/action';
import { failGetPosts } from '../../../store/waitingRoom/action';

describe('Thunk: WaitingRoom', () => {
  let dispatch: any;
  let initSavePostsSpy: any;
  let initGetPostsSpy: any;
  let successSavePostsSpy: any;
  let failSavePostsSpy: any;
  let successGetPostsSpy: any;
  let failGetPostsSpy: any;

  beforeEach(() => {
    dispatch = jest.fn();
    successGetPostsSpy = jest.spyOn(waitingRoomActions, 'successGetPosts');
    failGetPostsSpy = jest.spyOn(waitingRoomActions, 'failGetPosts');
    initSavePostsSpy = jest.spyOn(waitingRoomActions, 'initSavePosts');
    initGetPostsSpy = jest.spyOn(waitingRoomActions, 'initGetPosts');
    successSavePostsSpy = jest.spyOn(waitingRoomActions, 'successSavePosts');
    failSavePostsSpy = jest.spyOn(waitingRoomActions, 'failSavePosts');
  });

  afterEach(() => {
    failGetPostsSpy.mockClear();
    successGetPostsSpy.mockClear();
    initSavePostsSpy.mockClear();
    initGetPostsSpy.mockClear();
    successSavePostsSpy.mockClear();
    failSavePostsSpy.mockClear();
  });

  describe('savePost thunk', () => {
    it('should call all required action in success path', async () => {
      jest.spyOn(axios, 'patch').mockImplementation(() => Promise.resolve({ data: {} }));
      await savePostThunk.savePost({ id: '' })(dispatch, () => initialRootState, null);
      expect(initSavePostsSpy).toHaveBeenCalled();
      expect(successSavePostsSpy).toHaveBeenCalled();
    });

    it('should call all required action in fail path', async () => {
      const error = new Error();
      jest.spyOn(axios, 'patch').mockImplementation(() => Promise.reject(error));
      await savePostThunk.savePost({ id: '' })(dispatch, () => initialRootState, null);
      expect(initSavePostsSpy).toHaveBeenCalled();
      expect(failSavePostsSpy).toHaveBeenCalled();
    });
  });

  describe('createPost thunk', () => {
    it('should call all required action in success path', async () => {
      jest.spyOn(axios, 'post').mockImplementation(() => Promise.resolve({ data: {} }));
      await createPostThunk.createPost({ categories: [], content: { content: '', title: '' } })(
        dispatch,
        () => initialRootState,
        null,
      );
      expect(initSavePostsSpy).toHaveBeenCalled();
      expect(successSavePostsSpy).toHaveBeenCalled();
    });

    it('should call all required action in fail path', async () => {
      const error = new Error();
      jest.spyOn(axios, 'post').mockImplementation(() => Promise.reject(error));
      await createPostThunk.createPost({ categories: [], content: { content: '', title: '' } })(
        dispatch,
        () => initialRootState,
        null,
      );
      expect(initSavePostsSpy).toHaveBeenCalled();
      expect(failSavePostsSpy).toHaveBeenCalled();
    });
  });

  describe('getPosts thunk', () => {
    it('should call all required action in success path', async () => {
      jest.spyOn(axios, 'get').mockImplementation(() => Promise.resolve({ data: {} }));
      await getPostsThunk.getPosts()(dispatch, () => initialRootState, null);
      expect(initGetPostsSpy).toHaveBeenCalled();
      expect(successGetPostsSpy).toHaveBeenCalled();
    });

    it('should call all required action in fail path', async () => {
      const error = new Error();
      jest.spyOn(axios, 'get').mockImplementation(() => Promise.reject(error));
      await getPostsThunk.getPosts()(dispatch, () => initialRootState, null);
      expect(initGetPostsSpy).toHaveBeenCalled();
      expect(failGetPostsSpy).toHaveBeenCalled();
    });
  });
});
