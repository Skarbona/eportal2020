import { convertedPosts } from '../../utils/post-data-for-game';
import { postsResponseMock } from '../../mocks/responses';

describe('convertedPosts utility function', () => {
  it('should return proper object for provided arguments', () => {
    const returnValue = convertedPosts(postsResponseMock());
    Object.values(returnValue).forEach(level => {
      expect(level.data.man).toHaveLength(1);
      expect(level.data.woman).toHaveLength(1);
    });
  });
});
