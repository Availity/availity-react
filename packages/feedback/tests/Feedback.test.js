import React from 'react';
import { render, fireEvent, cleanup, waitFor } from '@testing-library/react';
import Feedback from '..';

global.document.createRange = () => ({
  setStart: () => {},
  setEnd: () => {},
  commonAncestorContainer: {
    nodeName: 'BODY',
    ownerDocument: document,
  },
});

afterEach(cleanup);

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

  test('should call onClose in form', async () => {
    const onClose = jest.fn();

    const { getByTestId, getByText } = render(
      <Feedback appName="Test Space" formProps={{ onClose }} />
    );

    fireEvent.click(getByText('Give Feedback'));

    // eslint-disable-next-line unicorn/prefer-query-selector
    expect(getByTestId('feedback-form')).toBeDefined();

    fireEvent.keyDown(getByText('Close'), {
      key: 'Enter',
      keyCode: 13,
    });

    await waitFor(() => {
      expect(onClose).toHaveBeenCalledTimes(1);
    });

    fireEvent.click(getByText('Give Feedback'));

    fireEvent.click(getByText('Close'));

    await waitFor(() => {
      expect(onClose).toHaveBeenCalledTimes(2);
    });
  });

  test('should call onClose in modal', async () => {
    const onClose = jest.fn();

    const { getByTestId, getByText } = render(
      <Feedback appName="Test Space" formProps={{ onClose }} modal />
    );

    fireEvent.click(getByText('Give Feedback'));

    // eslint-disable-next-line unicorn/prefer-query-selector
    expect(getByTestId('feedbackModal')).toBeDefined();

    fireEvent.click(getByText('Close'));

    await waitFor(() => {
      expect(onClose).toHaveBeenCalledTimes(1);
    });
  });

  test('should have proper ARIA attributes on Give Feedback button', () => {
    const { getByTestId, getByText } = render(
      <Feedback appName="Test Space" />
    );

    const giveFeedbackButton = getByText('Give Feedback');

    expect(giveFeedbackButton).toHaveAttribute('aria-expanded', 'false');

    fireEvent.click(giveFeedbackButton);

    // eslint-disable-next-line unicorn/prefer-query-selector
    expect(getByTestId('feedback-form')).toBeDefined();
    expect(giveFeedbackButton).toHaveAttribute('aria-expanded', 'true');

    fireEvent.click(getByText('Close'));

    expect(giveFeedbackButton).toHaveAttribute('aria-expanded', 'false');
  });
});
