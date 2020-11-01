import React, { FC, memo, useCallback, useState, useEffect } from 'react';
import { Grid, Button } from '@material-ui/core';
import ReCAPTCHA from 'react-google-recaptcha';

import { useTranslation } from 'react-i18next';
import { useForm } from '../../../hooks/form/form-hook';
import { InputKeys } from '../../../hooks/form/state/interface';
import Message from '../../Shared/Form/Message';
import Title from '../../Shared/Form/Title';
import Places from '../../Shared/Form/Places';
import Levels from '../../Shared/Form/Levels';
import NestedCategories from '../../Shared/Form/NestedCategories';
import NewCategory from '../../Shared/Form/NewCategory';
import Gender from '../../Shared/Form/Gender';
import Dialog from '../../Shared/UIElements/Dialog/Dialog';
import { GOOGLE_RECAPTCHA } from '../../../constants/envs';
import { useFormSelector } from './selector-hook';
import { initialInputState } from '../../../hooks/form/state/initialState';
import {
  CatsStateInterface,
  nestedCategoriesToState,
  selectCatsIds,
  setCheckboxesStatus,
} from '../../../utils/preferences';
import { InputChangeEvent, SubmitEvent } from '../../../models/typescript-events';
import { useReduxDispatch } from '../../../store/helpers';
import { createPost } from '../../../store/waitingRoom/thunks/createPost';
import { cleanAlerts } from '../../../store/waitingRoom/action';

const formInputs = [
  InputKeys.Message,
  InputKeys.Recaptcha,
  InputKeys.Title,
  InputKeys.Place,
  InputKeys.Preferences,
  InputKeys.Levels,
  InputKeys.NewCategory,
  InputKeys.Gender,
];

export const SaveTaskFormComponent: FC<Props> = ({ setShowAddPost }) => {
  const dispatch = useReduxDispatch();
  const { cats, error, alert } = useFormSelector();
  const initialState = {
    place: { ...initialInputState, value: cats.places?.children[0].id, valid: true },
    levels: { ...initialInputState, value: cats.levels?.children[0].id, valid: true },
    gender: { ...initialInputState, value: cats.gender?.children[0].id, valid: true },
    newCategory: { ...initialInputState, valid: true },
  };
  const {
    state: { inputs, isFormValid },
    handlers: { inputChanged, recaptchaChanged },
  } = useForm(formInputs, false, initialState);
  const { t } = useTranslation();
  const [preferencesState, setPreferencesState] = useState<CatsStateInterface[]>(
    nestedCategoriesToState(cats.preferences, []),
  );

  const preferenceStateHandler = useCallback(
    (id: string, parentIndex: number) => {
      setPreferencesState((prevState) => {
        const newState = setCheckboxesStatus(id, parentIndex, prevState);
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

  const handleSubmit = (e: SubmitEvent): void => {
    const { levels, place, preferences, title, message, newCategory, gender } = inputs;
    e.preventDefault();
    const payload = {
      categories: [levels.value, place.value, gender.value, ...preferences.value],
      content: {
        title: title.value,
        content: message.value,
      },
      meta: {
        newCategory: newCategory.value,
      },
    };
    dispatch(createPost(payload));
  };

  useEffect(() => {
    if (!error && alert) {
      setShowAddPost(false);
      setTimeout(() => dispatch(cleanAlerts()), 1000);
    }
  }, [error, alert, setShowAddPost, dispatch]);

  return (
    <Dialog className="add-form" onClose={(): void => setShowAddPost(false)} title={t('Add post')}>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={3} alignItems="center">
          <Grid item xs={12}>
            <Title title={inputs?.title} inputChanged={inputChanged} />
            <Message
              message={inputs?.message}
              inputChanged={inputChanged}
              label={t('Post content')}
            />
          </Grid>
          <Grid item xs={12}>
            <Gender
              genders={cats.gender}
              gender={inputs?.gender.value}
              inputChanged={inputChanged}
            />
          </Grid>
          <Grid item xs={12}>
            <Places places={cats.places} place={inputs?.place.value} inputChanged={inputChanged} />
          </Grid>
          <Grid item xs={12}>
            <Levels levels={cats.levels} level={inputs?.levels.value} inputChanged={inputChanged} />
          </Grid>
          <Grid item xs={12}>
            {t('Preferences (min 2)')}:
            <Grid container spacing={0}>
              <NestedCategories cats={preferencesState} inputChanged={preferenceStateHandler} />
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <NewCategory newCategory={inputs?.newCategory} inputChanged={inputChanged} />
          </Grid>
          <Grid item xs={12}>
            <ReCAPTCHA sitekey={GOOGLE_RECAPTCHA} onChange={recaptchaChanged} />
          </Grid>
          <Grid item xs={12}>
            <Button
              type="submit"
              color="primary"
              disabled={!isFormValid}
              fullWidth
              variant="contained"
            >
              {t('Send')}
            </Button>
          </Grid>
        </Grid>
      </form>
    </Dialog>
  );
};

export interface Props {
  setShowAddPost: (show: boolean) => void;
}

export default memo(SaveTaskFormComponent);
