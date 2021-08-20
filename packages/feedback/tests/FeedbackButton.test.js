import React from 'react';
import { render, cleanup } from '@testing-library/react';
import FeedbackButton from '../src/FeedbackButton';

afterEach(cleanup);

describe('Feedback', () => {
  test('should render an icon', () => {
    const { getByTestId } = render(<FeedbackButton icon="home" />);

    // eslint-disable-next-line unicorn/prefer-query-selector
    expect(getByTestId('feedback-icon').className).toContain('icon-home');
  });

  test('should highlight when active', () => {
    const { container } = render(<FeedbackButton icon="home" active="home" />);

    expect(container.firstChild.className).toContain('btn-primary');
  });

  test('should have proper ARIA attributes when active', () => {
    const { container, getByText } = render(
      <FeedbackButton icon="home" active="home">
        Home
      </FeedbackButton>
    );

    expect(container.firstChild).toHaveAttribute('aria-pressed', 'true');
    expect(getByText('Home')).toHaveClass('sr-only');
  });

  test('should have proper ARIA attributes', () => {
    const { container, getByText } = render(
      <FeedbackButton icon="home">Home</FeedbackButton>
    );

    expect(container.firstChild).toHaveAttribute('aria-pressed', 'false');
    expect(getByText('Home')).toHaveClass('sr-only');
  });
});
