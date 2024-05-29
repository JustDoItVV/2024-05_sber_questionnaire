

import { makeFakeState } from '../../../test-mocks/test-mocks';
import { NameSpace } from '../../../types';
import {
    selectCurrentQuestion, selectIsLoading, selectQuestions, selectUserAnswers
} from './app-process.selector';

describe('AppProcess selectors', () => {
  const state = makeFakeState();

  test('should return "isLoading" from state', () => {
    const expected = state[NameSpace.App].isLoading;

    const result = selectIsLoading(state);

    expect(result).toBe(expected);
  });

  test('should return "questions" from state', () => {
    const expected = state[NameSpace.App].questions;

    const result = selectQuestions(state);

    expect(result).toEqual(expected);
  });

  test('should return "currentQuestion" from state', () => {
    const expected = state[NameSpace.App].currentQuestion;

    const result = selectCurrentQuestion(state);

    expect(result).toBe(expected);
  });

  test('should return "userAnswers" from state', () => {
    const expected = state[NameSpace.App].userAnswers;

    const result = selectUserAnswers(state);

    expect(result).toEqual(expected);
  });
});
