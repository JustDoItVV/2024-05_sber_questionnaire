import MockAdapter from 'axios-mock-adapter';
import { Provider } from 'react-redux';
import { withExtraArgument } from 'redux-thunk';

import { configureMockStore, MockStore } from '@jedmao/redux-mock-store';
import { Action } from '@reduxjs/toolkit';

import { createApiService } from '../services';
import { State } from '../types';
import { AppThunkDispatch } from './app-thunk-dispatch.type';

type ComponentWithMockStore = {
  withStoreComponent: JSX.Element;
  mockStore: MockStore;
  mockAxiosAdapter: MockAdapter;
};

export const withStore = (component: JSX.Element, initialState: Partial<State> = {}): ComponentWithMockStore => {
  const axios = createApiService();
  const mockAxiosAdapter = new MockAdapter(axios);
  const middleware = [withExtraArgument(axios)];
  const mockStoreCreator = configureMockStore<State, Action<string>, AppThunkDispatch>(middleware);
  const mockStore = mockStoreCreator(initialState);

  return {
    withStoreComponent: <Provider store={mockStore}> {component} </Provider>,
    mockStore,
    mockAxiosAdapter,
  };
}
