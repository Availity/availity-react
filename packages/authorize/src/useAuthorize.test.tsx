import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { server } from '@availity/mock/src/server';

import { useAuthorize } from '.';
import { RequestedPermissions, RequestedResources } from './types';

type ComponentProps = {
  permissions: RequestedPermissions;
  resources?: RequestedResources;
  children?: React.ReactNode;
  organizationId?: string;
  customerId?: string;
  region?: boolean | string;
};

const Component = ({ permissions, children, ...options }: ComponentProps) => {
  const { authorized, isLoading } = useAuthorize(permissions, options);

  if (isLoading) {
    return <span data-testid="component-loading">Loading</span>;
  }

  return authorized ? (
    <>{children}</>
  ) : (
    <span data-testid="component-content">You do not have permission to see this</span>
  );
};

describe('useAuthorize', () => {
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
        <Component permissions={['1234']}>You have permission to see this</Component>
      </QueryClientProvider>
    );

    await waitFor(() => {
      expect(screen.getByText('You have permission to see this')).toBeDefined();
    });
  });

  test('should render unauthorized content', async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <Component permissions={['12345']} />
      </QueryClientProvider>
    );

    await waitFor(() => {
      expect(screen.getByText('You do not have permission to see this')).toBeDefined();
    });
  });

  test('should render authorized with array of permissions', async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <Component permissions={['1234', '2345', ['3456', '4567']]}>You have permission to see this</Component>
      </QueryClientProvider>
    );

    await waitFor(() => {
      expect(screen.getByText('You have permission to see this')).toBeDefined();
    });
  });

  test('should render authorized with correct organizationId', async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <Component permissions={['1234']} organizationId="1111">
          You have permission to see this
        </Component>
      </QueryClientProvider>
    );

    await waitFor(() => {
      expect(screen.getByText('You have permission to see this')).toBeDefined();
    });
  });

  test('should render authorized with permissions set', async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <Component permissions={[['1234', '5678']]} organizationId="1111">
          You have permission to see this
        </Component>
      </QueryClientProvider>
    );

    await waitFor(() => {
      expect(screen.getByText('You have permission to see this')).toBeDefined();
    });
  });

  test('should render authorized with region', async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <Component permissions={['1234']} region="FL" organizationId="1111">
          You have permission to see this
        </Component>
      </QueryClientProvider>
    );

    await waitFor(() => {
      expect(screen.getByText('You have permission to see this')).toBeDefined();
    });
  });

  test('should render authorized with no region', async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <Component permissions={['1234']} region={false} organizationId="1111">
          You have permission to see this
        </Component>
      </QueryClientProvider>
    );

    await waitFor(() => {
      expect(screen.getByText('You have permission to see this')).toBeDefined();
    });
  });

  test('should render unauthorized with region', async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <Component permissions={['1234']} region="GA" organizationId="1111">
          You have permission to see this
        </Component>
      </QueryClientProvider>
    );

    await waitFor(() => {
      expect(screen.getByText('You do not have permission to see this')).toBeDefined();
    });
  });

  test('should render unauthorized with incorrect organizationId', async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <Component permissions={['1234']} organizationId="1112">
          You have permission to see this
        </Component>
      </QueryClientProvider>
    );

    await waitFor(() => {
      expect(screen.getByText('You do not have permission to see this')).toBeDefined();
    });
  });

  test('should render authorized with correct customerId', async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <Component permissions={['1234']} customerId="1194">
          You have permission to see this
        </Component>
      </QueryClientProvider>
    );

    await waitFor(() => {
      expect(screen.getByText('You have permission to see this')).toBeDefined();
    });
  });

  test('should render unauthorized with incorrect customerId', async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <Component permissions={['1234']} customerId="1193">
          You have permission to see this
        </Component>
      </QueryClientProvider>
    );

    await waitFor(() => {
      expect(screen.getByText('You do not have permission to see this')).toBeDefined();
    });
  });

  test('should render authorized with correct resources as array', async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <Component permissions={['1234']} customerId="1194" resources={['1']}>
          You have permission to see this
        </Component>
      </QueryClientProvider>
    );

    await waitFor(() => {
      expect(screen.getByText('You have permission to see this')).toBeDefined();
    });
  });

  test('should render authorized with correct resources as nested array', async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <Component permissions={['1234']} customerId="1194" resources={[['1', '2']]}>
          You have permission to see this
        </Component>
      </QueryClientProvider>
    );

    await waitFor(() => {
      expect(screen.getByText('You have permission to see this')).toBeDefined();
    });
  });

  test('should render unauthorized with incorrect resources as array', async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <Component permissions={['1234']} customerId="1194" resources={['5']}>
          You have permission to see this
        </Component>
      </QueryClientProvider>
    );

    await waitFor(() => {
      expect(screen.getByText('You do not have permission to see this')).toBeDefined();
    });
  });

  test('should render unauthorized with incorrect resources as nested array', async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <Component permissions={['1234']} customerId="1194" resources={[['1', '5']]}>
          You have permission to see this
        </Component>
      </QueryClientProvider>
    );

    await waitFor(() => {
      expect(screen.getByText('You do not have permission to see this')).toBeDefined();
    });
  });
});
