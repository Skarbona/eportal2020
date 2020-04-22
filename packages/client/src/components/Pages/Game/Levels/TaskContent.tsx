import React, { FC, memo } from 'react';
import { PostResponseInterface } from '../../../../../../service/src/models/shared-interfaces/post';

interface Props {
  currentTask: PostResponseInterface;
}

export const TaskContentComponent: FC<Props> = ({ currentTask }) => {
  return (
    <div>
      <h3>{currentTask.content.title}</h3>
      <br />
      {currentTask.content.content}
    </div>
  );
};

export default memo(TaskContentComponent);
