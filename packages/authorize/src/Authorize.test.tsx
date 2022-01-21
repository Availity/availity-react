import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { server } from '@availity/mock/src/server';

import Authorize from './Authorize';

describe('Authorize', () => {
  const queryClient = new QueryClient();

  // start msw server
  beforeAll(() => server.listen());

  // clear cache and reset msw handlers
  afterEach(() => {
    queryClient.clear();
    server.resetHandlers();
  });

  // terminate the server
  afterAll(() => server.close());

  test('should render authorized content', async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <Authorize permissions={['1234']} loader>
          You have permission to see this
        </Authorize>
      </QueryClientProvider>
    );

    await waitFor(() => screen.getAllByText(/•/));

    await waitFor(() => {
      expect(screen.getByText('You have permission to see this')).toBeDefined();
    });
  });

  test('should render unauthorized content', async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <Authorize permissions={['12345']} unauthorized="You do not have permission to see this" />
      </QueryClientProvider>
    );

    await waitFor(() => {
      expect(screen.getByText('You do not have permission to see this')).toBeDefined();
    });
  });

  test('should render authorized with array of permissions', async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <Authorize
          permissions={['1234', '2345', ['3456', '4567']]}
          unauthorized="You do not have permission to see this"
        >
          You have permission to see this
        </Authorize>
      </QueryClientProvider>
    );

    await waitFor(() => {
      expect(screen.getByText('You have permission to see this')).toBeDefined();
    });
  });

  test('should render negate permissions', async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <Authorize permissions={['1234']} negate unauthorized="You do not have permission to see this">
          You have permission to see this
        </Authorize>
      </QueryClientProvider>
    );

    await waitFor(() => {
      expect(screen.getByText('You do not have permission to see this')).toBeDefined();
    });
  });

  test('should render authorized with correct organizationId', async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <Authorize permissions={['1234']} organizationId="1111" unauthorized="You do not have permission to see this">
          You have permission to see this
        </Authorize>
      </QueryClientProvider>
    );

    await waitFor(() => {
      expect(screen.getByText('You have permission to see this')).toBeDefined();
    });
  });

  test('should render unauthorized with incorrect organizationId', async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <Authorize permissions={['1234']} organizationId="1112" unauthorized="You do not have permission to see this">
          You have permission to see this
        </Authorize>
      </QueryClientProvider>
    );

    await waitFor(() => {
      expect(screen.getByText('You do not have permission to see this')).toBeDefined();
    });
  });

  test('should render authorized with correct customerId', async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <Authorize permissions={['1234']} customerId="1194" unauthorized="You do not have permission to see this">
          You have permission to see this
        </Authorize>
      </QueryClientProvider>
    );

    await waitFor(() => {
      expect(screen.getByText('You have permission to see this')).toBeDefined();
    });
  });

  test('should render unauthorized with incorrect customerId', async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <Authorize permissions={['1234']} customerId="1193" unauthorized="You do not have permission to see this">
          You have permission to see this
        </Authorize>
      </QueryClientProvider>
    );

    await waitFor(() => {
      expect(screen.getByText('You do not have permission to see this')).toBeDefined();
    });
  });

  test('should render authorized with correct resources', async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <Authorize
          permissions={['1234']}
          customerId="1194"
          unauthorized="You do not have permission to see this"
          resources={['2']}
        >
          You have permission to see this
        </Authorize>
      </QueryClientProvider>
    );

    await waitFor(() => {
      expect(screen.getByText('You have permission to see this')).toBeDefined();
    });
  });

  test('should render unauthorized with incorrect resources', async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <Authorize
          permissions={['1234']}
          customerId="1194"
          unauthorized="You do not have permission to see this"
          resources={['5']}
        >
          You have permission to see this
        </Authorize>
      </QueryClientProvider>
    );

    await waitFor(() => {
      expect(screen.getByText('You do not have permission to see this')).toBeDefined();
    });
  });
});
