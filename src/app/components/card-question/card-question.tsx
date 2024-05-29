import './card-question.css';

import { Badge, Card, Checkbox, Form, Radio } from 'antd';
import classnames from 'classnames';
import { Dispatch, SetStateAction } from 'react';

import { Difficulty, Question, QuestionType } from '../../types';

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
  const areUserAnswersCorrect = correctAnswers && userAnswers && correctAnswers.length === userAnswers.length && correctAnswers.every((value, index) => value === userAnswers[index]);

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
    <Card
      className='card-question'
      type='inner'
      title={<h2>Question {questionNumber + 1}</h2>}
      extra={
        <Badge
          count={question.difficulty}
          color={classnames({
            'green': question.difficulty === Difficulty.Easy,
            'yellow': question.difficulty === Difficulty.Medium,
            'red': question.difficulty === Difficulty.Hard,
          })}
        />
      }
    >
      <b>{question.question}</b>
      {
        question.type === QuestionType.Multiple &&
        <Form.Item
          name={`options_group_${questionNumber}`}
          initialValue={question.userAnswers}
          valuePropName="checked"
        >
          <Checkbox.Group
            options={question.options}
            value={question.userAnswers}
            onChange={handleCheckboxChange}
            disabled={!editable}
          />
        </Form.Item>
      }
      {
        question.type === QuestionType.Boolean &&
        <Form.Item
          name={`options_group_${questionNumber}`}
          initialValue={question.userAnswers}
          valuePropName="checked"
        >
          <Radio.Group
            options={question.options}
            value={question.userAnswers}
            onChange={handleRadioChange}
            disabled={!editable}
          />
        </Form.Item>
      }
      {
        correctAnswers && userAnswers &&
        <Badge
          count={correctAnswers.length === userAnswers.length && correctAnswers.every((value, index) => value === userAnswers[index]) ? 'Correct' : 'Wrong'}
          color={classnames({
            'green': areUserAnswersCorrect,
            'red': !areUserAnswersCorrect,
          })}
        />
      }
    </Card>
  );
}
