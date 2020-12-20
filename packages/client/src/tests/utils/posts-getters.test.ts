import {
  getPostsToRandomize,
  getRandomIndex,
  getOnlyFavouritesPosts,
  findRandomPostIndex,
} from '../../utils/posts/posts-getters';
import { postsResponseMock } from '../../mocks/responses';

describe('getPostsToRandomize utility function', () => {
  it('should return favourite post if onlyFavourites is set to true', () => {
    const allPosts = postsResponseMock();
    const favouritePosts = [allPosts[1]];

    const posts = getPostsToRandomize(favouritePosts, allPosts, true);
    expect(posts[0].id).toEqual(favouritePosts[0].id);
    expect(posts.length).toEqual(1);
  });
});

describe('getRandomIndex utility function', () => {
  it('index should be valid (exist)', () => {
    const allPosts = postsResponseMock();
    const index = getRandomIndex(allPosts);
    expect(index).toBeGreaterThanOrEqual(0);
    expect(index).toBeLessThanOrEqual(allPosts.length - 1);
  });
});

describe('getOnlyFavouritesPosts utility function', () => {
  it('should get only favourite posts', () => {
    const allPosts = postsResponseMock();
    const favouritePosts = [allPosts[1].id, allPosts[3].id];
    const onlyFavouritePosts = getOnlyFavouritesPosts(allPosts, favouritePosts);
    expect(onlyFavouritePosts).toHaveLength(2);
    onlyFavouritePosts.forEach((post) => expect(favouritePosts.includes(post.id)).toEqual(true));
  });
});

describe('findRandomPostIndex utility function', () => {
  it('should find post index', () => {
    const INDEX_TO_FIND = 3;
    const allPosts = postsResponseMock();
    const post = allPosts[INDEX_TO_FIND];
    const index = findRandomPostIndex(allPosts, post);
    expect(index).toEqual(INDEX_TO_FIND);
  });
});
