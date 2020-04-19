import React, { FC, memo } from 'react';

import './Levels.scss';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import Level1 from './Level1';
import Level2 from './Level2';
import Level3 from './Level3';
import Summary from './Summary';
import LevelsNavigation from './LevelsNavigation';
import PageHeading from '../../../Shared/PageElements/PageHeading/PageHeading';
import PageContainer from '../../../Shared/PageElements/PageContainer/PageContainer';
import { RootState } from '../../../../store/store.interface';
import { GameStatus } from '../../../../store/game/initialState.interface';
import { setGameTitleHelper } from '../../../../utils/levels';
import { CategoryInterface } from '../../../../store/categories/initialState.interface';

interface PropsSelector {
  gameStatus: GameStatus;
  levels: CategoryInterface[];
}

export const LevelsComponent: FC = () => {
  const { t } = useTranslation();
  const { gameStatus, levels } = useSelector<RootState, PropsSelector>(({ game, categories }) => ({
    gameStatus: game.gameStatus,
    levels: categories.categories?.levels?.children,
  }));

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
        {gameStatus === GameStatus.Level1 && <Level1 />}
        {gameStatus === GameStatus.Level2 && <Level2 />}
        {gameStatus === GameStatus.Level3 && <Level3 />}
        {gameStatus === GameStatus.Summary && <Summary />}
        <LevelsNavigation />
      </PageContainer>
    </>
  );
};

export default memo(LevelsComponent);
