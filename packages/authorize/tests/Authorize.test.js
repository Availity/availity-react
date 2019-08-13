import React from 'react';
import { render, cleanup, waitForElement } from '@testing-library/react';
import { avUserPermissionsApi } from '@availity/api-axios';
import Authorize from '..';

jest.mock('@availity/api-axios');

afterEach(() => {
  jest.clearAllMocks();
  cleanup();
});

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

describe('Authorize', () => {
  test('should render authorized content', async () => {
    const { getByText } = render(
      <Authorize permissions="1234" loader>
        You have permission to see this
      </Authorize>
    );

    await waitForElement(() => getByText('You have permission to see this'));
  });

  test('should render unauthorized content', async () => {
    const { getByText } = render(
      <Authorize
        permissions="12345"
        unauthorized="You do not have permission to see this"
      />
    );

    await waitForElement(() =>
      getByText('You do not have permission to see this')
    );
  });

  test('should render authorized with array of permissions', async () => {
    const { getByText } = render(
      <Authorize
        permissions={['1234', 2345, [3456, '4567']]}
        unauthorized="You do not have permission to see this"
      >
        You have permission to see this
      </Authorize>
    );

    await waitForElement(() => getByText('You have permission to see this'));
  });

  test('should render negate permissions', async () => {
    const { getByText } = render(
      <Authorize
        permissions="1234"
        negate
        unauthorized="You do not have permission to see this"
      >
        You have permission to see this
      </Authorize>
    );

    await waitForElement(() =>
      getByText('You do not have permission to see this')
    );
  });

  test('should render authorized with correct organizationId', async () => {
    const { getByText } = render(
      <Authorize
        permissions="1234"
        organizationId="1111"
        unauthorized="You do not have permission to see this"
      >
        You have permission to see this
      </Authorize>
    );

    await waitForElement(() => getByText('You have permission to see this'));
  });

  test('should render unauthorized with incorrect organizationId', async () => {
    const { getByText } = render(
      <Authorize
        permissions="1234"
        organizationId="1112"
        unauthorized="You do not have permission to see this"
      >
        You have permission to see this
      </Authorize>
    );

    await waitForElement(() =>
      getByText('You do not have permission to see this')
    );
  });

  test('should render authorized with correct customerId', async () => {
    const { getByText } = render(
      <Authorize
        permissions="1234"
        customerId="1194"
        unauthorized="You do not have permission to see this"
      >
        You have permission to see this
      </Authorize>
    );

    await waitForElement(() => getByText('You have permission to see this'));
  });

  test('should render unauthorized with incorrect customerId', async () => {
    const { getByText } = render(
      <Authorize
        permissions="1234"
        customerId="1193"
        unauthorized="You do not have permission to see this"
      >
        You have permission to see this
      </Authorize>
    );

    await waitForElement(() =>
      getByText('You do not have permission to see this')
    );
  });
});
