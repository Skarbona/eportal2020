import React, { FC, memo } from 'react';

import { useSelector } from 'react-redux';
import { PostResponseInterface } from '../../../../../../service/src/models/shared-interfaces/post';
import { RootState } from '../../../../store/store.interface';

interface PropsSelector {
  currentTask: PostResponseInterface;
}

export const TaskContentComponent: FC = () => {
  const { currentTask } = useSelector<RootState, PropsSelector>(({ game }) => ({
    currentTask: game.currentTask,
  }));

  return (
    <div>
      <h3>{currentTask.content.title}</h3>
      <br />
      {currentTask.content.content}
    </div>
  );
};

export default memo(TaskContentComponent);
