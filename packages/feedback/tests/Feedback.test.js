import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Feedback from '..';

global.document.createRange = () => ({
  setStart: () => {},
  setEnd: () => {},
  commonAncestorContainer: {
    nodeName: 'BODY',
    ownerDocument: document,
  },
});

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
