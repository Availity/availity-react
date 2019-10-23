import React from 'react';
import { render, waitForElement, cleanup } from '@testing-library/react';
import { avSlotMachineApi } from '@availity/api-axios';
import Spaces, { SpacesGhostText } from '..';

jest.mock('@availity/api-axios');

avSlotMachineApi.create.mockResolvedValue({
  data: {
    data: {
      spaces: {
        totalCount: 1,
        page: 1,
        perPage: 50,
        spaces: [
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

describe('SpacesGhostText', () => {
  afterEach(() => {
    jest.clearAllMocks();
    cleanup();
  });

  it('renders ghost text for space', async () => {
    const { getByTestId } = render(
      <Spaces clientId="my-client-id" spaceIds={['1', '2']}>
        <SpacesGhostText spaceId="1" />
      </Spaces>
    );

    const ghost = await waitForElement(() => getByTestId('spaces-ghost-text'));

    expect(ghost.textContent).toBe('foo');
  });

  it('renders ghost text for single space', async () => {
    const { getByTestId } = render(
      <Spaces clientId="my-client-id" spaceIds={['1', '2']}>
        <SpacesGhostText />
      </Spaces>
    );

    const ghost = await waitForElement(() => getByTestId('spaces-ghost-text'));

    expect(ghost.textContent).toBe('foo');
  });
});
