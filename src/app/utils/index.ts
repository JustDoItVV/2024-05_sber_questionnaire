import { TinyColor } from '@ctrl/tinycolor';

import { DifficultySortMap } from '../const';
import { Question, SortOption } from '../types';

export const sortQuestionsHelper = (sorter: SortOption) =>
  (a: Question, b: Question) => {
    if (sorter === SortOption.Asc) {
      return DifficultySortMap[a.difficulty] - DifficultySortMap[b.difficulty];
    } else {
      return DifficultySortMap[b.difficulty] - DifficultySortMap[a.difficulty];
    }
  };

export const isCorrectAnswer = (question: Question) => {
  if (question.userAnswers && question.correctAnswer && Array.isArray(question.correctAnswer)) {
    return question.correctAnswer.every((value, index) => question.userAnswers ? value === question.userAnswers[index] : false);
  }
  return false;
};

export const getHoverColors = (colors: string[]) =>
  colors.map((color) => new TinyColor(color).lighten(5).toString());
export const getActiveColors = (colors: string[]) =>
  colors.map((color) => new TinyColor(color).darken(5).toString());
