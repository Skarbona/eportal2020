import { useSelector } from 'react-redux';
import { RootState } from '../store/store.interface';
import { MONTH_PLAN_ID, ONE_DAY_ACCESS } from '../constants/envs';

export const usePremiumUser = () => {
  const { currentPeriodEnd, activePlan, isAdmin } = useSelector<
    RootState,
    ProfilePageSelectorProps
  >(({ user }) => ({
    isAdmin: user.userData.type === 'admin',
    activePlan: user.userData.activePlan,
    currentPeriodEnd: user.userData.currentPeriodEnd,
  }));

  const isMonthPlan = activePlan === MONTH_PLAN_ID;
  const isDayPlan = activePlan === ONE_DAY_ACCESS;

  const isStillActive = new Date().getTime() <= new Date(currentPeriodEnd ?? 0)?.getTime();

  return {
    isPremium: !!isStillActive || isAdmin,
    currentPeriodEnd: isStillActive ? new Date(currentPeriodEnd) : undefined,
    activePlan,
    isMonthPlan,
    isDayPlan,
    cancelledSubscription: !isMonthPlan && !isDayPlan,
  };
};

interface ProfilePageSelectorProps {
  activePlan: string;
  isAdmin: boolean;
  currentPeriodEnd: Date;
}
