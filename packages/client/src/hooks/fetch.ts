import { useState, useCallback } from 'react';
import axios, { AxiosResponse } from 'axios';

import { AlertTypes } from '../models/alerts';
import { BACKEND_API } from '../constants/envs';

interface ReturnProps {
  isLoading: boolean;
  alert: AlertTypes;
  send(props: Send): void;
  clearAlert(): void;
}

export const useFetch = (): ReturnProps => {
  const [isLoading, setLoadingStatus] = useState<boolean>(false);
  const [alert, setAlert] = useState<AlertTypes>(null);

  const send = useCallback(
    async ({
      url,
      method = 'get',
      body = null,
      headers = {},
      successAlert = AlertTypes.Success,
      errorAlert = AlertTypes.ServerError,
    }: Send): Promise<AxiosResponse> => {
      setLoadingStatus(true);
      try {
        const request = method === 'get' ? axios.get : axios.post;
        const response = await request(`${BACKEND_API}/${url}`, body, { headers });
        setLoadingStatus(false);
        setAlert(successAlert);
        return response;
      } catch (e: any) {
        setLoadingStatus(false);
        setAlert(errorAlert);
        return e;
      }
    },
    [],
  );

  const clearAlert = useCallback(() => setAlert(null), []);

  return { isLoading, alert, send, clearAlert };
};

interface Send {
  url: string;
  method?: 'get' | 'post';
  body?: any;
  headers?: any;
  successAlert?: AlertTypes;
  errorAlert?: AlertTypes;
}
