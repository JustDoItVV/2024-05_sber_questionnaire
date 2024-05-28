import { AxiosInstance } from 'axios';

import { createAsyncThunk } from '@reduxjs/toolkit';

import { API_URL } from '../../const';
import { Answer, ApiQuestionResponse, AppDispatch, Question, State } from '../../types';

export const fetchQuestions = createAsyncThunk<
  [Question[], Answer[]],
  undefined,
  { dispatch: AppDispatch; state: State; extra: AxiosInstance }
>('app/fetchQuestions', async (_, { extra: api }) => {
  const { data } = await api.get<ApiQuestionResponse>(API_URL);
  const questions: Question[] = [];
  const correctAnswers: Answer[] = [];

  data.results.forEach((item) => {
    const question: Question = { ...item };
    delete question.correctAnswer;
    delete question.incorrectAnswers;
    const answer: Answer = { question: item.question, answers: [] };

    if (Array.isArray(item.correctAnswer)) {
      question.options = [...item.correctAnswer, ...item.incorrectAnswers!].sort();
      answer.answers = item.correctAnswer;
    } else {
      question.options = [item.correctAnswer!, ...item.incorrectAnswers!].sort();
      answer.answers = [item.correctAnswer!];
    }

    questions.push(question);
    correctAnswers.push(answer);
  });

  return [questions, correctAnswers];
});
