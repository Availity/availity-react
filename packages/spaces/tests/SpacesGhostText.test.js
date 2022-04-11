import React from 'react';
import { render, waitFor, cleanup } from '@testing-library/react';
import { avWebQLApi } from '@availity/api-axios';
import Spaces, { SpacesGhostText } from '..';

jest.mock('@availity/api-axios');

describe('SpacesGhostText', () => {
  avWebQLApi.create.mockResolvedValue({
    data: {
      data: {
        configurationPagination: {
          pageInfo: {
            itemCount: 1,
            page: 1,
            perPage: 50,
          },
          items: [
            {
              id: '1',
              description: 'foo',
              parentIDs: ['pid1', 'pid2', 'pid3'],
              isGhost: true,
              metadata: [
                {
                  name: 'ghostText',
                  value: 'foo',
                },
                {
                  name: 'ghostParents',
                  value: 'pid1,pid3',
                },
              ],
            },
          ],
        },
      },
    },
  });
  afterEach(() => {
    jest.clearAllMocks();
    cleanup();
  });

  it('renders ghost text for space', async () => {
    const { container } = render(
      <Spaces clientId="my-client-id" spaceIds={['1', '2']}>
        <SpacesGhostText spaceId="1" />
      </Spaces>
    );

    const ghost = await waitFor(() => container);

    expect(ghost.textContent).toBe('foo');
  });

  it('renders ghost text for single space', async () => {
    const { container } = render(
      <Spaces clientId="my-client-id" spaceIds={['1', '2']}>
        <SpacesGhostText />
      </Spaces>
    );

    const ghost = await waitFor(() => container);

    expect(ghost.textContent).toBe('foo');
  });
});
