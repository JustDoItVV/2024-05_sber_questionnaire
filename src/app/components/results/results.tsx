import { Button, Card, ConfigProvider, Form, Statistic } from 'antd';
import { useState } from 'react';

import { DownOutlined, UpOutlined } from '@ant-design/icons';

import { BUTTON_AGAIN_COLORS } from '../../const';
import { useAppDispatch } from '../../hooks';
import { reset } from '../../storage';
import { Question, SortOption } from '../../types';
import { getActiveColors, getHoverColors, isCorrectAnswer, sortQuestionsHelper } from '../../utils';
import CardQuestion from '../card-question/card-question';

type ResultsProps = {
  questions: Question[];
};

export default function Results({ questions }: ResultsProps): JSX.Element {
  const dispatch = useAppDispatch();
  const userScore = questions.reduce((score, question) => score + Number(isCorrectAnswer(question)), 0);
  const [sorter, setSorter] = useState<SortOption>(SortOption.Asc);

  const handleSortButtonClick = () => {
    setSorter((old) => old === SortOption.Asc ? SortOption.Desc : SortOption.Asc);
  };

  const handleTryAgainButtonClick = () => {
    dispatch(reset());
  };

  const results = questions
    .sort(sortQuestionsHelper(sorter))
    .map((question, index) => (
      <div key={`question_result_${index}`}>
        <CardQuestion
          question={question}
          questionNumber={index}
          editable={false}
          userAnswers={question.userAnswers}
          correctAnswers={question.correctAnswer as string[]}
        />
      </div>
    ));

  return (
    <Card
      type='inner'
      title={<h1>Results</h1>}
    >
      <Statistic title="Score" value={userScore} suffix={`/ ${questions.length}`} />
      <Button onClick={handleSortButtonClick}>
        Sort by difficulty
        {
          sorter === SortOption.Asc
            ? <DownOutlined />
            : <UpOutlined />
        }
      </Button>
      <Form>
        {results}
      </Form>
      <ConfigProvider
        theme={{
          components: {
            Button: {
              colorPrimary: `linear-gradient(90deg,  ${BUTTON_AGAIN_COLORS.join(', ')})`,
              colorPrimaryHover: `linear-gradient(90deg, ${getHoverColors(BUTTON_AGAIN_COLORS).join(', ')})`,
              colorPrimaryActive: `linear-gradient(90deg, ${getActiveColors(BUTTON_AGAIN_COLORS).join(', ')})`,
              lineWidth: 0,
            },
          },
        }}
      >
        <Button
          type='primary'
          onClick={handleTryAgainButtonClick}
          size='large'
        >
          Try again
        </Button>
      </ConfigProvider>
    </Card>
  );
}
