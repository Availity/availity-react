import React from 'react';
import { render, cleanup, fireEvent, waitFor } from '@testing-library/react';
import Analytics, { useAnalytics } from '..';

const makePlugin = () => ({
  isEnabled: jest.fn(() => true),
  init: jest.fn(),
  trackEvent: jest.fn(),
  trackPageView: jest.fn(),
});

describe('Analytics', () => {
  afterEach(() => {
    cleanup();
  });

  test('should allow click events', async () => {
    const plugins = [makePlugin()];

    const { getByText } = render(
      <Analytics plugins={plugins} attributePrefix="data-av-analytics">
        <button data-av-analytics-on="click" data-av-analytics-action="click" type="button">
          Hello World
        </button>
      </Analytics>
    );

    const btn = getByText('Hello World');

    fireEvent.click(btn);

    await waitFor(() => {
      expect(plugins[0].trackEvent).toHaveBeenCalledTimes(1);
    });
  });

  test('should allow trackEvents from code', async () => {
    const plugins = [makePlugin()];

    const Button = () => {
      const { trackEvent } = useAnalytics();
      return (
        <button
          onClick={() =>
            trackEvent({
              url: '/test',
            })
          }
          type="button"
        >
          Hello World
        </button>
      );
    };

    const { getByText } = render(
      <Analytics plugins={plugins}>
        <Button />
      </Analytics>
    );

    const btn = getByText('Hello World');

    fireEvent.click(btn);

    await waitFor(() => {
      expect(plugins[0].trackEvent).toHaveBeenCalledTimes(1);
    });
  });
});
