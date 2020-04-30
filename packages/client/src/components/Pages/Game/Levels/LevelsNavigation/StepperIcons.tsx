import React, { FC } from 'react';
import { Filter1, Filter2, Filter3 } from '@material-ui/icons';

interface StepIcons {
  active: boolean;
  completed: boolean;
  icon: number;
}

export const StepperIcons: FC<StepIcons> = ({ active, completed, icon }) => {
  const icons: { [index: string]: React.ReactElement } = {
    1: <Filter1 />,
    2: <Filter2 />,
    3: <Filter3 />,
  };

  return (
    <div
      className={`steps-wrapper ${active ? 'active-step' : ''}${completed ? 'completed-step' : ''}`}
    >
      {icons[String(icon)]}
    </div>
  );
};
