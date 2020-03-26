export interface CategoryInterface {
  id: string;
  date: Date;
  slug: string;
  name: string;
  children?: CategoryInterface[];
}

export interface CategoriesStateInterface {
  categories: {
    preferences: CategoryInterface;
    gender: CategoryInterface;
    places: CategoryInterface;
    levels: CategoryInterface;
  };
  loading: boolean;
  error?: Error;
}
