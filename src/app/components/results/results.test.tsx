import '@testing-library/jest-dom';

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import * as Storage from '../../storage';
import { makeFakeState, withStore } from '../../test-mocks';
import { State } from '../../types';
import Results from './results';

jest.mock('../card-question/card-question', () => ({
  ...jest.requireActual('../card-question/card-question'),
  __esModule: true,
  default: jest.fn(() => <div>CardQuestion</div>),
}));
jest.mock('../../storage', () => ({
  ...jest.requireActual('../../storage'),
  __esModule: true,
}));
jest.spyOn(Storage, 'reset');

describe('Component Results', () => {
  let mockState: State;
  let withStoreComponent: JSX.Element;

  beforeEach(() => {
    mockState = makeFakeState();
    const withStoreResult = withStore(
      <Results questions={mockState.APP.questions} />,
      mockState,
    );
    withStoreComponent = withStoreResult.withStoreComponent;
  });

  test('should render correctly', () => {
    render(withStoreComponent);

    expect(screen.queryByText('Sort by difficulty')).toBeInTheDocument();
    expect(screen.queryByText('Try again')).toBeInTheDocument();
    expect(screen.queryAllByText('CardQuestion').length).toBe(mockState.APP.questions.length);
  });

  test('should call reset when try again button click', async () => {
    render(withStoreComponent);
    await userEvent.click(screen.getByText('Try again'));

    expect(Storage.reset).toHaveBeenCalled();
  });
});
