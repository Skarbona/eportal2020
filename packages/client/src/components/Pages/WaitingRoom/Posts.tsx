import React, { FC, memo, useState, useCallback } from 'react';

import { usePostsSelector } from './selector-hook';
import Post from './Post';

export const PostsComponent: FC<Props> = ({ pageNumber }) => {
  const { posts, allCatsMap, cats, isAdmin } = usePostsSelector(pageNumber);
  const [edit, setEdit] = useState<string>('');

  const setEditHandler = useCallback((id: string) => setEdit(id === edit ? '' : id), [edit]);
  return (
    <>
      {cats.preferences &&
        posts?.map((post) => (
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
}

export default memo(PostsComponent);
