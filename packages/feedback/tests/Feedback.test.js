import React from 'react';
import { render, fireEvent } from 'react-testing-library';
import 'react-testing-library/cleanup-after-each';
import Feedback from '..';

describe('Feedback', () => {
  test('should show form on click', () => {
    const { getByTestId, getByText } = render(
      <Feedback appName="Test Space" />
    );

    fireEvent.click(getByText('Give Feedback'));

    // eslint-disable-next-line unicorn/prefer-query-selector
    expect(getByTestId('feedback-form')).toBeDefined();
  });

  test('should show modal form on click', () => {
    const { getByTestId, getByText } = render(
      <Feedback appName="Test Space" modal />
    );

    fireEvent.click(getByText('Give Feedback'));

    // eslint-disable-next-line unicorn/prefer-query-selector
    expect(getByTestId('feedbackModal')).toBeDefined();
  });
});
