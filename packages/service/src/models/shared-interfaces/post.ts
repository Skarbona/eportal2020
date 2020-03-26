export interface PostBasicInterface {
  content: {
    title: string;
    content: string;
  };
  image?: string;
  author: string;
}

export enum PostStatus {
  Publish = 'publish',
}

export interface PostRequestInterface extends PostBasicInterface {
  categories: string[];
}

export interface PostResponseInterface extends PostBasicInterface {
  date: Date;
  slug: string;
  categories: string[];
  status: PostStatus;
}
