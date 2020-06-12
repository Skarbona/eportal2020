import { renderHook, act } from '@testing-library/react-hooks';
import axios from 'axios';

import { useFetch } from '../../hooks/fetch';
import { AlertTypes } from '../../models/alerts';

describe('useFetch hook', () => {
  it('it should return all required items', () => {
    const {
      result: { current },
    } = renderHook(() => useFetch());
    expect(current.isLoading).toEqual(false);
    expect(current.alert).toEqual(null);
    expect(current.send).toBeDefined();
    expect(current.clearAlert).toBeDefined();
  });

  it.skip('it should return all required items', async () => {
    // TODO: Resolve testing of hooks
    const {
      result: { current },
      waitForNextUpdate,
    } = renderHook(() => useFetch());
    const axiosSpy = jest.spyOn(axios, 'get').mockImplementation(() => Promise.resolve({}));

    await act(async () => {
      await current.send({ url: '/placeholder', successAlert: AlertTypes.SuccessEmail });
    });

    await waitForNextUpdate();

    expect(axiosSpy).toHaveBeenCalled();
    expect(current.isLoading).toEqual(false);
    expect(current.alert).toEqual(AlertTypes.SuccessEmail);
  });
});
