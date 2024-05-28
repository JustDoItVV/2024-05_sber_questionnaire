/* eslint-disable @typescript-eslint/no-unused-vars */
import '@testing-library/jest-dom';

import { Form } from 'antd';
import { SetStateAction } from 'react';

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { makeFakeState, withStore } from '../../test-mocks';
import { Question, State } from '../../types';
import CardQuestion from './card-question';

const mockSetAnswers = jest.fn((_value: SetStateAction<string[]>) => undefined);

describe('Component CardFriends', () => {
  let mockState: State;
  let withStoreComponent: JSX.Element;
  let question: Question;
  let questionNumber: number;

  beforeEach(() => {
    mockState = makeFakeState();
    questionNumber = 1;
    const withStoreResult = withStore(
      <Form>
        <CardQuestion
          question={mockState.APP.questions[questionNumber]}
          questionNumber={questionNumber}
          setAnswers={mockSetAnswers}
        />
      </Form>,
      mockState,
    );
    withStoreComponent = withStoreResult.withStoreComponent;
  });

  test('should render correctly with provided question', () => {
    question = mockState.APP.questions[questionNumber];

    render(withStoreComponent);

    // expect(screen.queryByText(question.question)).toBeInTheDocument();
    expect(screen.queryByText(question.difficulty)).toBeInTheDocument();
    // expect(screen.queryByText(question.options[0])).toBeInTheDocument();
  });

  test('should render correctly with provided question', async () => {
    question = mockState.APP.questions[questionNumber];

    render(withStoreComponent);
    await userEvent.click(screen.getByText(question.options[0]));
    console.log(question, screen);

    expect(mockSetAnswers).toHaveBeenCalled();
  });
});
