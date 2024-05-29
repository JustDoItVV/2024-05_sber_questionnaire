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

describe('Component CardQuestion', () => {
  let mockState: State;
  let withStoreComponent: JSX.Element;
  let question: Question;
  const questionNumber = 0;

  beforeEach(() => {
    mockState = makeFakeState();
    question = mockState.APP.questions[questionNumber];
  });

  test('should render correctly with provided question', () => {
    const withStoreResult = withStore(
      <Form>
        <CardQuestion
          question={question}
          questionNumber={questionNumber}
          setAnswers={mockSetAnswers}
        />
      </Form>,
      mockState,
    );
    withStoreComponent = withStoreResult.withStoreComponent;

    render(withStoreComponent);

    expect(screen.queryByText(question.question)).toBeInTheDocument();
    expect(screen.queryByText(question.difficulty)).toBeInTheDocument();
    expect(screen.queryByText(question.options[0])).toBeInTheDocument();
  });

  test('should call setAnswer when click on question option', async () => {
    const withStoreResult = withStore(
      <Form>
        <CardQuestion
          question={question}
          questionNumber={questionNumber}
          setAnswers={mockSetAnswers}
        />
      </Form>,
      mockState,
    );
    withStoreComponent = withStoreResult.withStoreComponent;

    render(withStoreComponent);
    await userEvent.click(screen.getByText(question.options[0]));

    expect(mockSetAnswers).toHaveBeenCalled();
  });
});
