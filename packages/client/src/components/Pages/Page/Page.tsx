import React, { FC, memo, useEffect } from 'react';
import { useSelector } from 'react-redux';

import './Page.scss';
import { RootState } from '../../../store/store.interface';
import { PageNames } from '../../../store/pages/initialState.interface';
import { getPageData } from '../../../store/pages/thunks/getPageData';
import PageContainer from '../../Shared/PageElements/PageContainer/PageContainer';
import PageHeading from '../../Shared/PageElements/PageHeading/PageHeading';
import { useReduxDispatch } from '../../../store/helpers';

interface SelectorProps {
  title: string;
  content: string;
}

interface Props {
  slug: PageNames;
}
export const PageComponent: FC<Props> = ({ slug }) => {
  const dispatch = useReduxDispatch();
  const { title, content } = useSelector<RootState, SelectorProps>(({ pages }) => ({
    title: pages.page[slug]?.content.title,
    content: pages.page[slug]?.content.content,
  }));

  useEffect(() => {
    if (!title) {
      dispatch(getPageData(slug));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [title]);

  return (
    <>
      <PageHeading title={title} className="single-page-heading" />
      <PageContainer className={`single-page page-${slug}`}>
        <div dangerouslySetInnerHTML={{ __html: content }} />
      </PageContainer>
    </>
  );
};

export default memo(PageComponent);
