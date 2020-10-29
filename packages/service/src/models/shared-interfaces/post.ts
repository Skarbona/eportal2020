export interface PostBasicInterface {
  content: {
    title: string;
    content: string;
  };
  image?: string;
}

export enum PostStatus {
  Publish = 'publish',
  Archival = 'archival',
  AwaitingForApproval = 'awaitingForApproval',
}

export interface PostRequestInterface extends PostBasicInterface {
  categories: string[];
  author: string;
  id?: string;
}

export interface PostResponseInterface extends PostBasicInterface {
  date: Date;
  slug: string;
  categories: string[];
  status: PostStatus;
  author: {
    name: string;
  };
  id: string;
}
