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

export const usePostsSelector = (pageNumber: number): PostSelector =>
  useSelector<RootState, PostSelector>(({ waitingRoom, categories, user }) => {
    const postsByPageNumberSorted = waitingRoom.posts
      ?.slice((pageNumber - 1) * 10, (pageNumber - 1) * 10 + 10)
      ?.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    return {
      posts: postsByPageNumberSorted,
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
    totalPages: Math.ceil(waitingRoom.posts?.length / 10 - 1 || 1),
    catsLoaded: !!categories.allCatsMap,
  }));

interface WaitingRoomSelector {
  totalPages: number;
  catsLoaded: boolean;
}
