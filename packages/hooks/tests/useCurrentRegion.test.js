import React from 'react';
import { render, waitForElement, cleanup } from '@testing-library/react';
import { avRegionsApi } from '@availity/api-axios';
import { useCurrentRegion } from '..';

jest.mock('@availity/api-axios');

const mockRegionApi = type => {
  let body = {};
  if (type === 'valid') {
    body = {
      config: { polling: false },
      data: {
        regions: [
          {
            id: 'FL',
            value: 'Florida',
          },
        ],
      },
      status: 200,
      statusText: 'Ok',
    };
  } else if (type === 'invalid') {
    body = {
      config: { polling: false },
      status: 200,
      statusText: 'Ok',
    };
  }
  avRegionsApi.getCurrentRegion.mockResolvedValue(body);
};

afterEach(() => {
  jest.clearAllMocks();
  cleanup();
});

const Component = () => {
  const [region, loading, error] = useCurrentRegion();

  if (error) return <span data-testid="error">An error occurred.</span>;

  return loading ? <span data-testid="loading" /> : JSON.stringify(region);
};

describe('useCurrentRegion', () => {
  test('should return loading', () => {
    mockRegionApi('valid');
    const { getByTestId } = render(<Component />);

    getByTestId('loading');
  });

  test('should return region', async () => {
    mockRegionApi('valid');
    const { getByText } = render(<Component />);

    await waitForElement(() =>
      getByText(
        JSON.stringify({
          code: 'FL',
          value: 'Florida',
        })
      )
    );
  });

  test('handles error', async () => {
    mockRegionApi('invalid');
    const { getByTestId } = render(<Component />);

    await waitForElement(() => getByTestId('error'));
  });
});
