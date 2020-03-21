import './ExpansionPanel.scss';

import {
  ExpansionPanel,
  ExpansionPanelDetails,
  ExpansionPanelSummary,
  Typography,
} from '@material-ui/core';
import { ExpandMore } from '@material-ui/icons';
import React, { FC, memo, ReactNode, useState } from 'react';

interface Props {
  children: ReactNode;
  icon?: ReactNode;
  title: string;
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
  defaultState = true,
}) => {
  const [expanded, setExpanded] = useState<boolean>(defaultState);
  const setExpandedHandler = (): void => setExpanded(!expanded);

  return (
    <ExpansionPanel expanded={expanded} onChange={setExpandedHandler} className={className}>
      <ExpansionPanelSummary
        expandIcon={<ExpandMore />}
        className="expansion-panel-summary"
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
