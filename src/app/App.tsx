import './App.css';

import { useEffect, useState } from 'react';

import FormQuestion from './components/form-question/form-question';
import FormStart from './components/form-start/form-start';
import Results from './components/results/results';
import { useAppSelector } from './hooks';
import { selectIsFinished, selectQuestions } from './storage';
import { Answer } from './types';

export default function App() {
  const questions = useAppSelector(selectQuestions);
  const isFinished = useAppSelector(selectIsFinished);
  const [correctAnswers, setCorrectAnswers] = useState<Answer[]>([]);

  useEffect(() => {
    console.log(correctAnswers);
  }, [correctAnswers]);

  if (questions.length === 0) {
    return <FormStart setCorrectAnswers={setCorrectAnswers} />;
  }

  if (!isFinished) {
    return <FormQuestion />;
  }

  return <Results />;
}
