import { AxiosError, AxiosInstance } from 'axios';
import { stringify } from 'qs';
import { toast } from 'react-toastify';

import { createAsyncThunk } from '@reduxjs/toolkit';

import { API_URL } from '../../const';
import {
  Answer, ApiQueryParams, ApiQuestionResponse, AppDispatch, Question, State
} from '../../types';

export const fetchQuestions = createAsyncThunk<
  [Question[], Answer[]],
  ApiQueryParams,
  { dispatch: AppDispatch; state: State; extra: AxiosInstance }
>('app/fetchQuestions', async (queryParams, { extra: api }) => {
  try {


    const { data } = await api.get<ApiQuestionResponse>(`${API_URL}?${stringify(queryParams)}`);
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
  } catch (error) {
    if (error instanceof AxiosError) {
      toast(error.message, { type: 'error' });
    }
    return [[], []];
  }
});
