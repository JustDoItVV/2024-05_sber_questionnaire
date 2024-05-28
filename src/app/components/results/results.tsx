import { Button, Form } from 'antd';
import { useState } from 'react';

import { useAppDispatch } from '../../hooks';
import { reset } from '../../storage';
import { Question, SortOption } from '../../types';
import { isCorrectAnswer, sortQuestionsHelper } from '../../utils';
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
    <>
      <h1>Results</h1>
      <p>Score: {userScore}/{questions.length}</p>
      <Button onClick={handleSortButtonClick}>
        Sort by difficulty
      </Button>
      <Form>
        {results}
      </Form>
      <Button onClick={handleTryAgainButtonClick}>
        Try again
      </Button>
    </>
  );
}
