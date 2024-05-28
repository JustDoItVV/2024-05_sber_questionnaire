import { Action, ThunkDispatch } from '@reduxjs/toolkit';

import { createApiService } from '../services/api';
import { State } from '../types';

export type AppThunkDispatch = ThunkDispatch<State, ReturnType<typeof createApiService>, Action>;
