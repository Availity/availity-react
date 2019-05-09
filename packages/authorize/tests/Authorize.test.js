import React from 'react';
import { render, cleanup, waitForElement } from 'react-testing-library';
import { avUserPermissionsApi } from '@availity/api-axios';
import Authorize from '..';

jest.mock('@availity/api-axios');

afterEach(() => {
  cleanup();

  jest.clearAllMocks();
});

beforeEach(() => {
  avUserPermissionsApi.getPermissions.mockResolvedValue([
    {
      id: '1234',
      organizationIds: ['1111']
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

  test('should render authorized content', async () => {
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
        negate
        unauthorized="You do not have permission to see this"
      >
        You have permission to see this
      </Authorize>
    );

    await waitForElement(() =>
      getByText('You have permission to see this')
    );
  });

  test('should render unauthorized with incorrect organizationId', async () => {
    const { getByText } = render(
      <Authorize
        permissions="1234"
        organizationId="1112"
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
});
