import React, { FC, useState, useCallback, memo, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { TextField, Grid } from '@material-ui/core';
import { useTranslation } from 'react-i18next';

import { Pagination } from '@material-ui/lab';
import { usePostsSelector } from './selector-hook';
import Post from './Post';
import CircleLoading from '../../Shared/UIElements/Loading/CircleLoading';
import { PageParams } from '../../../models/page-types';

const PAGE_SIZE = 10;

export const PostsComponent: FC<Props> = ({ isWaitingRoomMode }) => {
  const { page } = useParams<{ page: string }>();

  const { t } = useTranslation();
  const { posts, allCatsMap, cats, isAdmin } = usePostsSelector();
  const [pageNumber, setPageNumber] = useState<number>(0);

  const [edit, setEdit] = useState<string>('');
  const history = useHistory();

  useEffect(() => {
    setPageNumber(Number.isNaN(parseInt(page, 10)) ? 0 : parseInt(page, 10));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [search, setSearch] = useState<string>('');

  const filterPosts =
    posts
      ?.filter(
        (post) =>
          post.content.title.toLocaleLowerCase().includes(search?.toLocaleLowerCase()) ||
          post.id === search?.toLocaleLowerCase() ||
          post.content.content.toLocaleLowerCase().includes(search?.toLocaleLowerCase()),
      )
      ?.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()) ?? [];

  const totalPages = filterPosts.length ? Math.ceil(filterPosts.length / 10) : 0;

  const postsByPageNumberSorted = filterPosts.slice(
    (pageNumber - 1) * PAGE_SIZE,
    pageNumber * PAGE_SIZE,
  );

  const setEditHandler = useCallback((id: string) => setEdit(id === edit ? '' : id), [edit]);

  const setPageNumberHandler = useCallback(
    (value) => {
      setPageNumber(value);
      history.push(`${isWaitingRoomMode ? PageParams.WaitingRoom : PageParams.Posts}/${value}`);
    },
    [history, isWaitingRoomMode],
  );
  return (
    <>
      {!isWaitingRoomMode && isAdmin && (
        <Grid className="inputs-for-light-bg" container>
          <TextField
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            label={t('Search')}
            variant="filled"
            margin="normal"
            fullWidth
          />
        </Grid>
      )}
      {!posts && <CircleLoading />}
      {posts?.length === 0 && t('No posts')}
      {cats?.preferences &&
        postsByPageNumberSorted?.map((post) => (
          <Post
            isAdmin={isAdmin}
            key={post.id}
            post={post}
            cats={cats}
            setEdit={setEditHandler}
            edit={edit}
            allCatsMap={allCatsMap}
          />
        ))}
      <Grid item sm={12} md={12}>
        {totalPages > 1 && (
          <Pagination
            className="waiting-room__pagination"
            page={pageNumber}
            onChange={(e, value): void => setPageNumberHandler(value)}
            count={totalPages}
            color="primary"
          />
        )}
      </Grid>
    </>
  );
};

interface Props {
  isWaitingRoomMode: boolean;
}

export default memo(PostsComponent);
