/* eslint-disable */
import mediaQuery from 'css-mediaquery';
import { ONE_DAY_ACCESS, MONTH_PLAN_ID } from '../constants/envs';

export const createMatchMedia = (width: number) => (query: any) => ({
  matches: mediaQuery.match(query, { width }),
  addListener: () => {},
  removeListener: () => {},
});

export const ONE_DAY = 60 * 60 * 24 * 1000;
export const ONE_MONTH = ONE_DAY * 30;
export const premiumUser = (period: '24h' | '1 month' = '1 month', cancelled: boolean = false) => ({
  activePlan: period === '24h' ? ONE_DAY_ACCESS : cancelled ? '' : MONTH_PLAN_ID,
  currentPeriodEnd:
    period === '24h'
      ? new Date(new Date().getTime() + ONE_DAY)
      : new Date(new Date().getTime() + ONE_MONTH),
});
