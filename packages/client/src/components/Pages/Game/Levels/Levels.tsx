import React, { FC, memo, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';

import './Levels.scss';
import Summary from './Summary';
import LevelsNavigation from './LevelsNavigation';
import TaskRandomization from './TaskRandomizer';
import TaskContent from './TaskContent';
import PageHeading from '../../../Shared/PageElements/PageHeading/PageHeading';
import PageContainer from '../../../Shared/PageElements/PageContainer/PageContainer';
import { GameStatus } from '../../../../models/game-models';
import { LocalStorage } from '../../../../models/local-storage';
import { RootState } from '../../../../store/store.interface';
import { CategoryInterface } from '../../../../store/categories/initialState.interface';
import { PostResponseInterface } from '../../../../../../service/src/models/shared-interfaces/post';
import { setGameTitleHelper } from '../../../../utils/levels';
import { usePrevious } from '../../../../hooks/previous-state';
import { saveActiveGameData } from '../../../../store/game/action';

interface PropsSelector {
  gameStatus: GameStatus;
  levels: CategoryInterface[];
  currentTask: PostResponseInterface;
  removedPosts: string[][];
}

interface PreviousProps {
  currentTask: PostResponseInterface;
}

export const LevelsComponent: FC = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { gameStatus, levels, currentTask, removedPosts } = useSelector<RootState, PropsSelector>(
    ({ game, categories }) => ({
      gameStatus: game.gameStatus,
      levels: categories.categories?.levels?.children,
      currentTask: game.currentTask,
      removedPosts: [
        game.posts.level1.removedPosts,
        game.posts.level2.removedPosts,
        game.posts.level3.removedPosts,
      ],
    }),
  );
  const prevProps = usePrevious<PreviousProps>({ currentTask });

  useEffect(() => {
    const currentTask = (JSON.parse(
      window.localStorage.getItem(LocalStorage.CurrentTask || '{}'),
    ) as unknown) as PostResponseInterface;
    const removedPosts = (JSON.parse(
      window.localStorage.getItem(LocalStorage.RemovedPosts || '{}'),
    ) as unknown) as string[][];

    if (currentTask?.id && Array.isArray(removedPosts)) {
      dispatch(saveActiveGameData(currentTask, removedPosts));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (prevProps?.currentTask === null && prevProps?.currentTask?.id !== currentTask?.id) {
      window.localStorage.setItem(LocalStorage.CurrentTask, JSON.stringify(currentTask));
      window.localStorage.setItem(LocalStorage.RemovedPosts, JSON.stringify(removedPosts));
    }

    if (!!prevProps?.currentTask?.id && currentTask === null) {
      window.localStorage.setItem(LocalStorage.CurrentTask, JSON.stringify(null));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [prevProps, currentTask, removedPosts]);

  if (!levels) return null;

  return (
    <>
      <PageHeading
        title={
          gameStatus === GameStatus.Summary ? t('Summary') : setGameTitleHelper(gameStatus, levels)
        }
        className="game__levels-heading"
      />
      <PageContainer className={`game__levels game__levels-${gameStatus}`}>
        {gameStatus !== GameStatus.Summary && currentTask === null && <TaskRandomization />}
        {gameStatus !== GameStatus.Summary && !!currentTask && (
          <TaskContent currentTask={currentTask} />
        )}
        {gameStatus === GameStatus.Summary && <Summary />}
        <LevelsNavigation />
      </PageContainer>
    </>
  );
};

export default memo(LevelsComponent);
