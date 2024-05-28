import { Button, Form, Progress } from 'antd';
import { useState } from 'react';

import { useAppDispatch, useAppSelector } from '../../hooks';
import {
  selectCurrentQuestion, selectQuestions, selectUserAnswers, setCurrentQuestion, setUserAnswers
} from '../../storage';
import CardQuestion from '../card-question/card-question';

export default function FormQuestion(): JSX.Element {
  const dispatch = useAppDispatch();
  const questions = useAppSelector(selectQuestions);
  const currentQuestion = useAppSelector(selectCurrentQuestion);
  const userAnswers = useAppSelector(selectUserAnswers);
  const [answers, setAnswers] = useState<string[]>([])

  const handleNextButtonClick = () => {
    dispatch(setUserAnswers([...userAnswers, { question: questions[currentQuestion].question, answers }]))
    dispatch(setCurrentQuestion(currentQuestion + 1));
    setAnswers([]);
  };

  return (
    <Form onFinish={handleNextButtonClick}>
      <Progress percent={currentQuestion / questions.length * 100} />
      <CardQuestion
        question={questions[currentQuestion]}
        questionNumber={currentQuestion}
        setAnswers={setAnswers}
      />
      <Button
        htmlType='submit'
        disabled={!answers.length}
      >
        Next
      </Button>
    </Form>
  );
}
