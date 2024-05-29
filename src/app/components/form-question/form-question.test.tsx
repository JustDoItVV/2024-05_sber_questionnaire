import '@testing-library/jest-dom';

import { act, fireEvent, render, screen } from '@testing-library/react';

import * as Storage from '../../storage';
import { makeFakeState, withStore } from '../../test-mocks';
import { State } from '../../types';
import FormQuestion from './form-question';

jest.mock('../card-question/card-question', () => ({
  ...jest.requireActual('../card-question/card-question'),
  __esModule: true,
  default: jest.fn(() => <div>CardQuestion</div>),
}));
jest.mock('../../storage', () => ({
  ...jest.requireActual('../../storage'),
  __esModule: true,
}));
jest.spyOn(Storage, 'setUserAnswers');
jest.spyOn(Storage, 'setCurrentQuestion');

describe('Component FormQuestion', () => {
  let mockState: State;
  let withStoreComponent: JSX.Element;

  beforeEach(() => {
    mockState = makeFakeState();
    const withStoreResult = withStore(
      <FormQuestion />,
      mockState,
    );
    withStoreComponent = withStoreResult.withStoreComponent;
  });

  test('should render correctly', () => {
    render(withStoreComponent);

    expect(screen.getByText('CardQuestion')).toBeInTheDocument();
    expect(screen.queryByText('Next')).toBeInTheDocument();
  });

  test('should call setUserAnswers, setCurrentQuestion when next button click', async () => {
    await act(() => render(withStoreComponent));
    await act(() => fireEvent.submit(screen.getByText('CardQuestion').parentElement as HTMLElement));

    expect(Storage.setUserAnswers).toHaveBeenCalled();
    expect(Storage.setCurrentQuestion).toHaveBeenCalled();
  });
});
