import { configureStore } from '@reduxjs/toolkit';

import { createApiService } from '../services/api';
import { rootReducer } from './reducers/root-reducer';

export const api = createApiService();

export const frontendStorage = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: { extraArgument: api },
    }),
});
