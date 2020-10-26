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
import { savePosts } from '../../../store/waitingRoom/thunks/savePosts';

const formInputs = [
  InputKeys.Message,
  InputKeys.Recaptcha,
  InputKeys.Title,
  InputKeys.Place,
  InputKeys.Preferences,
  InputKeys.Levels,
];

export const SaveTaskFormComponent: FC<Props> = ({ setShowAddPost }) => {
  const dispatch = useReduxDispatch();
  const { cats, error, alert } = useFormSelector();
  const initialState = {
    place: { ...initialInputState, value: cats.places?.children[0].id, valid: true },
    levels: { ...initialInputState, value: cats.levels?.children[0].id, valid: true },
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

  const handleSubmit = (e: SubmitEvent) => {
    e.preventDefault();
    const payload = {
      categories: [inputs.levels.value, inputs.place.value, ...inputs.preferences.value],
      content: {
        title: inputs.title.value,
        content: inputs.message.value,
      },
    };
    dispatch(savePosts(payload));
  };

  useEffect(() => {
    if (!error && alert) {
      setShowAddPost(false);
    }
  }, [error, alert, setShowAddPost]);

  return (
    <form onSubmit={handleSubmit} className="inputs-for-light-bg">
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
          <Places places={cats.places} place={inputs?.place.value} inputChanged={inputChanged} />
        </Grid>
        <Grid item xs={12}>
          <Levels levels={cats.levels} level={inputs?.levels.value} inputChanged={inputChanged} />
        </Grid>
        <Grid item xs={12}>
          <NestedCategories cats={preferencesState} inputChanged={preferenceStateHandler} />
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
            Send
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

interface Props {
  setShowAddPost: (show: boolean) => void;
}

export default memo(SaveTaskFormComponent);
