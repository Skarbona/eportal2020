export interface CategoryBasicInterface {
  date: Date;
  slug: string;
  name: string;
  description?: string;
}

export interface CategoryResponseInterface extends CategoryBasicInterface {
  id: string;
  children?: CategoryResponseInterface[];
}
