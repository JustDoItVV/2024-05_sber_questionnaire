import './form-question.css';

import { Button, ConfigProvider, Form, Progress } from 'antd';
import { useState } from 'react';

import { BUTTON_NEXT_COLORS } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks';
import {
  selectCurrentQuestion, selectQuestions, selectUserAnswers, setCurrentQuestion, setUserAnswers
} from '../../storage';
import { getActiveColors, getHoverColors } from '../../utils';
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
    <Form
      className='form-question__container'
      onFinish={handleNextButtonClick}
    >
      <Progress percent={currentQuestion / questions.length * 100} />
      <CardQuestion
        question={questions[currentQuestion]}
        questionNumber={currentQuestion}
        setAnswers={setAnswers}
      />
      <ConfigProvider
        theme={{
          components: {
            Button: {
              colorPrimary: `linear-gradient(135deg, ${BUTTON_NEXT_COLORS.join(', ')})`,
              colorPrimaryHover: `linear-gradient(135deg, ${getHoverColors(BUTTON_NEXT_COLORS).join(', ')})`,
              colorPrimaryActive: `linear-gradient(135deg, ${getActiveColors(BUTTON_NEXT_COLORS).join(', ')})`,
              lineWidth: 0,
            },
          },
        }}
      >
        <Button
          type='primary'
          htmlType='submit'
          disabled={!answers.length}
          size='large'
        >
          Next
        </Button>
      </ConfigProvider>
    </Form>
  );
}
