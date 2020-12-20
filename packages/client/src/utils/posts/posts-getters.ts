import { PostResponseInterface as PostData } from '../../../../service/src/models/shared-interfaces/post';

export const shouldGetOnlyFavourites = (): boolean => Math.random() < 0.6;

export const getPostToRandom = (
  onlyFavouritesPosts: PostData[],
  postsByGender: PostData[],
  onlyFavourites: boolean,
): PostData[] => {
  if (onlyFavouritesPosts.length > 0 && (onlyFavourites || shouldGetOnlyFavourites()))
    return onlyFavouritesPosts;
  return postsByGender;
};

export const getRandomIndex = (postsToRandom: PostData[]): number =>
  postsToRandom.length > 1 ? Math.floor(Math.random() * postsToRandom.length) : 0;

export const getOnlyFavouritesPosts = (
  postsByGender: PostData[],
  favouritesPosts: string[],
): PostData[] => postsByGender.filter((post) => favouritesPosts.includes(post.id));

export const findRandomPostIndex = (postsByGender: PostData[], randomPost: PostData): number =>
  postsByGender.findIndex((post) => post.id === randomPost.id);
