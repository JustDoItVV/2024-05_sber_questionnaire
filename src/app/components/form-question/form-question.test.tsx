import '@testing-library/jest-dom';

import { render, screen } from '@testing-library/react';

import { makeFakeState, withStore } from '../../test-mocks';
import { State } from '../../types';
import FormQuestion from './form-question';

jest.mock('../card-question/card-question', () => ({
  ...jest.requireActual('../card-question/card-question'),
  __esModule: true,
  default: jest.fn(() => <div>CardQuestion</div>),
}));

describe('Component CardFriends', () => {
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
  test('should render coorectly', () => {
    render(withStoreComponent);

    expect(screen.queryByText('Next')).toBeInTheDocument();
  });
});
