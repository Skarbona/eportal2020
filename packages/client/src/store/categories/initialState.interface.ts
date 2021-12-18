import { AlertTypes } from '../../models/alerts';

export interface CategoryInterface {
  id: string;
  date: Date;
  slug: string;
  name: string;
  description?: string;
  children?: CategoryInterface[];
}

export interface CategoriesStateInterface {
  categories: {
    preferences: CategoryInterface;
    gender: CategoryInterface;
    places: CategoryInterface;
    levels: CategoryInterface;
  };
  allCatsMap: Map<string, string>;
  loading: boolean;
  error?: Error;
  alert?: boolean;
  alertType?: AlertTypes;
}
