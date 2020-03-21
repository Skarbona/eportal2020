import { CategoriesStateInterface } from '../../../store/categories/initialState.interface';

export interface GameSettingStoreProps {
  cats: CategoriesStateInterface['categories'];
  loading: boolean;
  error: Error;
}
