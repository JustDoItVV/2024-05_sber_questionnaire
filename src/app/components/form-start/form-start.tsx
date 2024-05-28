import { Button, Form, FormProps, Select, Slider } from 'antd';
import { Dispatch, SetStateAction, useState } from 'react';

import { unwrapResult } from '@reduxjs/toolkit';

import { ApiCategoryMap, QuestionsCount } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { fetchQuestions, selectIsLoading } from '../../storage';
import { Answer, ApiQueryParams, Difficulty, QuestionType } from '../../types';

type FormStartProps = {
  setCorrectAnswers: Dispatch<SetStateAction<Answer[]>>;
};

export default function FormStart({ setCorrectAnswers }: FormStartProps): JSX.Element {
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(selectIsLoading);
  const [questionsCount, setQuestionsCount] = useState<number>(QuestionsCount.Default);

  const handleFormSubmit: FormProps<ApiQueryParams>['onFinish'] = async (values) => {
    values.category = values.category === ApiCategoryMap.any ? undefined : values.category;
    values.difficulty = values.difficulty === Difficulty.Any ? undefined : values.difficulty;
    values.type = values.type === QuestionType.Any ? undefined : values.type;
    const [, correctAnswers] = unwrapResult(await dispatch(fetchQuestions(values)));
    setCorrectAnswers(correctAnswers);
  };

  const handleSliderChange = (value: number) => {
    setQuestionsCount(value);
  };

  const hadndleStartButtonClick = () => { };

  return (
    <Form onFinish={handleFormSubmit}>
      <h1>Questionnaire</h1>
      <p>Sber test task</p>
      <h3>Questions count</h3>
      <Form.Item name='amount' label={questionsCount} initialValue={QuestionsCount.Default}>
        <Slider
          min={QuestionsCount.Min}
          max={QuestionsCount.Max}
          onChange={handleSliderChange}
        />
      </Form.Item>
      <h3>Category</h3>
      <Form.Item name='category' initialValue={'Any'} >
        <Select
          options={Object.entries(ApiCategoryMap).map(
            ([key, value]) => ({ value: key, label: value })
          )}
        />
      </Form.Item>
      <h3>Difficulty</h3>
      <Form.Item name='difficulty' initialValue={Difficulty.Any}>
        <Select
          options={Object.entries(Difficulty).map(
            ([key, value]) => ({ value, label: key })
          )}
        />
      </Form.Item>
      <h3>Questions type</h3>
      <Form.Item name='type' initialValue={QuestionType.Any}>
        <Select
          options={Object.entries(QuestionType).map(
            ([key, value]) => ({ value, label: key })
          )}
        />
      </Form.Item>
      <Button
        htmlType='submit'
        loading={isLoading}
        onClick={hadndleStartButtonClick}
        disabled={!questionsCount}
      >
        Start
      </Button>
    </Form>
  );
}
