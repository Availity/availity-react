import React from 'react';
import { render } from '@testing-library/react';
import FeedbackButton from '../FeedbackButton';

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
});
