import React from 'react';
import { waitFor, cleanup } from '@testing-library/react';
import { QueryClient } from '@tanstack/react-query';
import { http, HttpResponse } from 'msw';
import { server } from '@availity/mock/src/server';
import { PROVIDERS } from '@availity/mock/src/routes';
import renderWithClient from './util';
import { useProviders } from '../src/index';

const queryClient = new QueryClient();

afterEach(() => {
  cleanup();
  queryClient.clear();
});

const Component = () => {
  const { data, error, status } = useProviders({}, { gcTime: 0, retry: false });

  return (
    <div>
      <h1>Status: {status}</h1>
      <h1>Data: {JSON.stringify(data?.data)}</h1>
      <h1>Error: {error?.message}</h1>
    </div>
  );
};

describe('useProviders', () => {
  test('should return an error', async () => {
    server.use(http.get(PROVIDERS, () => HttpResponse.error()));

    const { getByText } = renderWithClient(queryClient, <Component />);

    getByText('Status: pending');
    await waitFor(() => {
      expect(getByText('Status: error')).toBeDefined();
    });
  });

  test('should return providers', async () => {
    const { getByText } = renderWithClient(queryClient, <Component />);

    getByText('Status: pending');
    await waitFor(() => {
      expect(getByText(/BITREX/)).toBeDefined();
    });
  });
});
