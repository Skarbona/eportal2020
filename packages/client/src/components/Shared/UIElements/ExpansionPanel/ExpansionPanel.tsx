import './ExpansionPanel.scss';

import {
  ExpansionPanel,
  ExpansionPanelDetails,
  ExpansionPanelSummary,
  Typography,
} from '@material-ui/core';
import { ExpandMore } from '@material-ui/icons';
import React, { FC, memo, ReactNode, useState } from 'react';

export interface Props {
  children: ReactNode;
  icon?: ReactNode;
  title: JSX.Element | string;
  subtitle?: string;
  className?: string;
  defaultState?: boolean;
}

export const ExpansionPanelComponent: FC<Props> = ({
  children,
  icon = null,
  title,
  className,
  subtitle,
  defaultState = false,
}) => {
  const [expanded, setExpanded] = useState<boolean>(defaultState);
  const setExpandedHandler = (): void => setExpanded(!expanded);

  return (
    <ExpansionPanel
      expanded={expanded}
      onChange={setExpandedHandler}
      className={`expansion-panel primary-gradient-bg ${className}`}
    >
      <ExpansionPanelSummary
        expandIcon={<ExpandMore />}
        className="expansion-panel__summary"
        aria-controls={`${title}-header`}
        id={`${title}-header`}
      >
        {icon}
        <Typography>{title}</Typography>
        {subtitle && <Typography className="subtitle">{subtitle}</Typography>}
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>{children}</ExpansionPanelDetails>
    </ExpansionPanel>
  );
};

export default memo(ExpansionPanelComponent);
