export interface CategoryInterface {
  id: string;
  date: Date;
  slug: string;
  name: string;
  children: CategoryInterface[];
}

export interface CategoriesStateInterface {
  categories: CategoryInterface[];
  loading: boolean;
  error?: Error;
}
