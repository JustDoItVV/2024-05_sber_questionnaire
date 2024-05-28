import { Answer, NameSpace, Question, State } from '../../../types';

export const selectIsLoading = (state: Pick<State, NameSpace.App>): boolean =>
  state[NameSpace.App].isLoading;
export const selectQuestions = (state: Pick<State, NameSpace.App>): Question[] =>
  state[NameSpace.App].questions;
export const selectCurrentQuestion = (state: Pick<State, NameSpace.App>): number =>
  state[NameSpace.App].currentQuestion;
export const selectUserAnswers = (state: Pick<State, NameSpace.App>): Answer[] =>
  state[NameSpace.App].userAnswers;
