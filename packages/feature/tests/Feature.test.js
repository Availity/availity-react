import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';

import Feature from '..';

describe('Feature', () => {
  test('should render loading', async () => {
    render(<Feature features="1234" loader={<div data-testid="loader" />} />);

    expect(screen.getByTestId('loader')).toBeDefined();
  });

  test('should render with single permission', async () => {
    render(
      <Feature features="1234" whenDisabled="You do not have permission to see this">
        You can see this
      </Feature>
    );

    await waitFor(() => {
      expect(screen.getByText('You can see this')).toBeDefined();
    });
  });

  test('should render with array of features', async () => {
    render(
      <Feature features={['1234', '2345', ['3456', '4567']]} whenDisabled="You do not have permission to see this">
        You can see this
      </Feature>
    );

    await waitFor(() => {
      expect(screen.getByText('You can see this')).toBeDefined();
    });
  });

  test('should render negate features', async () => {
    render(
      <Feature features="1234" negate whenDisabled="You do not have permission to see this">
        You can see this
      </Feature>
    );

    await waitFor(() => {
      expect(screen.getByText('You do not have permission to see this')).toBeDefined();
    });
  });

  test('should show BlockUi when loading', async () => {
    render(<Feature features="1234" loader />);

    // 'loading' text should be in the document when loading
    expect(screen.getAllByText('loading')).toHaveLength(2);

    // Re-render with loading set to false
    render(<Feature features="1234" loader={false} />);

    // 'loading' text should not be in the document when not loading
    await waitFor(() => expect(screen.queryByText('loading')).not.toBeInTheDocument());
  });
});
