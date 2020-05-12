export interface PageBasicInterface {
  content: {
    title: string;
    content: string;
  };
  image?: string;
}

export interface PageRequestInterface extends PageBasicInterface {
  author?: string;
}

export interface PageResponseInterface extends PageBasicInterface {
  date: Date;
  slug: string;
  author: string;
  id: string;
}
