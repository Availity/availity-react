import React from 'react';
import { render, waitForElement, cleanup } from '@testing-library/react';
import { avRegionsApi } from '@availity/api-axios';
import { useCurrentRegion } from '..';

jest.mock('@availity/api-axios');

afterEach(() => {
  jest.clearAllMocks();
  cleanup();
});

const Component = () => {
  const { data, isFetching, error } = useCurrentRegion({
    cacheTime: 0,
    retry: false,
  });

  if (isFetching) return <span data-testid="loading" />;
  if (data) return <span data-testid="valid">{JSON.stringify(data)}</span>;
  if (error) return <span data-testid="invalid">An error occurred</span>;

  return null;
};

describe('useCurrentRegion', () => {
  test('handle error', async () => {
    avRegionsApi.getCurrentRegion.mockRejectedValueOnce({
      config: { polling: false },
      status: 400,
      statusText: 'Ok',
    });
    const { getByTestId } = render(<Component />);

    await waitForElement(() => getByTestId('invalid'));
  });

  test('handle loading', () => {
    avRegionsApi.getCurrentRegion.mockResolvedValueOnce({});
    const { getByTestId } = render(<Component />);

    getByTestId('loading');
  });

  test('handle success', async () => {
    avRegionsApi.getCurrentRegion.mockResolvedValueOnce({
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
    });

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
});
