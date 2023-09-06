import React, { CSSProperties, FC } from 'react';
import { StarRateSharp, StarBorderSharp } from '@material-ui/icons';
import { IconButton, Tooltip } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { usePremiumUser } from '../../../hooks/usePremiumUser';

interface Props {
  size?: 'small' | 'medium';
  style?: CSSProperties;
  color?: 'inherit' | 'primary';
}

export const PremiumStar: FC<Props> = ({ size, style, color = 'inherit' }) => {
  const { isPremium } = usePremiumUser();
  const { t } = useTranslation();

  return (
    <IconButton size={size} style={style}>
      {isPremium ? (
        <Tooltip title={t('You have Premium')} enterTouchDelay={0}>
          <StarRateSharp color={color} />
        </Tooltip>
      ) : (
        <Tooltip title={t('You need Premium to use all features')} enterTouchDelay={0}>
          <StarBorderSharp color={color} />
        </Tooltip>
      )}
    </IconButton>
  );
};
