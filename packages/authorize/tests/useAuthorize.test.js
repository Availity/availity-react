import React from 'react';
import { render, cleanup, waitForElement } from '@testing-library/react';
import { avUserPermissionsApi } from '@availity/api-axios';
import { useAuthorize } from '..';

jest.mock('@availity/api-axios');

afterEach(() => {
  jest.clearAllMocks();
  cleanup();
});

// eslint-disable-next-line react/prop-types
const Component = ({ permissions, children, ...options }) => {
  const [authorized, loading] = useAuthorize(permissions, options);

  if (loading) {
    return <span data-testid="component-loading">Loading</span>;
  }

  return authorized ? (
    children
  ) : (
    <span data-testid="component-content">
      You do not have permission to see this
    </span>
  );
};

beforeEach(() => {
  avUserPermissionsApi.getPermissions.mockResolvedValue([
    {
      id: '1234',
      organizations: [
        {
          id: '1111',
          customerId: '1194',
        },
      ],
    },
  ]);
});

describe('useAuthorize', () => {
  test('should render authorized content', async () => {
    const { getByText } = render(
      <Component permissions="1234">You have permission to see this</Component>
    );

    await waitForElement(() => getByText('You have permission to see this'));
  });

  test('should render unauthorized content', async () => {
    const { getByText } = render(<Component permissions="12345" />);

    await waitForElement(() =>
      getByText('You do not have permission to see this')
    );
  });

  test('should render authorized with array of permissions', async () => {
    const { getByText } = render(
      <Component permissions={['1234', 2345, [3456, '4567']]}>
        You have permission to see this
      </Component>
    );

    await waitForElement(() => getByText('You have permission to see this'));
  });

  test('should render authorized with correct organizationId', async () => {
    const { getByText } = render(
      <Component permissions="1234" organizationId="1111">
        You have permission to see this
      </Component>
    );

    await waitForElement(() => getByText('You have permission to see this'));
  });

  test('should render authorized with permissions set', async () => {
    avUserPermissionsApi.getPermissions.mockResolvedValue([
      {
        id: '5678',
        organizations: [
          {
            id: '1111',
            customerId: '1194',
          },
        ],
      },
      {
        id: '9012',
        organizations: [
          {
            id: '1111',
            customerId: '1194',
          },
        ],
      },
    ]);

    const { getByText } = render(
      <Component
        permissions={['1234', ['5678', '9012']]}
        region="FL"
        organizationId="1111"
      >
        You have permission to see this
      </Component>
    );

    await waitForElement(() => getByText('You have permission to see this'));
  });

  test('should render with console warning', async () => {
    // eslint-disable-next-line no-console
    console.error = jest.fn();

    const { getByText } = render(
      <Component
        permissions="1234"
        region="FL"
        organizationId="1111"
        customerId="1194"
      >
        You have permission to see this
      </Component>
    );

    await waitForElement(() => getByText('You have permission to see this'));

    // eslint-disable-next-line no-console
    expect(console.error).toHaveBeenCalledWith(
      'You provided both `organizationId` and `customerId` to Authorize but both cannot be used together; `organizationId` will be used and `customerId` will be ignored. If you want to use `customerId` do not provide `organizationId`.'
    );
  });
  test('should render authorized with region', async () => {
    const { getByText } = render(
      <Component permissions="1234" region="FL" organizationId="1111">
        You have permission to see this
      </Component>
    );

    await waitForElement(() => getByText('You have permission to see this'));
  });

  test('should render authorized with no region', async () => {
    const { getByText } = render(
      <Component permissions="1234" region={false} organizationId="1111">
        You have permission to see this
      </Component>
    );

    await waitForElement(() => getByText('You have permission to see this'));
  });

  test('should render unauthorized with region', async () => {
    avUserPermissionsApi.getPermissions.mockResolvedValue([]);
    const { getByText } = render(
      <Component permissions="1234" region="GA" organizationId="1111">
        You have permission to see this
      </Component>
    );

    await waitForElement(() =>
      getByText('You do not have permission to see this')
    );
  });

  test('should render unauthorized with incorrect organizationId', async () => {
    const { getByText } = render(
      <Component permissions="1234" organizationId="1112">
        You have permission to see this
      </Component>
    );

    await waitForElement(() =>
      getByText('You do not have permission to see this')
    );
  });

  test('should render authorized with correct customerId', async () => {
    const { getByText } = render(
      <Component permissions="1234" customerId="1194">
        You have permission to see this
      </Component>
    );

    await waitForElement(() => getByText('You have permission to see this'));
  });

  test('should render unauthorized with incorrect customerId', async () => {
    const { getByText } = render(
      <Component permissions="1234" customerId="1193">
        You have permission to see this
      </Component>
    );

    await waitForElement(() =>
      getByText('You do not have permission to see this')
    );
  });
});
