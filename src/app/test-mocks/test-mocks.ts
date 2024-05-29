
import { faker } from '@faker-js/faker';

import { QuestionsCount } from '../const';
import {
  Answer, ApiQueryParams, ApiQuestionResponse, Difficulty, NameSpace, Question, QuestionType,
  State
} from '../types';

export const makeFakeQuestion = (): Question => {
  const options = [faker.animal.type(), faker.color.human()];

  const types = Object.values(QuestionType);
  types.splice(types.indexOf(QuestionType.Any), 1);

  const difficulties = Object.values(Difficulty);
  difficulties.splice(difficulties.indexOf(Difficulty.Any), 1);

  return {
    type: faker.helpers.arrayElement(types) as QuestionType,
    difficulty: faker.helpers.arrayElement(difficulties) as Difficulty,
    category: faker.animal.type(),
    question: faker.commerce.product(),
    options,
    correctAnswer: options[0],
    incorrectAnswers: [options[1]],
  }
};

export const makeFakeAnswer = (): Answer => {
  return {
    question: faker.commerce.productDescription(),
    answers: [faker.animal.type()],
  };
};

export const makeFakeQuestions = (count: number): Question[] => {
  const responseQuestions: Question[] = [];

  for (let i = 0; i < count; i++) {
    responseQuestions.push(makeFakeQuestion());
  }

  return responseQuestions;
}

export const makeFakeAnswers = (count: number): Answer[] => {
  const answers: Answer[] = [];

  for (let i = 0; i < count; i++) {
    answers.push(makeFakeAnswer());
  }

  return answers;
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
