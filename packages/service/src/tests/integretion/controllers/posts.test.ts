import mongoose from 'mongoose';

import Post from '../../../models/post';
import User from '../../../models/user';
import appStartUp from '../../../app';
import {
  signUpUser,
  createPosts,
  getPosts,
  savePost,
  loginAdmin,
} from '../../../utils/test-basic-calls';
import { PostResponseInterface, PostStatus } from '../../../models/shared-interfaces/post';
import { ServerWithClose } from '../../../utils/server-interface';

describe('Controller: Post', () => {
  let server: ServerWithClose;

  beforeAll(async () => {
    server = await appStartUp;
  });

  afterEach(async () => {
    await Post.deleteMany({});
    await User.deleteMany({ name: { $ne: 'eportal_admin' } });
  });

  afterAll(async () => {
    await mongoose.connection.close();
    await server.close();
  });

  describe('savePosts Controller', () => {
    it('should save post', async () => {
      const admin = await loginAdmin(server);
      const createdPosts = await createPosts(
        server,
        admin.body.accessToken,
        admin.body.userData.id,
      );
      const savedPosts = await savePost(
        server,
        admin.body.accessToken,
        admin.body.userData.id,
        createdPosts.body.posts[0]._id,
      );
      expect(savedPosts.status).toEqual(200);
      expect(savedPosts.body.post.categories).toHaveLength(2);
      expect(savedPosts.body.post.date).toBeDefined();
      expect(savedPosts.body.post.slug).toBeDefined();
      expect(savedPosts.body.post.status).toEqual(PostStatus.AwaitingForApproval);
      expect(savedPosts.body.post.author).toBeDefined();
      expect(savedPosts.body.post.image).toBeDefined();
      expect(savedPosts.body.post.content.title).toEqual('SAVED TITLE');
      expect(savedPosts.body.post.content.content).toEqual('SAVED CONTENT');
    });

    it('should change post status', async () => {
      const admin = await loginAdmin(server);
      const createdPosts = await createPosts(
        server,
        admin.body.accessToken,
        admin.body.userData.id,
      );
      const savedPosts = await savePost(
        server,
        admin.body.accessToken,
        admin.body.userData.id,
        '',
        {
          post: {
            id: createdPosts.body.posts[0]._id,
            status: PostStatus.Publish,
          },
        },
      );
      expect(savedPosts.body.post.status).toEqual(PostStatus.Publish);
    });

    it('should not allow not admin user to save data', async () => {
      const user = await signUpUser(server);
      const createdPosts = await createPosts(server, user.body.accessToken, user.body.userData.id);
      const savedPosts = await savePost(
        server,
        user.body.accessToken,
        user.body.userData.id,
        createdPosts.body.posts[0]._id,
      );
      expect(savedPosts.status).toEqual(401);
    });

    it('should NOT return data if access token not provided', async () => {
      const user = await signUpUser(server);
      const createdPosts = await createPosts(server, user.body.accessToken, user.body.userData.id);
      const posts = await savePost(server, '', '', createdPosts.body.posts[0]._id);
      expect(posts.status).toEqual(401);
    });

    it('should return 400 if body is not valid', async () => {
      const admin = await loginAdmin(server);
      await createPosts(server, admin.body.accessToken, admin.body.userData.id);
      const savedPosts = await savePost(
        server,
        admin.body.accessToken,
        admin.body.userData.id,
        '',
        {},
      );
      expect(savedPosts.status).toEqual(400);
    });
  });

  describe('createPosts Controller', () => {
    it('should create posts', async () => {
      const user = await signUpUser(server);
      const posts = await createPosts(server, user.body.accessToken, user.body.userData.id);
      expect(posts.status).toEqual(201);
      expect(posts.body.posts).toHaveLength(2);
      expect(posts.body.posts[0].categories).toHaveLength(1);
      expect(posts.body.posts[0].date).toBeDefined();
      expect(posts.body.posts[0].slug).toBeDefined();
      expect(posts.body.posts[0].status).toEqual(PostStatus.AwaitingForApproval);
      expect(posts.body.posts[0].author).toBeDefined();
      expect(posts.body.posts[0].image).toBeDefined();
      expect(posts.body.posts[0].content.title).toEqual('TITLE');
      expect(posts.body.posts[0].content.content).toEqual('CONTENT');
    });

    it('should NOT return data if access token not provided', async () => {
      const posts = await createPosts(server, '', '');
      expect(posts.status).toEqual(401);
    });

    it('should return 400 if body is not valid', async () => {
      const user = await signUpUser(server);
      const posts = await createPosts(server, user.body.accessToken, user.body.userData.id, {});
      expect(posts.status).toEqual(400);
    });
  });

  describe('getPosts Controller', () => {
    it('should get all posts', async () => {
      const user = await signUpUser(server);
      await createPosts(server, user.body.accessToken, user.body.userData.id);
      const posts = await getPosts(server, user.body.accessToken);
      expect(posts.status).toEqual(200);
      expect(posts.body.posts).toHaveLength(2);
    });

    it('should set awaitingForApproval status for all new created posts', async () => {
      const user = await signUpUser(server);
      const cat1 = mongoose.Types.ObjectId();
      const cat2 = mongoose.Types.ObjectId();
      const cat3 = mongoose.Types.ObjectId();
      const postsBody = {
        posts: [
          {
            content: {
              content: 'CONTENT',
              title: 'TITLE',
            },
            author: user.body.userData.id,
            image: '',
            categories: [cat1, cat3],
            status: PostStatus.Publish,
          },
          {
            content: {
              content: 'CONTENT2',
              title: 'TITLE2',
            },
            author: user.body.userData.id,
            image: '',
            categories: [cat2],
          },
        ],
      };
      await createPosts(server, user.body.accessToken, user.body.userData.id, postsBody);
      const posts = await getPosts(
        server,
        user.body.accessToken,
        `?status=${PostStatus.AwaitingForApproval}`,
      );
      expect(posts.status).toEqual(200);
      expect(posts.body.posts).toHaveLength(2);
      expect(
        posts.body.posts.every(
          (post: PostResponseInterface) => post.status === PostStatus.AwaitingForApproval,
        ),
      ).toEqual(true);
    });

    it('should get only post related to strictly cats (it must include)', async () => {
      const user = await signUpUser(server);
      const cat1 = mongoose.Types.ObjectId();
      const cat2 = mongoose.Types.ObjectId();
      const cat3 = mongoose.Types.ObjectId();
      const postsBody = {
        posts: [
          {
            content: {
              content: 'CONTENT',
              title: 'TITLE',
            },
            author: user.body.userData.id,
            image: '',
            categories: [cat1, cat3],
          },
          {
            content: {
              content: 'CONTENT2',
              title: 'TITLE2',
            },
            author: user.body.userData.id,
            image: '',
            categories: [cat2],
          },
        ],
      };
      await createPosts(server, user.body.accessToken, user.body.userData.id, postsBody);
      const posts = await getPosts(
        server,
        user.body.accessToken,
        `?catsIncludeStrict=${cat1}&status=${PostStatus.AwaitingForApproval}`,
      );
      expect(posts.status).toEqual(200);
      expect(posts.body.posts).toHaveLength(1);
    });

    it('should get only post related to catsInclude (it should include 1 of cats)', async () => {
      const user = await signUpUser(server);
      const cat1 = mongoose.Types.ObjectId();
      const cat2 = mongoose.Types.ObjectId();
      const cat3 = mongoose.Types.ObjectId();
      const postsBody = {
        posts: [
          {
            content: {
              content: 'CONTENT',
              title: 'TITLE',
            },
            author: user.body.userData.id,
            image: '',
            categories: [cat1],
          },
          {
            content: {
              content: 'CONTENT2',
              title: 'TITLE2',
            },
            author: user.body.userData.id,
            image: '',
            categories: [cat2, cat3],
          },
        ],
      };
      await createPosts(server, user.body.accessToken, user.body.userData.id, postsBody);
      const posts = await getPosts(
        server,
        user.body.accessToken,
        `?catsInclude=${cat1},${cat3}&status=${PostStatus.AwaitingForApproval}`,
      );
      expect(posts.status).toEqual(200);
      expect(posts.body.posts).toHaveLength(2);
    });

    it('should not get posts related to catsExclude', async () => {
      const user = await signUpUser(server);
      const cat1 = mongoose.Types.ObjectId();
      const cat2 = mongoose.Types.ObjectId();
      const cat3 = mongoose.Types.ObjectId();
      const postsBody = {
        posts: [
          {
            content: {
              content: 'CONTENT',
              title: 'TITLE',
            },
            author: user.body.userData.id,
            image: '',
            categories: [cat1],
          },
          {
            content: {
              content: 'CONTENT2',
              title: 'TITLE2',
            },
            author: user.body.userData.id,
            image: '',
            categories: [cat2, cat3],
          },
        ],
      };
      await createPosts(server, user.body.accessToken, user.body.userData.id, postsBody);
      const posts1 = await getPosts(
        server,
        user.body.accessToken,
        `?catsExclude=${cat3}&status=${PostStatus.AwaitingForApproval}`,
      );
      expect(posts1.status).toEqual(200);
      expect(posts1.body.posts).toHaveLength(1);

      const posts2 = await getPosts(
        server,
        user.body.accessToken,
        `?catsExclude=${cat3},${cat1}&status=${PostStatus.AwaitingForApproval}`,
      );
      expect(posts2.status).toEqual(200);
      expect(posts2.body.posts).toHaveLength(0);
    });

    it('should handle multi query', async () => {
      const user = await signUpUser(server);
      const cat1 = mongoose.Types.ObjectId();
      const cat2 = mongoose.Types.ObjectId();
      const cat3 = mongoose.Types.ObjectId();
      const cat4 = mongoose.Types.ObjectId();
      const postsBody = {
        posts: [
          {
            content: {
              content: 'CONTENT',
              title: 'TITLE',
            },
            author: user.body.userData.id,
            image: '',
            categories: [cat1, cat3],
          },
          {
            content: {
              content: 'CONTENT2',
              title: 'TITLE2-EXCLUDED',
            },
            author: user.body.userData.id,
            image: '',
            categories: [cat2, cat3, cat1],
          },
          {
            content: {
              content: 'CONTENT2',
              title: 'TITLE2',
            },
            author: user.body.userData.id,
            image: '',
            categories: [cat1, cat4],
          },
          {
            content: {
              content: 'CONTENT2',
              title: 'TITLE-EXCLUDED',
            },
            author: user.body.userData.id,
            image: '',
            categories: [cat2, cat3, cat1],
          },
        ],
      };
      await createPosts(server, user.body.accessToken, user.body.userData.id, postsBody);
      const posts = await getPosts(
        server,
        user.body.accessToken,
        `?catsIncludeStrict=${cat1}&catsExclude=${cat2}&catsInclude=${cat3},${cat4}&status=${PostStatus.AwaitingForApproval}`,
      );
      expect(posts.status).toEqual(200);
      expect(posts.body.posts).toHaveLength(2);
    });

    it('should NOT return data if access token not provided', async () => {
      const posts = await getPosts(server, '', '');
      expect(posts.status).toEqual(401);
    });

    it('should return 400 if query has not valid IDs', async () => {
      const user = await signUpUser(server);
      const posts = await getPosts(server, user.body.accessToken, '?catsIncludeStrict=NOT_VALID');
      expect(posts.status).toEqual(400);
    });
  });
});
