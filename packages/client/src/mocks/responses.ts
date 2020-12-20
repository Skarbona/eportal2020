import {
  PostResponseInterface,
  PostStatus,
} from '../../../service/src/models/shared-interfaces/post';
import { LevelsIDs, GenderIds } from '../constants/categoriesIds';
import { chance } from './chance';
import { CategoryResponseInterface } from '../../../service/src/models/shared-interfaces/category';

export const postsResponseMock = (): PostResponseInterface[] => [
  {
    content: {
      title: chance.word(),
      content: chance.word(),
    },
    id: chance.word() + Math.random().toString(),
    image: chance.word(),
    date: new Date(),
    slug: chance.word(),
    categories: [LevelsIDs.Level1, GenderIds.Man],
    status: PostStatus.Publish,
    author: {
      name: chance.word(),
    },
  },
  {
    content: {
      title: chance.word(),
      content: chance.word(),
    },
    image: chance.word(),
    date: new Date(),
    id: chance.word(),
    slug: chance.word(),
    categories: [LevelsIDs.Level1, GenderIds.Woman],
    status: PostStatus.Publish,
    author: {
      name: chance.word(),
    },
  },
  {
    content: {
      title: chance.word(),
      content: chance.word(),
    },
    id: chance.word(),
    image: chance.word(),
    date: new Date(),
    slug: chance.word(),
    categories: [LevelsIDs.Level2, GenderIds.Man],
    status: PostStatus.Publish,
    author: {
      name: chance.word(),
    },
  },
  {
    content: {
      title: chance.word(),
      content: chance.word(),
    },
    id: chance.word(),
    image: chance.word(),
    date: new Date(),
    slug: chance.word(),
    categories: [LevelsIDs.Level2, GenderIds.Woman],
    status: PostStatus.Publish,
    author: {
      name: chance.word(),
    },
  },
  {
    content: {
      title: chance.word(),
      content: chance.word(),
    },
    id: chance.word(),
    image: chance.word(),
    date: new Date(),
    slug: chance.word(),
    categories: [LevelsIDs.Level3, GenderIds.Man],
    status: PostStatus.Publish,
    author: {
      name: chance.word(),
    },
  },
  {
    content: {
      title: chance.word(),
      content: chance.word(),
    },
    id: chance.word(),
    image: chance.word(),
    date: new Date(),
    slug: chance.word(),
    categories: [LevelsIDs.Level3, GenderIds.Woman],
    status: PostStatus.Publish,
    author: {
      name: chance.word(),
    },
  },
];

export const categoryResponseMock = (): CategoryResponseInterface => ({
  id: 'preferences',
  date: new Date(),
  slug: 'preferences',
  name: 'preferences',
  children: [
    {
      id: 'category1',
      date: new Date(),
      slug: 'category1',
      name: 'category1',
      children: [
        {
          id: 'child1',
          date: new Date(),
          slug: 'child1',
          name: 'child1',
        },
        {
          id: 'child2',
          date: new Date(),
          slug: 'child2',
          name: 'child2',
        },
      ],
    },
  ],
});
