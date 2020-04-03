import { useCallback, useEffect, useState } from 'react';
import { LocalStorage } from '../models/local-storage';
import { AuthContextInterface } from '../context/auth-context';

let logoutTimer: number;

export const useAuth = (): AuthContextInterface => {
  const [token, setToken] = useState<string>(null);
  const [tokenExpirationDate, setTokenExpirationDate] = useState<Date>(null);
  const [storageId, setStorageId] = useState<string>(null);

  const login = useCallback((userId, userToken, expirationDate?: any) => {
    const expiration = expirationDate || new Date(new Date().getTime() + 1000 * 60 * 60);
    setToken(userToken);
    setTokenExpirationDate(expiration);
    window.localStorage.setItem(
      LocalStorage.UserData,
      JSON.stringify({
        token: userToken,
        storageId: userId,
        expiration: expiration.toISOString(),
      }),
    );
    setStorageId(userId);
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setTokenExpirationDate(null);
    setStorageId(null);
    window.localStorage.removeItem(LocalStorage.UserData);
  }, []);

  useEffect(() => {
    if (token && tokenExpirationDate) {
      const remainingTime = tokenExpirationDate.getTime() - new Date().getTime();
      logoutTimer = window.setTimeout(logout, remainingTime);
    } else {
      window.clearTimeout(logoutTimer);
    }
  }, [token, logout, tokenExpirationDate]);

  useEffect(() => {
    const userData = JSON.parse(window.localStorage.getItem(LocalStorage.UserData) || '{}');
    if (userData?.token && new Date(userData.expiration) > new Date()) {
      login(userData.storageId, userData.token, new Date(userData.expiration));
    }
  }, [login]);

  return { token, login, logout, storageId };
};
