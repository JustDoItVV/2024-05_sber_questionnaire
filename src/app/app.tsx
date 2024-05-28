import './app.css';

import { useState } from 'react';

import FormQuestion from './components/form-question/form-question';
import FormStart from './components/form-start/form-start';
import Results from './components/results/results';
import { useAppSelector } from './hooks';
import { selectQuestions, selectUserAnswers } from './storage';
import { Answer, SortOption } from './types';
import { sortQuestionsHelper } from './utils';

export default function App() {
  const questions = useAppSelector(selectQuestions);
  const userAnswers = useAppSelector(selectUserAnswers);
  const [correctAnswers, setCorrectAnswers] = useState<Answer[]>([]);

  if (questions.length === 0) {
    return <FormStart setCorrectAnswers={setCorrectAnswers} />;
  }

  if (userAnswers.length < questions.length) {
    return <FormQuestion />;
  }

  const mergedQuestions = questions.map((question, index) => ({
    ...question,
    userAnswers: userAnswers[index].answers,
    correctAnswer: correctAnswers[index].answers,
  }));
  mergedQuestions.sort(sortQuestionsHelper(SortOption.Asc));

  return <Results questions={mergedQuestions} />;
}
