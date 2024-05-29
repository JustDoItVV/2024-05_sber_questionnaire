/* eslint-disable @typescript-eslint/no-unused-vars */
import '@testing-library/jest-dom';

import MockAdapter from 'axios-mock-adapter';
import { SetStateAction } from 'react';

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { API_URL } from '../../const';
import * as Storage from '../../storage';
import { makeFakeQuestionsResponse, makeFakeState, withStore } from '../../test-mocks';
import { Answer, State } from '../../types';
import FormStart from './form-start';

const mockSetCorrectAnswers = jest.fn((_value: SetStateAction<Answer[]>) => { });
jest.mock('../../storage', () => ({
  ...jest.requireActual('../../storage'),
  __esModule: true,
}));
jest.spyOn(Storage, 'fetchQuestions');

describe('Component FormStart', () => {
  let mockState: State;
  let withStoreComponent: JSX.Element;
  let mockAxiosAdapter: MockAdapter;

  beforeEach(() => {
    mockState = makeFakeState();
    const withStoreResult = withStore(
      <FormStart setCorrectAnswers={mockSetCorrectAnswers} />,
      mockState,
    );
    withStoreComponent = withStoreResult.withStoreComponent;
    mockAxiosAdapter = withStoreResult.mockAxiosAdapter;
  });

  test('should render correctly', () => {
    render(withStoreComponent);

    expect(screen.queryByText('Questionnaire')).toBeInTheDocument();
    expect(screen.queryByText('Questions count')).toBeInTheDocument();
    expect(screen.queryByText('Category')).toBeInTheDocument();
    expect(screen.queryByText('Difficulty')).toBeInTheDocument();
    expect(screen.queryByText('Questions type')).toBeInTheDocument();
    expect(screen.queryByText('Start')).toBeInTheDocument();
  });

  test('should call fetchQuestions when form submit', async () => {
    mockAxiosAdapter.onGet(new RegExp(`${API_URL}&(.*)`)).reply(200, makeFakeQuestionsResponse(5));

    render(withStoreComponent);
    await userEvent.click(screen.getByText('Start'));

    expect(Storage.fetchQuestions).toHaveBeenCalled();
  });
});
