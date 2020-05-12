export interface PostBasicInterface {
  content: {
    title: string;
    content: string;
  };
  image?: string;
}

export enum PostStatus {
  Publish = 'Publish',
  AwaitingForApproval = 'AwaitingForApproval',
}

export interface PostRequestInterface extends PostBasicInterface {
  categories: string[];
  author: string;
}

export interface PostResponseInterface extends PostBasicInterface {
  date: Date;
  slug: string;
  categories: string[];
  status: PostStatus;
  author: string;
  id: string;
}
