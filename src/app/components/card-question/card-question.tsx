import { Checkbox, Radio } from 'antd';
import { Dispatch, SetStateAction } from 'react';

import { Question, QuestionType } from '../../types';

import type { GetProp, RadioChangeEvent } from 'antd';
type CardQuestionProps = {
  question: Question;
  questionNumber: number;
  setAnswers?: Dispatch<SetStateAction<string[]>>;
  editable?: boolean;
  userAnswers?: string[];
  correctAnswers?: string[];
}

export default function CardQuestion(props: CardQuestionProps): JSX.Element {
  const { question, questionNumber, setAnswers, userAnswers, correctAnswers } = props;
  const editable = props.editable ?? true;

  const handleCheckboxChange: GetProp<typeof Checkbox.Group<string>, 'onChange'> = (values) => {
    if (setAnswers) {
      setAnswers(values);
    }
  };

  const handleRadioChange = ({ target: { value } }: RadioChangeEvent) => {
    if (setAnswers) {
      setAnswers([value]);
    }
  };

  return (
    <>
      <h2>Question {questionNumber + 1}</h2>
      <span>{question.difficulty}</span>
      <p>{question.question}</p>
      {
        question.type === QuestionType.Multiple &&
        <Checkbox.Group
          options={question.options}
          onChange={handleCheckboxChange}
          defaultValue={userAnswers}
          disabled={!editable}
        />
      }
      {
        question.type === QuestionType.Boolean &&
        <Radio.Group
          options={question.options}
          onChange={handleRadioChange}
          disabled={!editable}
        />
      }
      {
        correctAnswers && userAnswers &&
        <p>{correctAnswers.length === userAnswers.length && correctAnswers.every((value, index) => value === userAnswers[index]) ? 'Correct' : 'Wrong'}</p>
      }
    </>
  );
}
