import React, { FC, memo } from 'react';
import { useTranslation } from 'react-i18next';
import { PostResponseInterface } from '../../../../../../service/src/models/shared-interfaces/post';

interface Props {
  currentTask: PostResponseInterface;
}

export const TaskContentComponent: FC<Props> = ({ currentTask }) => {
  const { t } = useTranslation();
  return (
    <div>
      <div>{t('Task No')}: 0/10</div>
      <h3>{currentTask.content.title}</h3>
      <br />
      {currentTask.content.content}
    </div>
  );
};

export default memo(TaskContentComponent);
