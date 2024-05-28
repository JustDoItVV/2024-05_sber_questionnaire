import './App.css';

import { useState } from 'react';

import FormQuestion from './components/form-question/form-question';
import FormStart from './components/form-start/form-start';
import Results from './components/results/results';
import { useAppSelector } from './hooks';
import { selectQuestions, selectUserAnswers } from './storage';
import { Answer } from './types';

export default function App() {
  const questions = useAppSelector(selectQuestions);
  const userAnswers = useAppSelector(selectUserAnswers);
  const [, setCorrectAnswers] = useState<Answer[]>([]);

  if (questions.length === 0) {
    return <FormStart setCorrectAnswers={setCorrectAnswers} />;
  }

  if (userAnswers.length < questions.length) {
    return <FormQuestion />;
  }

  return <Results />;
}
