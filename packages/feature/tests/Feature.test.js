import React from 'react';
import { render, cleanup, waitFor } from '@testing-library/react';
import Feature from '..';

afterEach(cleanup);

describe('Feature', () => {
  test('should render loading', () => {
    const { container, getByText } = render(<Feature features="1234" loader />);

    expect(container).toMatchSnapshot();
    waitFor(() => {
      expect(getByText('You do not have permission to see this')).toBeDefined();
    });
  });
  test('should render with single permission', () => {
    const { container } = render(
      <Feature features="1234" whenDisabled="You do not have permission to see this">
        You can see this
      </Feature>
    );

    waitFor(() => {
      expect(container).toMatchSnapshot();
    });
  });
  test('should render with array of features', () => {
    const { container } = render(
      <Feature features={['1234', '2345', ['3456', '4567']]} whenDisabled="You do not have permission to see this">
        You can see this
      </Feature>
    );

    waitFor(() => {
      expect(container).toMatchSnapshot();
    });
  });
  test('should render negate features', () => {
    const { container } = render(
      <Feature features="1234" negate whenDisabled="You do not have permission to see this">
        You can see this
      </Feature>
    );

    waitFor(() => {
      expect(container).toMatchSnapshot();
    });
  });
});
