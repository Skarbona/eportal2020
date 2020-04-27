import React, { FC, memo, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';

import './Levels.scss';
import Summary from './Summary';
import LevelsNavigation from './LevelsNavigation/LevelsNavigation';
import TaskRandomization from './TaskRandomizer';
import TaskContent from './TaskContent';
import TaskCounter from './TaskCounter';
import TaskActions from './TaskActions';
import PageHeading from '../../../Shared/PageElements/PageHeading/PageHeading';
import PageContainer from '../../../Shared/PageElements/PageContainer/PageContainer';
import { GameStatus } from '../../../../models/game-models';
import { LocalStorage } from '../../../../models/local-storage';
import { PostResponseInterface } from '../../../../../../service/src/models/shared-interfaces/post';
import { setGameTitleHelper, taskCounter } from '../../../../utils/levels';
import { usePrevious } from '../../../../hooks/previous-state';
import { saveActiveGameData } from '../../../../store/game/action';
import { useLevelsSelector } from './selector-hooks';

interface PreviousProps {
  currentTask: PostResponseInterface;
}

export const LevelsComponent: FC = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const {
    gameStatus,
    levels,
    currentTask,
    removedPosts,
    config,
    configLevels,
    posts,
  } = useLevelsSelector();
  const prevProps = usePrevious<PreviousProps>({ currentTask });

  const { currentTaskNo, taskPerLevel } = taskCounter(gameStatus, posts, configLevels);
  const shouldSeeTaskRandomization = gameStatus !== GameStatus.Summary && currentTask === null;
  const shouldSeeTaskContent = gameStatus !== GameStatus.Summary && !!currentTask;
  const isSummary = gameStatus === GameStatus.Summary;

  useEffect(() => {
    if (config) {
      window.localStorage.setItem(LocalStorage.GameConfig, JSON.stringify(config));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const currentTaskLS: PostResponseInterface = JSON.parse(
      window.localStorage.getItem(LocalStorage.CurrentTask || '{}'),
    );
    const removedPostsLS: string[][] = JSON.parse(
      window.localStorage.getItem(LocalStorage.RemovedPosts || '{}'),
    );

    if (currentTaskLS?.id && Array.isArray(removedPostsLS)) {
      dispatch(saveActiveGameData(currentTaskLS, removedPostsLS));
    }
  }, [dispatch]);

  useEffect(() => {
    if (prevProps?.currentTask === null && prevProps?.currentTask?.id !== currentTask?.id) {
      window.localStorage.setItem(LocalStorage.CurrentTask, JSON.stringify(currentTask));
      window.localStorage.setItem(LocalStorage.RemovedPosts, JSON.stringify(removedPosts));
    }

    if (!!prevProps?.currentTask?.id && currentTask === null) {
      window.localStorage.setItem(LocalStorage.CurrentTask, JSON.stringify(null));
    }
  }, [prevProps, currentTask, removedPosts]);

  if (!levels) return null;

  return (
    <>
      <PageHeading
        title={isSummary ? t('Summary') : setGameTitleHelper(gameStatus, levels)}
        className="game__levels-heading"
      />
      <PageContainer className={`game__levels game__levels-${gameStatus}`}>
        {!isSummary && (
          <TaskCounter
            isCurrentTaskVisible={!!currentTask?.id}
            taskPerLevel={taskPerLevel}
            currentTaskNo={currentTaskNo}
          />
        )}
        {shouldSeeTaskRandomization && <TaskRandomization />}
        {shouldSeeTaskContent && <TaskContent />}
        {shouldSeeTaskContent && <TaskActions />}
        {isSummary && <Summary />}
        <LevelsNavigation
          isTheLastTask={taskPerLevel === currentTaskNo}
          currentGameStatus={gameStatus}
          currentTask={currentTask}
          levels={levels}
        />
      </PageContainer>
    </>
  );
};

export default memo(LevelsComponent);
