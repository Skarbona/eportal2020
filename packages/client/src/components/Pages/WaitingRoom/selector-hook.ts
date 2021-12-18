import { useSelector } from 'react-redux';
import { RootState } from '../../../store/store.interface';
import { PostResponseInterface } from '../../../../../service/src/models/shared-interfaces/post';
import { CategoriesStateInterface } from '../../../store/categories/initialState.interface';
import { NetworkError } from '../../../models/alerts';

export const useFormSelector = (): UseFormSelector =>
  useSelector<RootState, UseFormSelector>(({ categories, waitingRoom }) => ({
    cats: categories.categories,
    error: waitingRoom.error,
    alert: waitingRoom.alert,
  }));

interface UseFormSelector {
  cats: CategoriesStateInterface['categories'];
  error: NetworkError;
  alert: boolean;
}

export const usePostsSelector = (): PostSelector =>
  useSelector<RootState, PostSelector>(({ waitingRoom, categories, user }) => {
    return {
      posts: waitingRoom.posts,
      allCatsMap: categories.allCatsMap,
      cats: categories.categories,
      isAdmin: user.userData.type === 'admin',
    };
  });

interface PostSelector {
  posts: PostResponseInterface[];
  allCatsMap: Map<string, string>;
  cats: CategoriesStateInterface['categories'];
  isAdmin: boolean;
}

export const useWaitingRoomSelector = (): WaitingRoomSelector =>
  useSelector<RootState, WaitingRoomSelector>(({ waitingRoom, categories }) => ({
    totalPages: waitingRoom.posts?.length
      ? Math.ceil(waitingRoom.posts?.length || 1 / 10 - 1 || 1)
      : 0,
    catsLoaded: !!categories.allCatsMap,
  }));

interface WaitingRoomSelector {
  totalPages: number;
  catsLoaded: boolean;
}
