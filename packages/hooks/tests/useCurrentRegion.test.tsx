import React from 'react';
import { waitFor, cleanup } from '@testing-library/react';
import { QueryClient } from '@tanstack/react-query';
import { http, HttpResponse } from 'msw';
import { server } from '@availity/mock/src/server';
import { REGIONS } from '@availity/mock/src/routes';
import { useCurrentRegion } from '../src/index';
import renderWithClient from './util';

const queryClient = new QueryClient();

afterEach(() => {
  cleanup();
  queryClient.clear();
});

const Component = () => {
  const { data, error, status } = useCurrentRegion({ gcTime: 0, retry: false });

  return (
    <div>
      <h1>Status: {status}</h1>
      <h1>Data: {JSON.stringify(data)}</h1>
      <h1>Error: {error?.message}</h1>
    </div>
  );
};

describe('useCurrentRegion', () => {
  test('handle error', async () => {
    server.use(http.get(REGIONS, () => HttpResponse.error()));

    const { getByText } = renderWithClient(queryClient, <Component />);

    getByText('Status: pending');
    await waitFor(() => {
      expect(getByText('Status: error')).toBeDefined();
    });
  });

  test('handle success', async () => {
    const { getByText } = renderWithClient(queryClient, <Component />);

    getByText('Status: pending');
    await waitFor(() => {
      expect(getByText(`Data: ${JSON.stringify({ code: 'FL', value: 'Florida' })}`)).toBeDefined();
    });
  });
});
