import React from 'react';
import { waitFor, cleanup } from '@testing-library/react';
import { QueryClient } from '@tanstack/react-query';
import { http, HttpResponse } from 'msw';
import { server } from '@availity/mock/src/server';
import { STASH } from '@availity/mock/src/routes';
import { useStash } from '../src';
import renderWithClient from './util';

const queryClient = new QueryClient();

afterEach(() => {
  cleanup();
  queryClient.clear();
});

const Component = ({ sessionId }: { sessionId: string }) => {
  const { data, error, status } = useStash(sessionId, { gcTime: 0, retry: false });

  return (
    <div>
      <h1>Status: {status}</h1>
      <h1>Data: {JSON.stringify(data)}</h1>
      <h1>Error: {error?.message}</h1>
    </div>
  );
};

describe('useStash', () => {
  test('should return an error', async () => {
    server.use(http.get(STASH, () => HttpResponse.error()));

    const { getByText } = renderWithClient(queryClient, <Component sessionId="test-session-id" />);

    getByText('Status: pending');
    await waitFor(() => {
      expect(getByText('Status: error')).toBeDefined();
    });
  });

  test('should return stash data', async () => {
    const { getByText } = renderWithClient(queryClient, <Component sessionId="test-session-id" />);

    getByText('Status: pending');
    await waitFor(() => {
      expect(getByText(/"key":"value"/)).toBeDefined();
    });
    await waitFor(() => {
      expect(getByText(/"nested":\{"foo":"bar"\}/)).toBeDefined();
    });
  });

  test('should not fetch when sessionId is empty', () => {
    const { getByText } = renderWithClient(queryClient, <Component sessionId="" />);

    expect(getByText('Status: pending')).toBeDefined();
  });
});
