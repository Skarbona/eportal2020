/* eslint-disable */
import mediaQuery from 'css-mediaquery';

export const createMatchMedia = (width: number) => (query: any) => ({
  matches: mediaQuery.match(query, { width }),
  addListener: () => {},
  removeListener: () => {},
});
