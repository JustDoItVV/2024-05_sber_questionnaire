import '@testing-library/jest-dom';

import { render, screen } from '@testing-library/react';

import App from './app';
import { makeFakeAnswers, makeFakeQuestions, makeFakeState, withStore } from './test-mocks';
import { State } from './types';

jest.mock('./components/form-start/form-start', () => ({
  ...jest.requireActual('./components/form-start/form-start'),
  __esModule: true,
  default: jest.fn(() => <div>FormStart</div>),
}));
jest.mock('./components/form-question/form-question', () => ({
  ...jest.requireActual('./components/form-question/form-question'),
  __esModule: true,
  default: jest.fn(() => <div>FormQuestion</div>),
}));
jest.mock('./components/results/results', () => ({
  ...jest.requireActual('./components/results/results'),
  __esModule: true,
  default: jest.fn(() => <div>Results</div>),
}));

describe('App component', () => {
  let withStoreComponent: JSX.Element;
  let mockState: State;

  beforeEach(() => {
    mockState = makeFakeState();
  });

  test('should render FormStart component when no questions in state', () => {
    mockState.APP.questions = [];
    const withStoreResult = withStore(<App />, mockState);
    withStoreComponent = withStoreResult.withStoreComponent;

    render(withStoreComponent);

    expect(screen.queryByText('FormStart')).toBeInTheDocument();
    expect(screen.queryByText('FormQuestion')).toBeNull();
    expect(screen.queryByText('Results')).toBeNull();
  });

  test('should render FormQuestion component when userAnswers.length < questions.length', () => {
    mockState.APP.questions = makeFakeQuestions(5);
    mockState.APP.userAnswers = makeFakeAnswers(2);
    const withStoreResult = withStore(<App />, mockState);
    withStoreComponent = withStoreResult.withStoreComponent;

    render(withStoreComponent);

    expect(screen.queryByText('FormStart')).toBeNull();
    expect(screen.queryByText('FormQuestion')).toBeInTheDocument();
    expect(screen.queryByText('Results')).toBeNull();
  });

  test('should render Results component when userAnswers.length >= questions.length', () => {
    mockState.APP.questions = makeFakeQuestions(5);
    mockState.APP.userAnswers = makeFakeAnswers(5);
    const withStoreResult = withStore(<App />, mockState);
    withStoreComponent = withStoreResult.withStoreComponent;

    render(withStoreComponent);

    expect(screen.queryByText('FormStart')).toBeNull();
    expect(screen.queryByText('FormQuestion')).toBeNull();
    expect(screen.queryByText('Results')).toBeInTheDocument();
  });
});
