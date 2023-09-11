import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { PremiumStar } from '../PremiumStar';

interface Props {
  title: string;
}

export const ExpansionPanelPremiumTitle: FC<Props> = ({ title }) => {
  const { t } = useTranslation();

  return (
    <span className="premium-expansion-title">
      {t(title)}
      <PremiumStar size="small" />
    </span>
  );
};
