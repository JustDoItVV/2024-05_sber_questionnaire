import MockAdapter from 'axios-mock-adapter';
import { withExtraArgument } from 'redux-thunk';

import { configureMockStore } from '@jedmao/redux-mock-store';
import { Action } from '@reduxjs/toolkit';

import { API_URL } from '../../const';
import { createApiService } from '../../services';
import {
    AppThunkDispatch, extractActionsTypes, makeFakeQueryParams, makeFakeQuestionsResponse,
    makeFakeState
} from '../../test-mocks';
import { State } from '../../types';
import { fetchQuestions } from './question-actions';

describe('Api question actions', () => {
  const axios = createApiService();
  const mockAxiosAdapter = new MockAdapter(axios);
  const middleware = [withExtraArgument(axios)];
  const mockStoreCreator = configureMockStore<State, Action<string>, AppThunkDispatch>(middleware);
  let store: ReturnType<typeof mockStoreCreator>;

  beforeEach(() => {
    store = mockStoreCreator(makeFakeState());
  });

  test('should dispatch "app/fetchQuestions/pending", "app/fetchQuestions/fulfilled" with server response 200', async () => {
    const mockData = makeFakeQuestionsResponse(5);
    mockAxiosAdapter.onGet(new RegExp(`${API_URL}&(.*)`)).reply(200, mockData);

    await store.dispatch(fetchQuestions(makeFakeQueryParams()));
    const emittedActions = store.getActions();
    const actionsTypes = extractActionsTypes(emittedActions);

    expect(actionsTypes).toEqual([
      fetchQuestions.pending.type,
      fetchQuestions.fulfilled.type,
    ]);
  });

  test('should dispatch "app/fetchQuestions/pending", "app/fetchQuestions/fulfilled" with server response 429', async () => {
    const mockData = makeFakeQuestionsResponse(5);
    mockAxiosAdapter.onGet(new RegExp(`${API_URL}&(.*)`)).reply(429, mockData);

    await store.dispatch(fetchQuestions(makeFakeQueryParams()));
    const emittedActions = store.getActions();
    const actionsTypes = extractActionsTypes(emittedActions);

    expect(actionsTypes).toEqual([
      fetchQuestions.pending.type,
      fetchQuestions.fulfilled.type,
    ]);
  });
});
