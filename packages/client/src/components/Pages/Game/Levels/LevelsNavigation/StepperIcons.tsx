import React, { FC } from 'react';
import { Filter1, Filter2, Filter3 } from '@material-ui/icons';

export interface Props {
  active: boolean;
  completed: boolean;
  icon: number;
}

interface Icons {
  [index: string]: React.ReactElement;
}

export const StepperIcons: FC<Props> = ({ active, completed, icon }) => {
  const icons: Icons = {
    1: <Filter1 />,
    2: <Filter2 />,
    3: <Filter3 />,
  };

  return (
    <div
      className={`steps-wrapper ${active ? 'active-step' : ''} ${
        completed ? 'completed-step' : ''
      }`}
    >
      {icons[String(icon)]}
    </div>
  );
};
