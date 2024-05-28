
import { faker } from '@faker-js/faker';

import { QuestionsCount } from '../const';
import {
    ApiQueryParams, ApiQuestionResponse, Difficulty, NameSpace, Question, QuestionType, State
} from '../types';

export const makeFakeQuestion = (): Question => {
  const options = [faker.animal.type(), faker.color.human()];

  return {
    type: faker.helpers.arrayElement(Object.values(QuestionType)) as QuestionType,
    difficulty: faker.helpers.arrayElement(Object.values(Difficulty)) as Difficulty,
    category: faker.animal.type(),
    question: faker.commerce.product(),
    options,
    correctAnswer: options[0],
    incorrectAnswers: [options[1]],
  }
};

export const makeFakeQuestions = (count: number): Question[] => {
  const responseQuestions: Question[] = [];

  for (let i = 0; i < count; i++) {
    responseQuestions.push(makeFakeQuestion());
  }

  return responseQuestions;
}

export const makeFakeQuestionsResponse = (count: number): ApiQuestionResponse => {
  return {
    responseCode: 0,
    results: makeFakeQuestions(count),
  };
};

export const makeFakeQueryParams = (): ApiQueryParams => {
  return {
    amount: faker.number.int({ min: QuestionsCount.Min, max: QuestionsCount.Max }),
    category: undefined,
    difficulty: undefined,
    type: undefined,
  };
};

export const makeFakeState = (): State => {
  return {
    [NameSpace.App]: {
      isLoading: false,
      questions: makeFakeQuestions(5),
      currentQuestion: 0,
      userAnswers: [],
    },
  };
};
