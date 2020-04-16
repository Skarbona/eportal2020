import React, { FC, memo } from 'react';

export const SummaryComponent: FC<{}> = () => {
  return <div>Summary</div>;
};

export default memo(SummaryComponent);
