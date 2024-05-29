import axios, { AxiosInstance } from 'axios';
import applyCaseMiddleware from 'axios-case-converter';

import { API_URL, REQUEST_TIMEOUT } from '../const';

export const createApiService = (): AxiosInstance => {
  let api = axios.create({
    baseURL: API_URL,
    timeout: REQUEST_TIMEOUT,
  });

  api = applyCaseMiddleware(api);

  return api;
};
