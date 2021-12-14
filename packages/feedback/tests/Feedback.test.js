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
    const { getByTestId, getByText } = render(<Feedback appName="Test Space" />);

    fireEvent.click(getByText('Give Feedback'));

    // eslint-disable-next-line unicorn/prefer-query-selector
    expect(getByTestId('feedback-form')).toBeDefined();
  });

  test('should show modal form on click', () => {
    const { getByTestId, getByText } = render(<Feedback appName="Test Space" modal />);

    fireEvent.click(getByText('Give Feedback'));

    // eslint-disable-next-line unicorn/prefer-query-selector
    expect(getByTestId('feedbackModal')).toBeDefined();
  });

  test('should call onClose in form', async () => {
    const onClose = jest.fn();

    const { getByTestId, getByText } = render(<Feedback appName="Test Space" formProps={{ onClose }} />);

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

    const { getByTestId, getByText } = render(<Feedback appName="Test Space" formProps={{ onClose }} modal />);

    fireEvent.click(getByText('Give Feedback'));

    // eslint-disable-next-line unicorn/prefer-query-selector
    expect(getByTestId('feedbackModal')).toBeDefined();

    fireEvent.click(getByText('Close'));

    await waitFor(() => {
      expect(onClose).toHaveBeenCalledTimes(1);
    });
  });

  test('should have proper ARIA attributes on Give Feedback button', () => {
    const { getByTestId, getByText } = render(<Feedback appName="Test Space" />);

    const giveFeedbackButton = getByText('Give Feedback');

    expect(giveFeedbackButton).toHaveAttribute('aria-expanded', 'false');

    fireEvent.click(giveFeedbackButton);

    // eslint-disable-next-line unicorn/prefer-query-selector
    expect(getByTestId('feedback-form')).toBeDefined();
    expect(giveFeedbackButton).toHaveAttribute('aria-expanded', 'true');

    fireEvent.click(getByText('Close'));

    expect(giveFeedbackButton).toHaveAttribute('aria-expanded', 'false');
  });

  test('should focus FeedbackButton when enter is clicked', async () => {
    const onChange = jest.fn();

    const { getByTestId, getByText } = render(<Feedback appName="Test Space" formProps={{ onChange }} />);

    fireEvent.click(getByText('Give Feedback'));

    // eslint-disable-next-line unicorn/prefer-query-selector
    expect(getByTestId('feedback-form')).toBeDefined();

    fireEvent.keyDown(getByText('Smiley face'), {
      key: 'Enter',
      keyCode: 13,
    });

    const submitButton = getByText('Send Feedback');

    expect(submitButton.getAttribute('disabled')).toBe(null);
  });

  test('should close when first feedbackButton is shift+tabbed', async () => {
    const onClose = jest.fn();

    const { getByTestId, getByText } = render(<Feedback appName="Test Space" formProps={{ onClose }} />);

    fireEvent.click(getByText('Give Feedback'));

    // eslint-disable-next-line unicorn/prefer-query-selector
    expect(getByTestId('feedback-form')).toBeDefined();

    fireEvent.keyDown(getByText('Smiley face'), {
      key: 'Tab',
      keyCode: 9,
      shiftKey: true,
    });

    await waitFor(() => {
      expect(onClose).toHaveBeenCalledTimes(1);
    });
  });

  test('should close when the close button is tabbed and give feedback is disabled', async () => {
    const onClose = jest.fn();

    const { getByTestId, getByText } = render(<Feedback appName="Test Space" formProps={{ onClose }} />);

    fireEvent.click(getByText('Give Feedback'));

    // eslint-disable-next-line unicorn/prefer-query-selector
    expect(getByTestId('feedback-form')).toBeDefined();

    fireEvent.keyDown(getByText('Close'), {
      key: 'Tab',
      keyCode: 9,
    });

    await waitFor(() => {
      expect(onClose).toHaveBeenCalledTimes(1);
    });
  });

  test('should not close when the close button is tabbed and give feedback is not disabled', async () => {
    const onClose = jest.fn();

    const { getByTestId, getByText } = render(<Feedback appName="Test Space" formProps={{ onClose }} />);

    fireEvent.click(getByText('Give Feedback'));

    // eslint-disable-next-line unicorn/prefer-query-selector
    expect(getByTestId('feedback-form')).toBeDefined();

    fireEvent.click(getByText('Smiley face'));

    fireEvent.keyDown(getByText('Close'), {
      key: 'Tab',
      keyCode: 9,
    });

    await waitFor(() => {
      expect(onClose).toHaveBeenCalledTimes(0);
    });
  });

  test('should close when the send feedback button is tabbed', async () => {
    const onClose = jest.fn();

    const { getByTestId, getByText } = render(<Feedback appName="Test Space" formProps={{ onClose }} />);

    fireEvent.click(getByText('Give Feedback'));

    // eslint-disable-next-line unicorn/prefer-query-selector
    expect(getByTestId('feedback-form')).toBeDefined();

    fireEvent.click(getByText('Smiley face'));

    fireEvent.keyDown(getByText('Send Feedback'), {
      key: 'Tab',
      keyCode: 9,
    });

    await waitFor(() => {
      expect(onClose).toHaveBeenCalledTimes(1);
    });
  });
});
