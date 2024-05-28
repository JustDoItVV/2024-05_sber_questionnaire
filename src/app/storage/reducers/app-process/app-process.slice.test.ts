import { faker } from '@faker-js/faker';

import { QuestionsCount } from '../../../const';
import { makeFakeAnswers, makeFakeQuestions } from '../../../test-mocks';
import { AppProcess } from '../../../types';
import {
    appProcess, reset, setCurrentQuestion, setIsLoading, setQuestions, setUserAnswers
} from './app-process.slice';

describe('AppProcess slice', () => {
  const initialState: AppProcess = {
    isLoading: false,
    questions: [],
    currentQuestion: 0,
    userAnswers: [],
  };

  test('should return initial state with empty action', () => {
    const emptyAction = { type: '' };

    const result = appProcess.reducer(initialState, emptyAction);

    expect(result).toEqual(initialState);
  });

  test('should return default initial state with empty action und undefined initial state argument', () => {
    const emptyAction = { type: '' };

    const result = appProcess.reducer(undefined, emptyAction);

    expect(result).toEqual(initialState);
  });

  test('should set "isLoading" to boolean in state', () => {
    const expected = Math.random() < 0.5;

    const result = appProcess.reducer(undefined, setIsLoading(expected));

    expect(result.isLoading).toBe(expected);
  });

  test('should set "questions" to questions array in state', () => {
    const expected = makeFakeQuestions(QuestionsCount.Default);

    const result = appProcess.reducer(undefined, setQuestions(expected));

    expect(result.questions).toEqual(expected);
  });

  test('should set "currentQuestion" to number in state', () => {
    const expected = faker.number.int({ min: QuestionsCount.Min, max: QuestionsCount.Max });

    const result = appProcess.reducer(undefined, setCurrentQuestion(expected));

    expect(result.currentQuestion).toBe(expected);
  });

  test('should set "userAnswers" to answers array in state', () => {
    const expected = makeFakeAnswers(5);

    const result = appProcess.reducer(undefined, setUserAnswers(expected));

    expect(result.userAnswers).toEqual(expected);
  });

  test('should return initial state with reset action', () => {
    const result = appProcess.reducer(initialState, reset());

    expect(result).toEqual(initialState);
  });
});
