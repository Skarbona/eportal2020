import React, { FC, useState, useCallback, memo } from 'react';
import { TextField, Grid } from '@material-ui/core';
import { useTranslation } from 'react-i18next';

import { usePostsSelector } from './selector-hook';
import Post from './Post';
import CircleLoading from '../../Shared/UIElements/Loading/CircleLoading';

export const PostsComponent: FC<Props> = ({ pageNumber, isWaitingRoomMode }) => {
  const { t } = useTranslation();
  const { posts, allCatsMap, cats, isAdmin } = usePostsSelector();
  const [edit, setEdit] = useState<string>('');
  const [search, setSearch] = useState<string>('');

  const postsByPageNumberSorted = posts
    ?.filter((post) => post.content.title.toLocaleLowerCase().includes(search?.toLocaleLowerCase()))
    ?.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    ?.slice((pageNumber - 1) * 10, (pageNumber - 1) * 10 + 10);

  const setEditHandler = useCallback((id: string) => setEdit(id === edit ? '' : id), [edit]);
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
    </>
  );
};

interface Props {
  pageNumber: number;
  isWaitingRoomMode: boolean;
}

export default memo(PostsComponent);
