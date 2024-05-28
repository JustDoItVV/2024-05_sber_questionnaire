import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Answer, AppProcess, NameSpace, Question } from '../../../types';
import { fetchQuestions } from '../../api-actions/question-actions';

const initialState: AppProcess = {
  isLoading: false,
  questions: [],
  currentQuestion: 0,
  userAnswers: [],
  isFinished: false,
};

export const appProcess = createSlice({
  name: NameSpace.App,
  initialState,
  reducers: {
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setQuestions: (state, action: PayloadAction<Question[]>) => {
      state.questions = action.payload;
    },
    setCurrentQuestion: (state, action: PayloadAction<number>) => {
      state.currentQuestion = action.payload;
    },
    setUserAnswers: (state, action: PayloadAction<Answer[]>) => {
      state.userAnswers = action.payload;
    },
    setIsFinished: (state, action: PayloadAction<boolean>) => {
      state.isFinished = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchQuestions.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchQuestions.fulfilled, (state, action) => {
        state.questions = action.payload[0];
        state.isLoading = false;
      })
      .addCase(fetchQuestions.rejected, (state) => {
        state.isLoading = false;
      })
      ;
  },
});

export const {
  setIsLoading,
  setQuestions,
  setCurrentQuestion,
  setUserAnswers,
  setIsFinished,
} = appProcess.actions;
