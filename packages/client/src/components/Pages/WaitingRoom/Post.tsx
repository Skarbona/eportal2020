import React, { FC, memo, useCallback, useState, useMemo } from 'react';
import { Grid, Typography, Chip, ButtonGroup, Button } from '@material-ui/core';
import {
  Archive as ArchiveIcon,
  Check as CheckIcon,
  Edit as EditIcon,
  Send as SendIcon,
} from '@material-ui/icons';
import { formatDistanceToNow } from 'date-fns';
// eslint-ignore-next-line Eslint try to combine imports, what not working in this case
import { enGB, pl } from 'date-fns/locale';
import { useTranslation } from 'react-i18next';

import { LANGUAGE } from '../../../constants/envs';
import { PostResponseInterface } from '../../../../../service/src/models/shared-interfaces/post';
import Title from '../../Shared/Form/Title';
import Message from '../../Shared/Form/Message';
import NestedCategories from '../../Shared/Form/NestedCategories';
import Places from '../../Shared/Form/Places';
import Levels from '../../Shared/Form/Levels';
import Gender from '../../Shared/Form/Gender';
import { useForm } from '../../../hooks/form/form-hook';
import { InputKeys } from '../../../hooks/form/state/interface';
import { initialInputState } from '../../../hooks/form/state/initialState';
import {
  CatsStateInterface,
  nestedCategoriesToState,
  selectCatsIds,
  setCheckboxesStatus,
} from '../../../utils/preferences';
import { InputChangeEvent, SubmitEvent } from '../../../models/typescript-events';
import { CategoriesStateInterface } from '../../../store/categories/initialState.interface';
import { savePost } from '../../../store/waitingRoom/thunks/savePost';
import { useReduxDispatch } from '../../../store/helpers';
import { PostStatus } from '../../../models/posts';

const formInputs = [
  InputKeys.Title,
  InputKeys.Message,
  InputKeys.Place,
  InputKeys.Levels,
  InputKeys.Preferences,
  InputKeys.Gender,
];

export const PostComponent: FC<Props> = ({ cats, post, edit, setEdit, allCatsMap, isAdmin }) => {
  const dispatch = useReduxDispatch();
  const { id, content, author, date, categories } = post;
  const initialState = useMemo(() => {
    const placeId = categories.find((cat) =>
      cats.places.children.find((place) => place.id === cat),
    );
    const levelId = categories.find((cat) =>
      cats.levels.children.find((level) => level.id === cat),
    );
    const genderId = categories.find((cat) => cats.gender.children.find((gen) => gen.id === cat));
    const preferencesId = categories.filter((cat) => ![placeId, levelId].includes(cat));
    return {
      title: { ...initialInputState, value: content.title, valid: true },
      message: { ...initialInputState, value: content.content, valid: true },
      place: {
        ...initialInputState,
        value: placeId,
        valid: true,
      },
      gender: {
        ...initialInputState,
        value: genderId,
        valid: true,
      },
      levels: {
        ...initialInputState,
        value: levelId,
        valid: true,
      },
      preferences: {
        ...initialInputState,
        value: preferencesId,
        valid: true,
      },
    }; // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const { t } = useTranslation();
  const {
    handlers: { inputChanged },
    state: { inputs },
  } = useForm(formInputs, true, initialState);
  const [preferencesState, setPreferencesState] = useState<CatsStateInterface[]>(
    nestedCategoriesToState(cats.preferences, categories),
  );

  const preferenceStateHandler = useCallback(
    (preferenceId: string, parentIndex: number) => {
      setPreferencesState((prevState) => {
        const newState = setCheckboxesStatus(preferenceId, parentIndex, prevState);
        const [includedCats] = selectCatsIds(newState);
        const eventMock = ({
          target: { value: includedCats, name: 'preferences' },
        } as unknown) as InputChangeEvent;
        inputChanged(eventMock);
        return newState;
      });
    },
    [inputChanged],
  );

  const handleSubmit = async (e: SubmitEvent): Promise<void> => {
    e.preventDefault();
    const payload = {
      id,
      categories: [
        inputs.levels.value,
        inputs.place.value,
        inputs.gender.value,
        ...inputs.preferences.value,
      ],
      content: {
        title: inputs.title.value,
        content: inputs.message.value,
      },
    };
    await dispatch(savePost(payload));
    setEdit('');
  };

  const actionHandler = useCallback(
    (status) => {
      const payload = {
        id,
        status,
      };
      dispatch(savePost(payload));
    },
    [id, dispatch],
  );

  return (
    <form className="inputs-for-light-bg" onSubmit={handleSubmit}>
      <Grid item xs={12}>
        <Grid container spacing={3} className="task-content">
          <Grid item xs={12} md={8}>
            <Typography variant="h2" color="primary" className="task-title">
              {edit !== id ? (
                <span dangerouslySetInnerHTML={{ __html: content?.title }} />
              ) : (
                <Title title={inputs.title} inputChanged={inputChanged} />
              )}
              <Typography color="secondary">
                {t('Created by')} <b>{author.name}</b> (
                {formatDistanceToNow(new Date(date), {
                  locale: LANGUAGE === 'pl' ? pl : enGB,
                })}
                ) {edit === id && id}
              </Typography>
            </Typography>
          </Grid>
          {isAdmin && (
            <Grid item xs={12} md={4}>
              <ButtonGroup variant="contained" color="primary">
                {edit === id && (
                  <Button
                    type="submit"
                    color="primary"
                    startIcon={<SendIcon />}
                    className="success-button"
                  >
                    {t('Save')}
                  </Button>
                )}
                <Button color="primary" startIcon={<EditIcon />} onClick={(): void => setEdit(id)}>
                  {edit === id ? t('Close') : t('Edit')}
                </Button>
                <Button
                  onClick={(): void => actionHandler(PostStatus.Publish)}
                  disabled={edit === id}
                  startIcon={<CheckIcon />}
                  className="success-button"
                >
                  {t('Approve')}
                </Button>
                <Button
                  onClick={(): void => actionHandler(PostStatus.Archival)}
                  disabled={edit === id}
                  color="primary"
                  className="error-button"
                  startIcon={<ArchiveIcon />}
                >
                  {t('Remove')}
                </Button>
              </ButtonGroup>
            </Grid>
          )}
          <Grid item xs={12}>
            {edit !== id ? (
              <Typography dangerouslySetInnerHTML={{ __html: content?.content }} color="primary" />
            ) : (
              <Message message={inputs.message} inputChanged={inputChanged} />
            )}
          </Grid>
          {post.meta?.newCategory && (
            <Grid item xs={12}>
              {t('Proposal of new preference')}: {post.meta.newCategory}
            </Grid>
          )}
          {edit === id && (
            <>
              <Grid item xs={12}>
                <Gender
                  genders={cats.gender}
                  gender={inputs?.gender.value}
                  inputChanged={inputChanged}
                />
              </Grid>
              <Grid item xs={12}>
                <Places
                  places={cats.places}
                  place={inputs?.place.value}
                  inputChanged={inputChanged}
                />
              </Grid>
              <Grid item xs={12}>
                <Levels
                  levels={cats.levels}
                  level={inputs?.levels.value}
                  inputChanged={inputChanged}
                />
              </Grid>
            </>
          )}
          <Grid item xs={12} className="categories-badges">
            {edit !== id &&
              categories?.map((cat) => (
                <Chip key={cat} size="small" color="primary" label={allCatsMap?.get(cat)} />
              ))}
            {edit === id && (
              <Grid container spacing={0}>
                <NestedCategories cats={preferencesState} inputChanged={preferenceStateHandler} />
              </Grid>
            )}
          </Grid>
        </Grid>
      </Grid>
    </form>
  );
};

export interface Props {
  post: PostResponseInterface;
  edit: string;
  setEdit: (editId: string) => void;
  allCatsMap: Map<string, string>;
  cats: CategoriesStateInterface['categories'];
  isAdmin: boolean;
}

export default memo(PostComponent);
